import { create } from 'zustand';
import { type bussiness } from '@/types';
import { mockBussinessList } from '@/mock-data';

interface BussinessStore {
    bussinessList: bussiness[],
    loadBussinessList: () => void,
}

const useBussinessStore = create<BussinessStore>((set) => ({
    bussinessList: [],
    loadBussinessList: () => {
        const datas = mockBussinessList;
        set({ bussinessList: datas });
    },
}));

export default useBussinessStore;
