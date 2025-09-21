import { create } from 'zustand';
import { type equipment } from '@/types';
import { mockEquipmentStatusList } from '@/mock-data';

interface EquipmentStore {
    equipmentStatusList: equipment[],
    loadEquipmentStatusList: () => void,
}

const useEquipmentStore = create<EquipmentStore>((set) => ({
    equipmentStatusList: [],
    loadEquipmentStatusList: () => {
        const datas = mockEquipmentStatusList;
        set({ equipmentStatusList: datas });
    },
}));

export default useEquipmentStore;