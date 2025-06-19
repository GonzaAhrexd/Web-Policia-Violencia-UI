// Datos que se mostrarán en la tabla de denuncias
type Row = {
    nombre: string,
    apellido: string,
    DNI: string,
    ocupacion: string,
    edad: string,
    estado_civil: string
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

export const columnsVictima = [
    {
        // Número de expediente de la denuncia
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Apellido',
        selector: (row:Row) => row.apellido,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'DNI',
        selector: (row:Row) => row.DNI,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Ocupación',
        selector: (row:Row) => row.ocupacion,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Edad',
        selector: (row:Row) => row.edad ? row.edad : "No específicado",
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: 'Estado civil',
        selector: (row:Row) => row.estado_civil,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    } 
];