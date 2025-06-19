import { create } from 'zustand';

interface State {
  isSolicitudAprehension: boolean;
  setSolicitudAprehension: (solicitud: boolean) => void;
}

export const useStore = create<State>((set) => ({
  isSolicitudAprehension: false,
  setSolicitudAprehension: (solicitud) => set({ isSolicitudAprehension: solicitud }),
}));