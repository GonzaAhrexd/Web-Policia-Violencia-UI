// Datos que se mostrarán en la tabla de denuncias
type Row = {
    _id: string;
    fecha: Date;
    objeto: string;
    division: string;
}


const columnsPreventivo = [
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
        // Fecha en la que se cargó la denuncia, puede diferir de la fecha de la denuncia
        name: 'Fecha',
        selector: (row:Row) => row.fecha,
        sortable: true,
        format: (row:Row) => `${new Date(row.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(row.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(row.fecha).getUTCFullYear()}`,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Objeto de la denuncia
        name: 'Objeto',
        selector: (row:Row) => row.objeto,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // División dónde se realizó el preventivo
        name: 'División',
        selector: (row:Row) => row.division,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
  
];

export default columnsPreventivo