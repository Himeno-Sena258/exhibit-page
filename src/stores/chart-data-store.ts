import { create } from 'zustand';
import { type chartData } from '@/types';
import { mockInspectionData, mockMaintenanceData, mockRepairData } from '@/mock-data';

interface ChartDataStore {
    inspectionDataList: chartData[],
    maintenanceDataList: chartData[],
    repairDataList: chartData[],
    loadInspectionDataList: () => void,
    loadMaintenanceDataList: () => void,
    loadRepairDataList: () => void,
}

const useChartDataStore = create<ChartDataStore>((set) => ({
    inspectionDataList: [],
    maintenanceDataList: [],
    repairDataList: [],
    loadInspectionDataList: () => {
        const datas = mockInspectionData;
        set({ inspectionDataList: datas });
    },
    loadMaintenanceDataList: () => {
        const datas = mockMaintenanceData;
        set({ maintenanceDataList: datas });
    },
    loadRepairDataList: () => {
        const datas = mockRepairData;
        set({ repairDataList: datas });
    },
}));

export default useChartDataStore;
