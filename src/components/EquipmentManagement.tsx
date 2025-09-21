import React, { useEffect, useMemo } from 'react';
import useEquipmentStore from '@/stores/equipment-store';
import { type equipment } from '@/types';
import CircularProgress from '@/components/CircularProgress';

/**
 * 设备管理组件
 * 负责展示设备状态统计信息，包括设备总数、运行数量、故障数量、待机数量、关机数量
 */
const EquipmentManagement: React.FC = () => {
    const { equipmentStatusList, loadEquipmentStatusList } = useEquipmentStore();
    
    /**
     * 组件挂载时加载设备状态列表
     */
    useEffect(() => {
        loadEquipmentStatusList();
    }, []); // 移除loadEquipmentStatusList依赖，避免重复调用

    /**
     * 设备状态配置字典
     * 定义各种设备状态的显示名称、初始数量和颜色
     */
    const statusConfig = useMemo(() => ({
        '设备总数': { count: 0, color: '#00D4FF' },
        '运行数量': { count: 0, color: '#00BFFF' },
        '故障数量': { count: 0, color: '#FF6B6B' },
        '待机数量': { count: 0, color: '#FFD93D' },
        '关机数量': { count: 0, color: '#A0A0A0' }
    }), []);

    /**
     * 计算各状态设备数量
     * 根据设备列表统计各种状态的设备数量
     */
    const equipmentStats = useMemo(() => {
        // 重新创建统计对象，避免在原有基础上累加
        const stats = {
            '设备总数': { count: 0, color: '#00D4FF', label: '设备总数' },
            '运行数量': { count: 0, color: '#00D4FF', label: '运行数量' },
            '故障数量': { count: 0, color: '#FF6B6B', label: '故障数量' },
            '待机数量': { count: 0, color: '#FFD93D', label: '待机数量' },
            '关机数量': { count: 0, color: '#6C7B7F', label: '关机数量' }
        };
        
        // 设置设备总数
        stats['设备总数'].count = equipmentStatusList.length;
        
        // 遍历设备列表，递增对应状态的数量
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
            {/* 设备状态标题 */}
            <div className="pt-4 pb-4">
                <h5 className="text-center text-white text-2xl font-bold">
                    设备状态
                </h5>
            </div>

            {/* 设备状态统计圆形进度条 */}
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