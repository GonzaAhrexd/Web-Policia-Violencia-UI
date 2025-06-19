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
    nombre: string,
    apellido: string,
    nombre_de_usuario: string,
    unidad: string,
    rol: string,

}

// Columnas de la tabla de denuncias
export const columns = [
    {
        // Nombre
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Apellido
        name: 'Apellido',
        selector: (row:Row) => row.apellido,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Nombre de usuario
        name: 'Nombre de usuario',
        selector: (row:Row) => row.nombre_de_usuario,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Unidad
        name: 'Unidad',
        selector: (row:Row) => row.unidad,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        // Rol
        name: 'Rol',
        selector: (row:Row) => row.rol,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
];