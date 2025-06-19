// Datos que se mostrarán en la tabla de denuncias
type Row = {
    nombre: string,
    apellido: string,
    DNI: string,
    vinculo_con_victima: string
}


export const columnTercero = [
    {
        // Número de expediente de la denuncia
        name: 'Nombre',
        selector: (row: Row) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        name: 'Apellido',
        selector: (row: Row) => row.apellido,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'DNI',
        selector: (row: Row) => row.DNI,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },

];