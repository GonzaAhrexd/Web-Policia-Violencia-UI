import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
interface PDFProps {
    datos: any
    user: any
    denunciasAMostrar: any
    valores: any
}


function PDF({ valores, datos, user, denunciasAMostrar }: PDFProps) {

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
            margin: 10,
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

    type division = {
        division: string,
        direccion: string,
        telefono: string
    }
    const userDivisionZona = user.unidad.split(",")

    const direccionDivisiones: division[] = [
        { division: "Metropolitana", direccion: "Avenida Alvear Nº 126", telefono: "362461832" },
        { division: "La Leonesa", direccion: "Santiago del Estero y Entre Ríos", telefono: "3624644562" },
        { division: "Lapachito", direccion: "25 de Mayo S/N", telefono: "3624605783" },
        { division: "Roque Saenz Peña", direccion: "Calle 7e/12 y 14", telefono: "3644431835" },
        { division: "Villa Ángela", direccion: "Echeverría N° 35", telefono: "3735 431438" },
        { division: "General San Martín", direccion: "Esq. Maipú y Urquiza", telefono: "3725422202" },
        { division: "Charata", direccion: "9 de Julio N° 575", telefono: "3624222322" },
        { division: "Juan José Castelli", direccion: "Av. Perón N° 470", telefono: "3624702665" }
    ]
    // Según userDivisionZona[0], quiero obtener de direccionDivisiones
    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                    <View style={styles.sectionCenter}>
                        <Text style={styles.textBold}>POLICÍA DE LA PROVINCIA DEL</Text>
                        <Text style={styles.textBold}>CHACO</Text>
                        <Text>DIVISIÓN VIOLENCIA FAMILIAR Y DE GÉNERO</Text>
                        <Text>{direccionDivision[0].division.toUpperCase()}</Text>
                        <Text>{direccionDivision[0].direccion} - {direccionDivision[0].division} - Chaco; Tel. {direccionDivision[0].telefono}</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
                </View>
                <View style={styles.section}>
                    <View>
                        <Text>Fecha {new Date().toLocaleDateString('es-AR')}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View>
                        <Text>COMUNICAR NOVEDAD: </Text>
                        <Text>Conforme a lo ordenado por la superioridad hasta la fecha, se consultaron los registros del sistema para verificar los antecedentes de denuncias en contra del victimario {datos.nombre + ' ' + datos.apellido} D.N.I N° {datos.DNI}. Se encontró lo siguiente: </Text>
                    </View>
                </View>
                {denunciasAMostrar.map((denuncia: any, index: number) => {
                    return (
                        <View style={styles.section} key={index}>
                            <View>
                                <Text>{(index + 1) + ')'} Denuncia con fecha {new Date(denuncia.fecha).toLocaleDateString('es-AR')}-{denuncia.jurisdiccion_policial}, Expediente {denuncia.numero_de_expediente} denuncia realizada por {denuncia.victima_nombre} </Text>
                            </View>
                        </View>
                    );
                })}
                <View style={styles.section}>
                    <Text>Atte. {valores.atte}</Text>
                </View>
            </Page>
        </Document>


    )
}

export default PDF