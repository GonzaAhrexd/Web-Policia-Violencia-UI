import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import direccionDivisiones from '../../../GlobalConst/direccionDivisiones';

import styles from '../../../GlobalConst/PDFStyles'

// Asegúrate de tener un archivo de estilos para el PDF

type PDFProps = {
    datos: any
    user: any
}

type division = {
    division: string,
    direccion: string,
    telefono: string
}

function PDF({ datos, user}: PDFProps) {

    // Estilos para el PDF
  
    // Filtrar las divisiones de la dirección según la unidad del usuario
    const userDivisionZona = user.unidad.split(",")
    // Filtrar las divisiones que coinciden con la división del usuario
    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                    <View style={styles.sectionCenter}>
                        <Text style={styles.textBold}>POLICÍA DE LA PROVINCIA DEL CHACO</Text>
                        <Text>DIVISIÓN VIOLENCIA FAMILIAR Y DE GÉNERO {direccionDivision[0].division.toUpperCase()}</Text>
                        <Text>{direccionDivision[0].direccion} - {direccionDivision[0].division} - Chaco; Tel. {direccionDivision[0].telefono}</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
                </View>
                <View style={styles.section}>
                    <Text>{datos.victima_nombre} DENUNCIA: </Text>
                    {datos.observaciones && <Text style={styles.text}>{datos.observaciones}</Text>}
                </View>
            </Page>
        </Document>
    )


}

export default PDF