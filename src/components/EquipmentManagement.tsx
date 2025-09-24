import React, { useEffect, useMemo } from 'react';
import useEquipmentStore from '@/stores/equipment-store';
import { type equipment } from '@/types';
import CircularProgress from '@/components/CircularProgress';


const EquipmentManagement: React.FC = () => {
    const { equipmentStatusList, loadEquipmentStatusList } = useEquipmentStore();
    

    useEffect(() => {
        loadEquipmentStatusList();
    }, []); 

    const statusConfig = useMemo(() => ({
        '设备总数': { count: 0, color: '#00D4FF' },
        '运行数量': { count: 0, color: '#00BFFF' },
        '故障数量': { count: 0, color: '#FF6B6B' },
        '待机数量': { count: 0, color: '#FFD93D' },
        '关机数量': { count: 0, color: '#A0A0A0' }
    }), []);


    const equipmentStats = useMemo(() => {

        const stats = {
            '设备总数': { count: 0, color: '#00D4FF', label: '设备总数' },
            '运行数量': { count: 0, color: '#00D4FF', label: '运行数量' },
            '故障数量': { count: 0, color: '#FF6B6B', label: '故障数量' },
            '待机数量': { count: 0, color: '#FFD93D', label: '待机数量' },
            '关机数量': { count: 0, color: '#6C7B7F', label: '关机数量' }
        };
        
        stats['设备总数'].count = equipmentStatusList.length;

        equipmentStatusList.forEach((equipment: equipment) => {
            switch (equipment.status) {
                case '运行中':
                    stats['运行数量'].count++;
                    break;
                case '故障':
                    stats['故障数量'].count++;
                    break;
                case '待机':
                    stats['待机数量'].count++;
                    break;
                case '关机':
                    stats['关机数量'].count++;
                    break;
            }
        });

        return stats;
    }, [equipmentStatusList]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="pt-4 pb-4">
                <h5 className="text-center text-white text-2xl font-bold">
                    设备状态
                </h5>
            </div>

            <div className="flex-1 flex justify-center items-center gap-8 px-4">
                {Object.entries(equipmentStats).map(([label, { count, color }]) => (
                    <CircularProgress
                        key={label}
                        value={count}   
                        maxValue={equipmentStats['设备总数'].count}
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