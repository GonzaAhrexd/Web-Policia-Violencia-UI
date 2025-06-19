import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface PDFProps {
    datos: any;
    fecha: any;
}

function PDF({ datos, fecha }: PDFProps) {

    const styles = StyleSheet.create({
        page: {
            padding: 30,
        },
        section: {
            margin: 10,
            padding: 10,
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
            marginBottom: 10,
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
        },
        datos: {
            marginBottom: 10,
            fontSize: 12,
            textAlign: 'justify',
        },

    });


    const formatFecha = (date: Date) => {
        // Convertir la fecha a una cadena ISO sin modificar la zona horaria
        const fecha = new Date(date);

        const fechaISO = fecha.toISOString().substring(0, 10); // Formato: yyyy-mm-dd
        
        // Separar la fecha en componentes (día, mes, año)
        const [year, month, day] = fechaISO.split('-');
        
        // Retornar la fecha en formato dd/mm/yyyy
        return `${day}/${month}/${year}`;
    };
    

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                    <View style={styles.sectionCenter}>
                        <Text style={styles.textBold}>POLICIA DE LA PROVINCIA DEL</Text>
                        <Text style={styles.textBold}>CHACO</Text>
                        <Text>DIVISION VIOLENCIA FAMILIAR Y DE GENERO</Text>
                        <Text>Análisis Rápido</Text>
                        <Text>{(formatFecha(fecha.desde))} hasta {formatFecha(fecha.hasta)}</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
                </View>
                <View style={styles.section}>
                    <Text>Comunicar Novedad</Text>
                    <Text>Conforme lo solicitado, cumplo en informar, registros desde fecha {(formatFecha(fecha.desde))} hasta {formatFecha(fecha.hasta)} de denuncias de Violencia Familiar y de Género recepcionada en las distintas dependencias policiales de la Provincia del Chaco, detallando por Direcciones de Zonas, que a continuación se detalla: </Text>
                </View>
                <View>
                    {Object.entries(datos).map(([unidad, stats]) => (
                        <View key={unidad}>
                            <Text>{unidad}</Text>
                            {/* @ts-ignore */}
                            <Text style={styles.datos}>Total: {stats.total}</Text>
                            {/* @ts-ignore */}
                            <Text style={styles.datos}>Total división: {stats.totalDivision}</Text>
                            {/* @ts-ignore */}
                            <Text style={styles.datos}>Aprehensiones: {stats.aprehensiones}</Text>
                            {/* @ts-ignore */}
                            <Text style={styles.datos}>Solicitudes de Aprehensión: {stats.solicitudesAprehension}</Text>
                        </View>
                    ))}

                </View>
            </Page>
        </Document>
    )

}

export default PDF;