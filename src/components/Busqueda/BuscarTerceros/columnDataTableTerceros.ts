// Datos que se mostrarán en la tabla de denuncias
import Tercero from '../../../types/Tercero';


export const columnTercero = [
    {
        // Número de expediente de la denuncia
        name: 'Nombre',
        selector: (row: Tercero) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        name: 'Apellido',
        selector: (row: Tercero) => row.apellido,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'DNI',
        selector: (row: Tercero) => row.DNI,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },

];