import React, { useEffect, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useChartDataStore from '@/stores/chart-data-store';
import { type chartData } from '@/types';

const RepairChart: React.FC = () => {
    const { repairDataList, loadRepairDataList } = useChartDataStore();
    useEffect(() => {
        if (repairDataList.length === 0) {
            loadRepairDataList();
        }
    }, [loadRepairDataList, repairDataList]);
    const chartData = useMemo(() => {
        return repairDataList.map((item: chartData) => {
            const repairRate = item.target > 0 ? (item.actual / item.target * 100) : 0;
            
            return {
                日期: item.date,
                需维修: item.target,
                已维修: item.actual,
                维修率: Number(repairRate.toFixed(1))
            };
        });
    }, [repairDataList]);
 


    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-white text-xl font-bold mb-4 text-center">
                维修统计分析
            </h2>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        
                        <XAxis 
                            dataKey="日期" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                        />
                        
                        <YAxis 
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            label={{ value: '数量', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
                        <YAxis 
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'white', fontSize: 12 }}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                            label={{ value: '维修率', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: 'white' } }}
                        />
                        
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
                                if (name === '维修率') {
                                    return [`${value}%`, name];
                                }
                                return [value, name];
                            }}
                        />
                        
                        <Legend 
                            wrapperStyle={{ color: 'white' }}
                            iconType="rect"
                        />
                        
                        <Bar 
                            yAxisId="left"
                            dataKey="需维修" 
                            fill="#00CED1" 
                            name="需维修"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        <Bar 
                            yAxisId="left"
                            dataKey="已维修" 
                            fill="#87CEEB" 
                            name="已维修"
                            radius={[2, 2, 0, 0]}
                        />
                        
                        <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="维修率" 
                            stroke="#FFD700" 
                            strokeWidth={3}
                            name="维修率"
                            dot={{ fill: '#FFD700', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, fill: '#FFD700' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RepairChart;