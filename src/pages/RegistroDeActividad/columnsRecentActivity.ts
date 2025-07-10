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
    fecha: Date,
    usuario: string,
    descripcion: string,
    modelo_modificado: string,
    id_del_modelo: string,
}

// Columnas de la tabla de denuncias
const columns = [
    {
        // Fecha
        name: 'Fecha',
        sortable: true,
        id: 'Fecha',
        width: '180px',
        // Haz que muestre la fecha con la hora en formato dd/mm/yyyy hh:mm:ss con GMT-3
        selector: (row:Row) => new Date(row.fecha).toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}),
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Usuario
        name: 'Usuario',
        selector: (row:Row) => row.usuario,
        width: '150px',
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Descripción
        name: 'Descripción',
        selector: (row:Row) => row.descripcion,
        sortable: true,
        minwidth: '300px',
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Modelo modificado
        name: 'Sección',
        selector: (row:Row) => row.modelo_modificado,
        sortable: true,
        width: '200px',
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // ID del modelo
        name: 'ID de sección modificada',
        selector: (row:Row) => row.id_del_modelo,
        width: '300px',
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
];

export default columns;