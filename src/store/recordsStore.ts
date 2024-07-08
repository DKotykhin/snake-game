import { Record, UpdateRecord } from 'types/Record';
import { create } from 'zustand';

type RecordsStore = {
  recordsData: Record[];
  addRecords: (item: Record[]) => void;
  updateRecords: (item: UpdateRecord) => void;
  removeRecords: () => void;
};

export const useRecordsStore = create<RecordsStore>()((set) => ({
  recordsData: [{
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    level: 0,
    score: 0,
  }],
  addRecords: (item: Record[]) =>
    set(() => ({
      recordsData: item,
    })),

  updateRecords: (item: UpdateRecord) =>
    set((state) => ({
      recordsData: state.recordsData.map((record) =>
        record.level === item.level ? { ...record, ...item } : record
      ),
    })),

  removeRecords: () =>
    set(() => ({
      recordsData: [],
    })),
}));
