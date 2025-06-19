export const customStyles = {
    rows: {
        style: {
            minHeight: '10vh', // Ajusta la altura de las filas de manera responsiva
        },
    },
    headCells: {
        style: {
            paddingLeft: '1%', // Le da padding izquierdo a las celdas de la cabecera
            paddingRight: '1%', // Le da padding derecho a las celdas de la cabecera
            fontSize: '1rem', // Tamaño de la fuente
            backgroundColor: '#0C4A6E', // Color de fondo
            color: "#fff" // Color de la fuente
        },
    },
    cells: {
        style: {
            paddingLeft: '0.5%', // Le da padding izquierdo a las celdas
            paddingRight: '0.5%', // Le da padding derecho a las celdas
         },
    },
    '@media (max-width: 768px)': {
        headCells: {
            style: {
                fontSize: '0.875rem', // Tamaño de la fuente más pequeño en pantallas pequeñas
            },
        },
        cells: {
            style: {
                paddingLeft: '0.25%', // Menos padding en pantallas pequeñas
                paddingRight: '0.25%', // Menos padding en pantallas pequeñas
                wordBreak: 'break-word',
            },
        },
    },
};