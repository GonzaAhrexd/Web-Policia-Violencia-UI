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
type Row = {
    numero_de_expediente: string;
    fecha: string;
    nombre_victima: string;
    apellido_victima: string;
    DNI_victima: string;
    division: string;
    createdAt: string;
}

export const columnsDataTableVerificar:Array<Object> = [
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
        name: 'Denunciante',
        selector: (row:Row) => row.nombre_victima + ' ' + row.apellido_victima,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Municipio dónde sucedió el hecho
        name: 'DNI',
        selector: (row:Row) => row.DNI_victima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Dirección dónde sucedió el hecho
        name: 'Unidad que lo emitió',
        selector: (row:Row) => row.division?.split(',')[row.division?.split(',').length - 1],
        sortable: true,
        style: {
            fontSize: '12px',
            fontWeight: 500,
            wrap: true,
        },
    },
];