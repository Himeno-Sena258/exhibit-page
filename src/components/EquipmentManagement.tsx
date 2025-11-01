import React, { useEffect, useMemo } from 'react';
import useEquipmentStore from '@/stores/equipment-store';
import { type equipment } from '@/types';
import CircularProgress from '@/components/CircularProgress';


const EquipmentManagement: React.FC = () => {
    const { equipmentStatusList, loadEquipmentStatusList } = useEquipmentStore();
    

    useEffect(() => {
        loadEquipmentStatusList();
    }, []); 



    const equipmentStats = useMemo(() => {

        const stats = {
            '已完成': { count: 0, color: '#00D4FF', label: '已完成' },
            '进行中': { count: 0, color: '#00D4FF', label: '进行中' },
            '待处理': { count: 0, color: '#FF6B6B', label: '待处理' },
            '待审批': { count: 0, color: '#FFD93D', label: '待审批' },
            '延期': { count: 0, color: '#6C7B7F', label: '延期' }
        };
        
        stats['已完成'].count = equipmentStatusList.length;

        equipmentStatusList.forEach((equipment: equipment) => {
            switch (equipment.status) {
                case '进行中':
                    stats['进行中'].count++;
                    break;
                case '待处理':
                    stats['待处理'].count++;
                    break;
                case '待审批':
                    stats['待审批'].count++;
                    break;
                case '延期':
                    stats['延期'].count++;
                    break;
            }
        });

        return stats;
    }, [equipmentStatusList]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="pt-4 pb-4">
                <h5 className="text-center text-white text-2xl font-bold">
                    业务管理
                </h5>
                <h5 className="text-center text-white text-lg font-bold">
                    业务状态统计
                </h5>
            </div>

            <div className="flex-1 flex justify-center items-center gap-8 px-4">
                {Object.entries(equipmentStats).map(([label, { count, color }]) => (
                    <CircularProgress
                        key={label}
                        value={count}   
                        maxValue={equipmentStats['已完成'].count}
                        color={color}
                        label={label}
                        size={120}
                        strokeWidth={8}
                    />
                ))}
            </div>
        </div>
    );
};

export default EquipmentManagement;