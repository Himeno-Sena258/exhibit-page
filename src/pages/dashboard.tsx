import React from 'react';
import HeaderBar from '@/components/HeaderBar';
import FaultManagement from '@/components/FaultManagement';
import EquipmentManagement from '@/components/EquipmentManagement';
import BusinessManagement from '@/components/BusinessManagement';
import InspectionChart from '@/components/InspectionChart';
import MaintenanceChart from '@/components/MaintenanceChart';
import RepairChart from '@/components/RepairChart';
import FaultTypePieChart from '@/components/FaultTypePieChart';

const Dashboard: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <HeaderBar title="设备运营中心" />
            
            <div className="flex-1 relative">
                <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #051641 0%, #041235 50%, #051641 100%)'}}>
                </div>

                <div className="relative z-10 flex h-[calc(100vh-80px)] gap-4 p-4">
                    <div className="w-[30%] flex flex-col gap-4">
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <InspectionChart />
                        </div>
                        <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <MaintenanceChart />
                        </div>
                    </div>
                    <div className="w-[35%] flex flex-col gap-4">
                        <div className="h-[40%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <EquipmentManagement />
                        </div>
                        
                        <div className="h-[35%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <BusinessManagement />
                        </div>
                        <div className="h-[25%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <FaultTypePieChart />
                        </div>
                    </div>
                    <div className="w-[35%] flex flex-col gap-4">
                        <div className="h-[35%] bg-white/5 backdrop-blur-sm rounded-lg p-4">
                            <RepairChart />
                        </div>
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
