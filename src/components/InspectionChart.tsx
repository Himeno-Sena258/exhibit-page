import React, { useEffect, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useChartDataStore from '@/stores/chart-data-store';
import { type chartData } from '@/types';

const InspectionChart: React.FC = () => {
    const { inspectionDataList, loadInspectionDataList } = useChartDataStore();
    useEffect(() => {
        if (inspectionDataList.length === 0) {
            loadInspectionDataList();
        }
    }, [loadInspectionDataList, inspectionDataList]);


    const chartData = useMemo(() => {
        return inspectionDataList.map((item: chartData) => {

            const inspectionRate = item.target > 0 ? (item.actual / item.target * 100) : 0;
            
            return {
                日期: item.date,
                需点检: item.target,
                已点检: item.actual,
                点检率: Number(inspectionRate.toFixed(1)) // 保留一位小数
            };
        });
    }, [inspectionDataList]);

    /**
     * 自定义Tooltip格式化函数
     */
    const formatTooltip = (value: number, name: string) => {
        if (name === '点检率') {
            return [`${value}%`, name];
        }
        return [value, name];
    };

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-white text-xl font-bold mb-4 text-center">
                点检统计分析
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
                        
                        {/* 左侧Y轴 - 点检数量 */}
                        <YAxis 
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            label={{ value: '数量', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
                        {/* 右侧Y轴 - 点检率（百分比） */}
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                            label={{ value: '点检率', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
                        {/* Tooltip */}
                        <Tooltip 
                            formatter={formatTooltip}
                            labelStyle={{ color: '#333333' }}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                color: '#333333',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            }}
                        />
                        
                        {/* 图例 */}
                        <Legend 
                            wrapperStyle={{ color: 'white' }}
                            iconType="rect"
                        />
                        
                        {/* 需点检数柱状图 */}
                        <Bar 
                            yAxisId="left"
                            dataKey="需点检" 
                            fill="#0088FE" 
                            name="需点检"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        {/* 已点检数柱状图 */}
                        <Bar 
                            yAxisId="left"
                            dataKey="已点检" 
                            fill="#00C49F" 
                            name="已点检"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        {/* 点检率折线图 */}
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="点检率" 
                            stroke="#FFD700" 
                            strokeWidth={3}
                            name="点检率"
                            dot={{ fill: '#FFD700', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, fill: '#FFD700' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default InspectionChart;