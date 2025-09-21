import React, { useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useBussinessStore from '@/stores/bussiness-store';
import { type bussiness } from '@/types';

/**
 * 业务管理组件
 * 负责展示业务状态统计信息，使用饼状图显示各状态业务的分布情况
 */
const BusinessManagement: React.FC = () => {
    const { bussinessList, loadBussinessList } = useBussinessStore();
    
    /**
     * 组件挂载时加载业务列表
     */
    useEffect(() => {
        if (bussinessList.length === 0) {
            loadBussinessList();
        }
    }, [loadBussinessList]);

    /**
     * 饼状图颜色配置
     * 与故障类型统计饼状图保持一致的颜色方案
     */
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

    /**
     * 计算业务状态统计数据
     * 统计各状态业务的数量，生成饼状图数据
     */
    const pieChartData = useMemo(() => {
        const statusCount: Record<string, number> = {};
        
        // 统计各状态业务数量
        bussinessList.forEach((business: bussiness) => {
            statusCount[business.status] = (statusCount[business.status] || 0) + 1;
        });

        // 转换为饼状图数据格式
        return Object.entries(statusCount).map(([status, count]) => ({
            name: status,
            value: count
        }));
    }, [bussinessList]);

    /**
     * 饼状图自定义标签
     * 显示状态名称
     */
    const renderLabel = (entry: { name: string; value: number }) => {
        return entry.name;
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* 业务管理标题 */}
            <div className="pt-4 pb-4">
                <h5 className="text-center text-white text-2xl font-bold">
                    业务管理
                </h5>
            </div>

            {/* 业务状态统计饼状图 */}
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