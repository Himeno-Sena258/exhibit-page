import React, { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useFaultStore from '@/stores/fault-store';
import { type fault } from '@/types';

/**
 * 故障管理组件
 * 包含两个子块：前五类频出故障、故障统计分析图表
 */
const FaultManagement: React.FC = () => {
    const { faultList, loadFaultList } = useFaultStore();

    React.useEffect(() => {
        if (faultList.length === 0) {
            loadFaultList();
        }
    }, [loadFaultList, faultList]);

    /**
     * 计算设备故障次数统计（前5名）
     */
    const topFaultEquipments = useMemo(() => {
        const equipmentFaultCount = new Map<string, number>();
        
        faultList.forEach((fault: fault) => {
            const count = equipmentFaultCount.get(fault.equipmentId) || 0;
            equipmentFaultCount.set(fault.equipmentId, count + 1);
        });

        return Array.from(equipmentFaultCount.entries())
            .map(([equipmentId, count], index) => ({
                序号: index + 1,
                设备id: equipmentId,
                故障次数: count
            }))
            .sort((a, b) => b.故障次数 - a.故障次数)
            .slice(0, 5);
    }, [faultList]);

    /**
     * 计算故障类型统计（前5名）
     */
    const topFaultTypes = useMemo(() => {
        const faultTypeCount = new Map<string, number>();
        
        faultList.forEach((fault: fault) => {
            const count = faultTypeCount.get(fault.type) || 0;
            faultTypeCount.set(fault.type, count + 1);
        });

        return Array.from(faultTypeCount.entries())
            .map(([type, count], index) => ({
                序号: index + 1,
                故障类型: type,
                总次数: count
            }))
            .sort((a, b) => b.总次数 - a.总次数)
            .slice(0, 5);
    }, [faultList]);

    /**
     * 每日故障统计数据
     */
    const dailyFaultData = useMemo(() => {
        const dailyCount = new Map<string, number>();
        
        faultList.forEach((fault: fault) => {
            const count = dailyCount.get(fault.time) || 0;
            dailyCount.set(fault.time, count + 1);
        });

        return Array.from(dailyCount.entries())
            .map(([date, count]) => ({
                日期: date,
                故障数: count,
                故障率: (count / 3000).toFixed(3)
            }))
            .sort((a, b) => a.日期.localeCompare(b.日期));
    }, [faultList]);

    return (
        <div className="w-full h-full flex flex-col space-y-2">
            {/* 上子块：前五类频出故障名称和故障设备 - 40%高度 */}
            <div className="h-[40%] min-h-0 flex flex-col">
                <h2 className="text-white text-base font-bold mb-1 text-center">
                    前五类频出故障名称和故障设备
                </h2>
                <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
                    {/* 左侧：设备故障次数列表 */}
                    <div className="flex flex-col min-h-0">
                        <div className="bg-white/5 rounded-lg overflow-hidden flex-1 flex flex-col">
                            <div className="grid grid-cols-3 bg-blue-600/50 text-white font-semibold p-2 text-sm">
                                <div className="text-center">序号</div>
                                <div className="text-center">设备ID</div>
                                <div className="text-center">故障次数</div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {topFaultEquipments.map((item, index) => (
                                    <div key={index} className="grid grid-cols-3 text-white p-2 border-b border-white/10 last:border-b-0 text-sm">
                                        <div className="text-center">{item.序号}</div>
                                        <div className="text-center">{item.设备id}</div>
                                        <div className="text-center">{item.故障次数}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* 右侧：故障类型统计列表 */}
                    <div className="flex flex-col min-h-0">
                        <div className="bg-white/5 rounded-lg overflow-hidden flex-1 flex flex-col">
                            <div className="grid grid-cols-3 bg-blue-600/50 text-white font-semibold p-2 text-sm">
                                <div className="text-center">序号</div>
                                <div className="text-center">故障类型</div>
                                <div className="text-center">总次数</div>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {topFaultTypes.map((item, index) => (
                                    <div key={index} className="grid grid-cols-3 text-white p-2 border-b border-white/10 last:border-b-0 text-sm">
                                        <div className="text-center">{item.序号}</div>
                                        <div className="text-center">{item.故障类型}</div>
                                        <div className="text-center">{item.总次数}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 下子块：故障统计分析折线柱状图 - 60%高度 */}
            <div className="h-[60%] min-h-0 flex flex-col">
                <h2 className="text-white text-base font-bold mb-1 text-center">
                    故障统计分析
                </h2>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={dailyFaultData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                            <XAxis 
                                dataKey="日期" 
                                stroke="white"
                                fontSize={10}
                            />
                            <YAxis 
                                yAxisId="left"
                                stroke="white"
                                fontSize={10}
                                domain={[0, 'dataMax']}
                                tickFormatter={(value) => String(Math.round(value / 10) * 10)}
                            />
                            <YAxis 
                                yAxisId="right"
                                orientation="right"
                                stroke="white"
                                fontSize={10}
                                domain={[0, 'dataMax']}
                                tickFormatter={(value) => (Math.round(value * 5) / 5).toFixed(1)}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            />
                            <Legend />
                            <Bar 
                                yAxisId="left"
                                dataKey="故障数" 
                                fill="#0088FE" 
                                name="故障数"
                            />
                            <Line 
                                yAxisId="right"
                                type="monotone" 
                                dataKey="故障率" 
                                stroke="#FFD700" 
                                strokeWidth={2}
                                name="故障率"
                                dot={{ fill: '#FFD700', strokeWidth: 2, r: 3 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FaultManagement;