import { create } from 'zustand';
import { type equipment } from '@/types';
import { mockEquipmentStatusList } from '@/mock-data';

interface EquipmentStore {
    equipmentStatusList: equipment[],
    isLoaded: boolean,
    loadEquipmentStatusList: () => void,
}

const useEquipmentStore = create<EquipmentStore>((set, get) => ({
    equipmentStatusList: [],
    isLoaded: false,
    loadEquipmentStatusList: () => {
        // 防止重复加载
        if (get().isLoaded) {
            return;
        }
        
        const datas = mockEquipmentStatusList;
        set({ equipmentStatusList: datas, isLoaded: true });
    },
}));

export default useEquipmentStore;