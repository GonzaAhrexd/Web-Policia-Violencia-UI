import { create } from 'zustand';

interface State {
  openModal: boolean;
  title: string;
  text: any;
  setOpenModal: (open: boolean) => void;
  setTitle: (title: string) => void;
  setText: (text: any) => void;
}

export const useStore = create<State>((set) => ({
  openModal: false,
  title: '',
  text: '',
  setOpenModal: (open) => set({ openModal: open }),
  setTitle: (title) => set({ title: title }),
  setText: (text) => set({ text: text }),
  
}));