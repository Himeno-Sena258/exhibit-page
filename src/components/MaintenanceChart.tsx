import React, { useEffect, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useChartDataStore from '@/stores/chart-data-store';
import { type chartData } from '@/types';

/**
 * 维护统计图表组件
 * 展示维护统计分析，包含：
 * - 左侧Y轴：需保养数和已保养数（柱状图）
 * - 右侧Y轴：保养率（折线图，百分比显示）
 * - X轴：日期
 */
const MaintenanceChart: React.FC = () => {
    const { maintenanceDataList, loadMaintenanceDataList } = useChartDataStore();

    /**
     * 组件挂载时加载维护数据
     */
    useEffect(() => {
        if (maintenanceDataList.length === 0) {
            loadMaintenanceDataList();
        }
    }, [loadMaintenanceDataList, maintenanceDataList]);

    /**
     * 处理维护数据，计算保养率
     * 将原始数据转换为图表所需格式
     */
    const chartData = useMemo(() => {
        return maintenanceDataList.map((item: chartData) => {
            // 计算保养率：已保养/需保养 * 100%
            const maintenanceRate = item.target > 0 ? (item.actual / item.target * 100) : 0;
            
            return {
                日期: item.date,
                需保养: item.target,
                已保养: item.actual,
                保养率: Number(maintenanceRate.toFixed(1)) // 保留一位小数
            };
        });
    }, [maintenanceDataList]);

    /**
     * 自定义Tooltip内容组件
     */
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-3 shadow-lg">
                    <p className="text-white font-semibold mb-2">{`日期: ${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.name}: ${entry.name === '保养率' ? entry.value + '%' : entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-white text-xl font-bold mb-4 text-center">
                维护统计分析
            </h2>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        
                        {/* X轴 - 日期 */}
                        <XAxis 
                            dataKey="日期" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                        />
                        
                        {/* 左侧Y轴 - 保养数量 */}
                        <YAxis 
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            label={{ value: '数量', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
                        {/* 右侧Y轴 - 保养率（百分比） */}
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                            label={{ value: '保养率', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
                        {/* Tooltip */}
                        <Tooltip 
                            labelStyle={{ color: '#333333' }}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                color: '#333333',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}
                            formatter={(value: number, name: string) => {
                                if (name === '保养率') {
                                    return [`${value}%`, name];
                                }
                                return [value, name];
                            }}
                        />
                        
                        {/* 图例 */}
                        <Legend 
                            wrapperStyle={{ color: 'white' }}
                            iconType="rect"
                        />
                        
                        {/* 需保养数柱状图 - 青色 */}
                        <Bar 
                            yAxisId="left"
                            dataKey="需保养" 
                            fill="#00CED1" 
                            name="需保养"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        {/* 已保养数柱状图 - 浅蓝色 */}
                        <Bar 
                            yAxisId="left"
                            dataKey="已保养" 
                            fill="#87CEEB" 
                            name="已保养"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        {/* 保养率折线图 - 金色 */}
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="保养率" 
                            stroke="#FFD700" 
                            strokeWidth={3}
                            name="保养率"
                            dot={{ fill: '#FFD700', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, fill: '#FFD700' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MaintenanceChart;