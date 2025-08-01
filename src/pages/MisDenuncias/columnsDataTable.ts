/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

// Datos que se mostrarán en la tabla de denuncias

import Denuncia from '../../types/Denuncia';

// type Row = {
//     numero_de_expediente: string;
//     fecha: string;
//     victima_nombre: string;
//     victimario_nombre: string;
//     municipio: string;
//     direccion: string;
//     jurisdiccion_policial: string;
//     violencia: string;
//     modalidades: string;
//     createdAt: string;
// }

// Columnas de la tabla de denuncias
export const columnsDenuncia = [
    {
        // Número de expediente de la denuncia
        name: 'Número de Expediente',
        selector: (row: Denuncia) => row.numero_de_expediente,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Fecha en la que se realizó la denuncia
        name: 'Fecha denuncia',
        selector: (row: Denuncia) => row.fecha,
        sortable: true,
        format: (row: Denuncia) => `${new Date(row.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.fecha).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Fecha en la que se cargó la denuncia, puede diferir de la fecha de la denuncia
        name: 'Fecha carga',
        selector: (row: Denuncia) => new Date(row.createdAt).toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}),
        sortable: true,
        id: "Fecha",
        // format: (row:Row) => `${new Date(row.createdAt).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.createdAt).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.createdAt).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre de la víctima
        name: 'Víctima',
        selector: (row: Denuncia) => row.victima_nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Nombre del victimario
        name: 'Victimario',
        selector: (row: Denuncia) => row.victimario_nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Municipio dónde sucedió el hecho
        name: 'Municipio',
        selector: (row: Denuncia) => row.municipio,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Dirección dónde sucedió el hecho
        name: 'Dirección',
        selector: (row: Denuncia) => row.direccion,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Jurisdicción policial a la que pertenece la denuncia
        name: 'Jurisdicción policial',
        selector: (row: Denuncia) => row.jurisdiccion_policial,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Tipo de violencia
        name: 'Violencia',
        selector: (row: Denuncia) => row.violencia,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Modalidad de la denuncia
        name: 'Modalidad',
        selector: (row: Denuncia) => row.modalidades,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },

];