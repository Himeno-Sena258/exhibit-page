import React, { useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useBussinessStore from '@/stores/bussiness-store';
import { type bussiness } from '@/types';


const BusinessManagement: React.FC = () => {
    const { bussinessList, loadBussinessList } = useBussinessStore();
    

    useEffect(() => {
        if (bussinessList.length === 0) {
            loadBussinessList();
        }
    }, [loadBussinessList]);


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];


    const pieChartData = useMemo(() => {
        const statusCount: Record<string, number> = {};

        bussinessList.forEach((business: bussiness) => {
            statusCount[business.status] = (statusCount[business.status] || 0) + 1;
        });


        return Object.entries(statusCount).map(([status, count]) => ({
            name: status,
            value: count
        }));
    }, [bussinessList]);


    const renderLabel = (entry: { name: string; value: number }) => {
        return entry.name;
    };

    return (
        <div className="w-full h-full flex flex-col">

            <div className="pt-4 pb-4">
                <h5 className="text-center text-white text-2xl font-bold">
                    业务管理
                </h5>
            </div>


            <div className="flex-1 flex flex-col min-h-0">
                <h2 className="text-white text-lg font-bold mb-2 text-center">
                    业务状态统计
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
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value: number, name: string) => [`${value}个`, name]}
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
        </div>
    );
};

export default BusinessManagement;