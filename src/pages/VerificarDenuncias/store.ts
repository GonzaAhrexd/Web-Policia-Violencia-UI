import { create } from 'zustand';

interface State {
    openModalVictima: boolean;
    openModalVictimario: boolean;
    openModalTercero: boolean;
    titulo: string;
    texto: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    setTitulo: (titulo: string) => void;
    setTexto: (texto: string) => void;
    setOpenModalVictima: (open: boolean) => void;
    setOpenModalVictimario: (open: boolean) => void;
    setOpenModalTercero: (open: boolean) => void;

}

export const useStore = create<State>((set) => ({
    openModalVictima: false,
    openModalVictimario: false,
    openModalTercero: false,
    titulo: "",
    texto: "",
    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    setTitulo: (titulo) => set({ titulo }),
    setTexto: (texto) => set({ texto }),
    setOpenModalVictima: (open) => set({ openModalVictima: open }),
    setOpenModalVictimario: (open) => set({ openModalVictimario: open }),
    setOpenModalTercero: (open) => set({ openModalTercero: open }),
}));
