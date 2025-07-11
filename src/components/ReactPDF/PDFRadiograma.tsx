import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { useState } from 'react';
import direccionDivisiones from '../../GlobalConst/direccionDivisiones';
import Footer from './Footer';
import styles from '../../GlobalConst/PDFStyles';

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



    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0]);


      const Header = () => {

        return (
            <View style={styles.header}>
                <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                <View style={styles.sectionCenter}>
                    <Text style={styles.textBold}>POLICIA DE LA PROVINCIA DEL CHACO</Text>
                    {isDivision ?
                        <>
                            <Text>DIVISION VIOLENCIA FAMILIAR Y DE GENERO {direccionDivision[0].division.toUpperCase()}</Text>
                            <Text>{datos.direccion} - {direccionDivision[0].division == "Metropolitana" ? "Resistencia" : direccionDivision[0].division} - Chaco; Tel. {datos.telefono}</Text>
                        </>
                        :
                        <>
                            <Text>COMISARÍA {userDivisionZona[1].toUpperCase()}</Text>
                            <Text>{datos.direccion} - {userDivisionZona[1].toUpperCase()} - {datos.telefono} </Text>
                        </>
                    }
                </View>
                <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
            </View>
        )
    }

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
            <Page size={datos.tipoHoja || "A4"} style={styles.page}>
                <Header />
                <View style={styles.section}>
                    <View style={styles.sectionRight}>
                        <Text style={styles.sectionRight}>{municipio}, {formattedDate}</Text>
                    </View>
                    <Text style={styles.headerText2}>-RADIOGRAMA-</Text>
                    <View style={styles.lineDashed} />
                    <Text style={styles.headerText}>{datos.destinatario}</Text>
                    <View style={styles.lineDashed} />
                    <Text style={styles.text}>{datos.nro_nota_preventivo}</Text>
                    {getMainContent()}
                    <Text style={styles.indentedText}>Por ello <Text style={styles.boldUnderlineText}>SOLICITO:</Text> {datos.solicita}</Text>
                </View>
                <Footer datos={datos} secretario={false}/>
            </Page>
        </Document>
    );
}

export default PDF;