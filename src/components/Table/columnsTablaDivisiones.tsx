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
    _id: string;
    nombre: string;
    value: string;
    prefijo: string;
    direccion: string,
    telefono: string

}



 const columnsUnidades: any = [
  
    {
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },

    },
    {
        name: 'Valor',
        selector: (row:Row) => row.value,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },


];

export default columnsUnidades;