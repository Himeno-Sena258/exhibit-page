import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useFaultStore from '@/stores/fault-store';
import { type fault } from '@/types';

/**
 * 故障类型统计饼状图组件
 * 从故障管理组件中独立出来的饼状图部分
 */
const FaultTypePieChart: React.FC = () => {
    const { faultList, loadFaultList } = useFaultStore();

    React.useEffect(() => {
        if (faultList.length === 0) {
            loadFaultList();
        }
    }, [loadFaultList, faultList]);

    /**
     * 饼状图数据
     */
    const pieChartData = useMemo(() => {
        const faultTypeCount = new Map<string, number>();
        
        faultList.forEach((fault: fault) => {
            const count = faultTypeCount.get(fault.type) || 0;
            faultTypeCount.set(fault.type, count + 1);
        });

        return Array.from(faultTypeCount.entries()).map(([name, value]) => ({
            name,
            value
        }));
    }, [faultList]);

    // 饼状图颜色配置
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

    /**
     * 饼状图自定义标签
     */
    const renderLabel = (entry: { name: string; value: number }) => {
        return entry.name;
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 故障类型统计标题 */}
            <h2 className="text-white text-base font-bold mb-1 text-center">
                故障类型统计
            </h2>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderLabel}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value: number, name: string) => [`${value}次`, name]}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                color: '#333333',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FaultTypePieChart;