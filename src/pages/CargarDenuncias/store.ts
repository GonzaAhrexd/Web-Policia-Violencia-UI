import { create } from 'zustand';

interface State {
  openModalVictima: boolean;
  openModalVictimario: boolean;
  openModalTercero: boolean;
  isModalOpen: boolean;
  victimaCargar: any;
  victimarioCargar: any;
  terceroCargar: any;
  isSolicitudAprehension: boolean;
  isAprehendido: boolean;
  genero: string;
  titulo: string;
  texto: string[];
  setTitulo: (titulo: string) => void;
  setTexto: (texto: string[]) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setOpenModalVictima: (open: boolean) => void;
  setOpenModalVictimario: (open: boolean) => void;
  setOpenModalTercero: (open: boolean) => void;
  setVictimaCargar: (data: any) => void;
  setVictimarioCargar: (data: any) => void;
  setTerceroCargar: (data: any) => void;
  setSolicitudAprehension: (solicitud: boolean) => void;
  setAprehendido: (aprehension: boolean) => void;
  setGenero: (genero: string) => void;
}

export const useStore = create<State>((set) => ({
  titulo: '',
  texto: [''],
  openModalVictima: false,
  openModalVictimario: false,
  openModalTercero: false,
  victimaCargar: null,
  victimarioCargar: null,
  terceroCargar: null,
  isSolicitudAprehension: false,
  isAprehendido: false,
  genero: '',
  isModalOpen: false,
  setTitulo: (titulo) => set({ titulo }),
  setTexto: (texto) => set({ texto }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setOpenModalVictima: (open) => set({ openModalVictima: open }),
  setOpenModalVictimario: (open) => set({ openModalVictimario: open }),
  setOpenModalTercero: (open) => set({ openModalTercero: open }),
  setVictimaCargar: (data) => set({ victimaCargar: data }),
  setVictimarioCargar: (data) => set({ victimarioCargar: data }),
  setTerceroCargar: (data) => set({ terceroCargar: data }),
  setSolicitudAprehension: (solicitud) => set({ isSolicitudAprehension: solicitud }),
  setAprehendido: (aprehension) => set({ isAprehendido: aprehension }),
  setGenero: (genero) => set({ genero: genero }),
}));