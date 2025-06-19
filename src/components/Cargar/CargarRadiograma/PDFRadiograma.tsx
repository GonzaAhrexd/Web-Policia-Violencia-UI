import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useState } from 'react';

type PDFProps = {
    datos: any;
    user: any;
    ampliacion?: boolean;
};

function PDF({ datos, user, ampliacion }: PDFProps) {
    const userDivisionZona = user.unidad.split(",");
    const [isDivision] = useState(!(userDivisionZona.length > 1));
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Obtener día, mes y año por separado
    const dividirDivision = userDivisionZona[0].split(" ");
    const municipio = dividirDivision[1]?.toUpperCase()
        ? dividirDivision[1]?.toUpperCase()
        : dividirDivision[0]?.toUpperCase() === "METROPOLITANA"
            ? "RESISTENCIA"
            : dividirDivision[0]?.toUpperCase();

    type division = {
        division: string;
        direccion: string;
        telefono: string;
    };

    // Direcciones de las divisiones
    const direccionDivisiones: division[] = [
        { division: "Metropolitana", direccion: "Avenida Alvear Nº 126", telefono: "362461832" },
        { division: "La Leonesa", direccion: "Santiago del Estero y Entre Ríos", telefono: "3624644562" },
        { division: "Lapachito", direccion: "25 de Mayo S/N", telefono: "3624605783" },
        { division: "Roque Saenz Peña", direccion: "Calle 7e/12 y 14", telefono: "3644431835" },
        { division: "Villa Ángela", direccion: "Echeverría N° 35", telefono: "3735 431438" },
        { division: "General San Martín", direccion: "Esq. Maipú y Urquiza", telefono: "3725422202" },
        { division: "Charata", direccion: "9 de Julio N° 575", telefono: "3624222322" },
        { division: "Juan José Castelli", direccion: "Av. Perón N° 470", telefono: "3624702665" },
    ];

    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0]);

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
            marginBottom: 10,
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
            flexWrap: 'wrap',
            width: '100%',
        },
        indentedText: {
            textIndent: 250,
            fontSize: 12,
            textAlign: 'justify',
            lineHeight: 1.5,
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
            fontSize: 11,
        },
        images: {
            width: "1.17cm",
            height: "1.70cm",
        },
        textBold: {
            fontWeight: 'bold',
            fontSize: 16,
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
        objetoText: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
            fontSize: 12,
            fontWeight: 'bold',
            textIndent: 40,
        },
        longText: {
            fontWeight: 'bold',
            fontSize: 10,
            textAlign: 'justify',
            lineHeight: 1.5,
        },
        boldText: {
            fontSize: 12,
            fontWeight: 'bold',
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
            fontSize: 11,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        },
        sectionSignatureEndText: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 10,
        },
        sectionSignatureEndSecretario: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
            marginLeft: 30,
        },
        signaturesNameAndJerarquia: {
            fontSize: 11,
        },
        signaturesEndEnd: {
            fontSize: 11,
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
        footer: {
            marginTop: 5,
        },
        objeto: {
            marginLeft: 40,
            fontWeight: 'bold',
        },
        parrafoConSangria: {
            marginLeft: 40,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        sangria: {
            width: 20,
        },
        textoNormal: {
            flex: 1,
        },
        parrafoNormal: {
            marginLeft: 40,
            marginTop: 10,
        },
        headerText: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 5,
        },
        headerText2: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        textBoldHeader: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        boldUnderlineText: {
            fontWeight: 'bold',
            textDecoration: 'underline',
            fontSize: 12,
        }
    });

    const Header = () => (
        <View style={styles.header}>
            <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
            <View style={styles.sectionCenter}>
                <Text style={styles.textBoldHeader}>POLICIA DE LA PROVINCIA DEL CHACO</Text>
                {isDivision ? (
                    <>
                        <Text>DPTO. VIOLENCIA FAMILIAR Y DE GÉNERO</Text>
                        <Text>DIVISION VIOLENCIA FAMILIAR Y DE GENERO {direccionDivision[0].division.toUpperCase()}</Text>
                    </>
                ) : (
                    <>
                        <Text>{datos.supervision}</Text>
                        <Text>COMISARÍA {userDivisionZona[1].toUpperCase()}</Text>
                    </>
                )}
            </View>
            <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
        </View>
    );

    const Footer = () => (
        <View minPresenceAhead={150} wrap={false}>
            <View style={styles.sectionSignatureEndContainer}>
                <View style={styles.sectionSignatureEndText}>
                    <Text style={styles.signaturesNameAndJerarquia}>{datos.nombre_completo_instructor || datos.instructor.nombre_completo_instructor}</Text>
                    <Text style={styles.signaturesNameAndJerarquia}>{datos.jerarquia_instructor || datos.instructor.jerarquia_instructor}</Text>
                    <Text style={styles.boldText}>-INSTRUCTOR-</Text>
                </View>
            </View>
        </View>
    );

    const getMainContent = () => {
        const date = new Date(datos.fecha);
        const formattedDate = `${date.getUTCDate()} de ${meses[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;

        if (ampliacion) {
            return (
                <View>
                    <Text style={styles.indentedText}>
                        Ampliando anterior {datos.nro_nota_preventivo}, causa {datos.objeto}, expediente {datos.numero_de_expediente} que damnifica a <Text style={styles.boldUnderlineText}>{datos.apellido_victima} {datos.nombre_victima} ({datos.edad_victima}), domiciliado {datos.direccion_victima}, DNI {datos.DNI_victima}.</Text> Cumplo en dirigirme a usted, llevando a su conocimiento que en fecha {formattedDate} se amplió sumario de Policía Judicial por el delito de mención en rubro en virtud a las siguientes circunstancias: 
                        </Text>
                        <Text style={styles.indentedText}>
                        {datos.observaciones}Efectuando consulta con <Text style={styles.boldText}>{datos.consultado_preventivo}</Text> , <Text style={styles.boldUnderlineText}>DISPUSO: {datos.resolucion_preventivo}</Text>
                    </Text>
                </View>

            );
        }
        return (
            <View>
                <Text style={styles.indentedText}>
                    Cumple en dirigirme a Ud., llevando a su conocimiento que en la fecha, se hizo presente <Text style={styles.boldUnderlineText}>{datos.nombre_victima} {datos.apellido_victima} de {datos.edad_victima} años, {datos.ocupacion_victima}, domiciliado {datos.direccion_victima}, DNI {datos.DNI_victima}</Text>, quien radicó denuncia dando cuenta: </Text>
                <Text style={styles.indentedText}>
                    {datos.observaciones}Efectuando consulta con <Text style={styles.boldText}>{datos.consultado_preventivo}</Text>, <Text style={styles.boldUnderlineText}>DISPUSO:</Text>{datos.resolucion_preventivo}
                </Text>
            </View>
        );
    };

    const date = new Date(datos.fecha);
    const formattedDate = `${date.getUTCDate()} de ${meses[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;

    return (
        <Document>
            <Page style={styles.page}>
                <Header />
                <View style={styles.section}>
                    <View style={styles.sectionRight}>
                        <Text style={styles.sectionRight}>{municipio}, {formattedDate}</Text>
                    </View>
                    <Text style={styles.headerText2}>-RADIOGRAMA-</Text>
                    <Text style={styles.text}>**********************************************************************************************************</Text>
                    <Text style={styles.headerText}>{datos.destinatario}</Text>
                    <Text style={styles.text}>**********************************************************************************************************</Text>
                    <Text style={styles.text}>{datos.nro_nota_preventivo}</Text>
                    {getMainContent()}
                    <Text style={styles.indentedText}>Por ello <Text style={styles.boldUnderlineText}>SOLICITO:</Text> {datos.solicita}</Text>
                </View>
                <Footer />
            </Page>
        </Document>
    );
}

export default PDF;