// Datos que se mostrarán en la tabla de denuncias
type Row = {
    numero_de_expediente: string;
    _id: string;
    fecha: string;
    victima_nombre: string;
    victimario_nombre: string;
    municipio: string;
    direccion: string;
    jurisdiccion_policial: string;
    violencia: string;
    modalidades: string;
    createdAt: string;

}
/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

export const columnsDenuncia = [
    {
        // Número de expediente de la denuncia
        name: 'ID',
        selector: (row:Row) => row._id,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Número de expediente de la denuncia
        name: 'Número de Expediente',
        selector: (row:Row) => row.numero_de_expediente,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Fecha en la que se realizó la denuncia
        name: 'Fecha denuncia',
        selector: (row:Row) => row.fecha,
        sortable: true,
        id: 'Fecha',
        format: (row:Row) => `${new Date(row.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.fecha).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Fecha en la que se cargó la denuncia, puede diferir de la fecha de la denuncia
        name: 'Fecha carga',
        selector: (row:Row) => row.createdAt,
        sortable: true,
        format: (row:Row) => `${new Date(row.createdAt).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.createdAt).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.createdAt).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre de la víctima
        name: 'Víctima',
        selector: (row:Row) => row.victima_nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Nombre del victimario
        name: 'Victimario',
        selector: (row:Row) => row.victimario_nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Municipio dónde sucedió el hecho
        name: 'Municipio',
        selector: (row:Row) => row.municipio,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
            width: '40px',
        },

    },
    {
        // Jurisdicción policial a la que pertenece la denuncia
        name: 'Jurisdicción policial',
        selector: (row:Row) => row.jurisdiccion_policial,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Tipo de violencia
        name: 'Violencia',
        selector: (row:Row) => row.violencia,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Modalidad de la denuncia
        name: 'Modalidad',
        selector: (row:Row) => row.modalidades,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },

];