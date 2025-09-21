import { create } from 'zustand';
import { type fault } from '@/types';
import { mockFaultList } from '@/mock-data';

interface FaultStore {
    faultList: fault[],
    loadFaultList: () => void,
}

const useFaultStore = create<FaultStore>((set) => ({
    faultList: [],
    loadFaultList: () => {
        const datas = mockFaultList;
        set({ faultList: datas });
    },
}));

export default useFaultStore;
