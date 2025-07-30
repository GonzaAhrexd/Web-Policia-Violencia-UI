/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:DenunciaSinVerificar) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/



import DenunciaSinVerificar from "../../types/DenunciaSinVerificar";

export const columnsDataTableVerificar:Array<Object> = [
    {
        // Número de expediente de la denuncia
        name: 'Número de Expediente',
        selector: (row:DenunciaSinVerificar) => row.numero_de_expediente,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    
    {
        // Fecha en la que se cargó la denuncia, puede diferir de la fecha de la denuncia
        name: 'Fecha carga',
        selector: (row:DenunciaSinVerificar) => row.createdAt,
        sortable: true,
        format: (row:DenunciaSinVerificar) => `${new Date(row.createdAt).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.createdAt).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.createdAt).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre de la víctima
        name: 'Denunciante',
        selector: (row:DenunciaSinVerificar) => row.nombre_victima + ' ' + row.apellido_victima,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Municipio dónde sucedió el hecho
        name: 'DNI',
        selector: (row:DenunciaSinVerificar) => row.DNI_victima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Dirección dónde sucedió el hecho
        name: 'Unidad que lo emitió',
        selector: (row:DenunciaSinVerificar) => row.division?.split(',')[row.division?.split(',').length - 1],
        sortable: true,
        style: {
            fontSize: '12px',
            fontWeight: 500,
            wrap: true,
        },
    },
];