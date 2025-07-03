import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import direccionDivisiones from '../../../GlobalConst/direccionDivisiones';

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
    const styles = StyleSheet.create({
        page: {
            padding: 30,
        },
        section: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontSize: 12,
        },
        header: {
            fontSize: 14,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent: 'center',
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 30,
            paddingRight: 30,
        },
        subheader: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        text: {
            fontSize: 12,
            textAlign: 'justify',
        },
        signature: {
            marginTop: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        signatureSection: {
            width: '30%',
            textAlign: 'center',
        },
        sectionCenter: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 11
        },
        images: {
            width: "1.17cm",
            height: "1.70cm"
        },
        textBold: {
            fontWeight: 'bold',
            fontSize: 16
        },
        sectionRight: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: 12,
            fontWeight: 'bold',
        },
        longText: {
            fontWeight: 'bold',
            fontSize: 10,
            textAlign: 'justify',

        },
        boldText: {
            fontFamily: 'Times-Bold',
            fontSize: 12,
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
        sectionSignatureEnd: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        sectionSignatureEndContainer: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
        },
        sectionSignatureEndText: {
            display: 'flex',
            fontSize: 12,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        },
        signaturesNameAndJerarquia: {
            fontFamily: 'Times-Bold',
            fontSize: 14,
            fontWeight: 'bold',
        },
        signaturesEndEnd: {
            fontFamily: 'Times-Bold',
            fontSize: 12,
            fontWeight: 'bold',
            textDecoration: 'underline',
        }

    });

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