import React from 'react';
import HeaderBar from '@/components/HeaderBar';
import FaultManagement from '@/components/FaultManagement';
import EquipmentManagement from '@/components/EquipmentManagement';
import BusinessManagement from '@/components/BusinessManagement';
import InspectionChart from '@/components/InspectionChart';
import MaintenanceChart from '@/components/MaintenanceChart';
import RepairChart from '@/components/RepairChart';

const Dashboard: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* 顶部标题栏 */}
            <HeaderBar title="设备运营中心" />
            
            {/* 主要内容区域 */}
            <div className="flex-1 relative">
                {/* 背景图片占位 - 用户后续添加 */}
                <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #051641 0%, #041235 50%, #051641 100%)'}}>
                    {/* 背景图片将在这里添加 */}
                </div>
                
                {/* 内容区域 - 左中右三列布局 */}
                <div className="relative z-10 flex h-[calc(100vh-80px)] gap-4 p-4">
                    {/* 左列：点检统计图 + 保养统计图 */}
                    <div className="w-[35%] flex flex-col gap-4">
                        {/* 点检统计图 */}
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <InspectionChart />
                        </div>
                        
                        {/* 保养统计图 */}
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <MaintenanceChart />
                        </div>
                    </div>

                    {/* 中列：设备监控 + 业务管理 */}
                    <div className="w-[25%] flex flex-col gap-4">
                        {/* 设备监控 */}
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <EquipmentManagement />
                        </div>
                        
                        {/* 业务管理 */}
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <BusinessManagement />
                        </div>
                    </div>

                    {/* 右列：维修统计图 + 故障管理 */}
                    <div className="w-[40%] flex flex-col gap-4">
                        {/* 维修统计图 */}
                        <div className="h-[35%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <RepairChart />
                        </div>
                        
                        {/* 故障管理 */}
                        <div className="h-[65%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <div className="pt-2 pb-4">
                                <h5 className="text-center text-white text-xl font-bold">
                                    故障管理
                                </h5>
                            </div>
                            <div className="h-[calc(100%-60px)]">
                                <FaultManagement />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
