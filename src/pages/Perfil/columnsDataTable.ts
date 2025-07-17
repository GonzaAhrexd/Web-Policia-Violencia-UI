/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:ActividadReciente) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

// Datos que se mostrarán en la tabla de denuncias
import ActividadReciente from "../../types/ActividadReciente";
// Columnas de la tabla de denuncias
export const columns = [
    {
        // Fecha
        name: 'Fecha',
        sortable: true,
        // Haz que muestre la fecha con la hora en formato dd/mm/yyyy hh:mm:ss con GMT-3
        selector: (row:ActividadReciente) => new Date(row.fecha).toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}),
        id: "fecha",
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

        
    },
    {
        // Descripción
        name: 'Descripción',
        selector: (row:ActividadReciente) => row.descripcion,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // Modelo modificado
        name: 'Sección',
        selector: (row:ActividadReciente) => row.modelo_modificado,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        // ID del modelo
        name: 'ID de sección modificada',
        selector: (row:ActividadReciente) => row.id_del_modelo,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
];