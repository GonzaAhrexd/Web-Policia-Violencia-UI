import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { useState } from 'react';
import direccionDivisiones from '../../GlobalConst/direccionDivisiones';
import Footer from './Footer';
import styles from '../../GlobalConst/PDFStyles';

type PDFProps = {
    isBusqueda: boolean;
    datos: any;
    user: any;
    genero: string;
}

function PDFAmpliacion({ isBusqueda, genero, datos, user }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")

    const [isDivision,] = useState(!(userDivisionZona.length > 1));

    const fecha: Date = new Date()
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Obtener día, mes y año por separado
    const dia = fecha.getDate()
    const mes = meses[fecha.getMonth()]
    const año = fecha.getFullYear()
    const horaActual = fecha.getHours().toString().padStart(2, '0') + ":" + fecha.getMinutes().toString().padStart(2, '0')

    type division = {
        division: string,
        direccion: string,
        telefono: string
    }

    // Según userDivisionZona[0], quiero obtener de direccionDivisiones
    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])


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


    // Create Document Component
    return (
        <Document>
            <Page size={datos.tipoHoja || "A4"} style={styles.page}>
                <Header />
                <View style={styles.section}>
                    <View style={styles.sectionRight}>
                        <Text>Expediente {isBusqueda ? datos.numero_de_expediente : datos.PrefijoExpediente + (datos.numero_de_expediente ? datos.numero_de_expediente : "_____") + (datos.Expediente ? datos.Expediente : "_____") + datos.SufijoExpediente}</Text>
                    </View>
                    <Text style={styles.subheader}>- AMPLIACIÓN DE DENUNCIA -</Text>
                    <View style={styles.textAndLineContainer}>
                        <Text style={styles.text}>{datos.nombre_victima} {datos.apellido_victima} S/ AMPLIACIÓN DE DENUNCIA: </Text>
                        <View style={styles.lineFiller} />
                        <Text style={styles.finalSlash}>/</Text>
                    </View>
                    <Text style={styles.longText}>
                        {isDivision ?
                            `En la División Violencia Familiar y de Género ${userDivisionZona[0]}, con asiento en la ciudad de ${userDivisionZona[0] == "Metropolitana" ? "Resistencia, capital de la " : userDivisionZona[0]} `
                            :
                            `En la ${userDivisionZona[2] ? userDivisionZona[2] : "Comisaría " + userDivisionZona[1]} de la ciudad de ${userDivisionZona[1]}`
                        }   Provincia del Chaco, a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la persona de mención en el título,
                        quien interrogado por sus datos personales de identidad DIJO: Llamarse como consta en el titulo, Ser de nacionalidad: {datos.nacionalidad_victima},
                        de {datos.edad_victima} años de edad, Estado civil {datos.estado_civil_victima}, ocupación: {datos.ocupacion_victima}, {datos.SabeLeerYEscribir == "Sí" ? "con " : "sin "} instrucción, domiciliada {datos.direccion_victima} -, Teléfono Celular Nº {datos.telefono_victima},
                        Identidad que acredita con Juramento de Ley, aduciendo tener DNI Nº {datos.dni_victima} Quien es notificado del contenido del Artículo 245°
                        (FALSO DENUNCIANTE) del Código Penal de la Nación Argentina; el contenido del Art. 84º del Código Procesal Penal de la
                        Provincia del Chaco, donde en sus partes dice<Text style={styles.boldText}>  “...LA VICTIMA DEL DELITO TENDRA DERECHO A SER INFORMADA
                            ACERCA DE LAS FACULTADES QUE PUEDA EJERCER EN EL PROCESO-ARTICULO 8 Y 25, DE LAS
                            RESOLUCIONES QUE SE DICTEN SOBRE LA SITUACION DEL IMPUTADO Y CUANDO FUERE MENOR O
                            INCAPAZ SE AUTORIZARA A QUE DURANTE LOS ACTOS PROCESALES SEA ACOMPAÑADA POR PERSONA DE
                            SU CONFIANZA, SIEMPRE QUE ELLO NO PERJUDIQUEN LA DEFENSA DEL IMPUTADO O LOS RESULTADOS
                            DE LA INVESTIGACIÓN..."</Text>{genero == "Femenino" && "y Ley Nacional Nº 26.485, (Ley de Protección Integral para prevenir sancionar y erradicar la violencia contra las mujeres en los ámbitos en que desarrolla sus relaciones interpersonales)"} y los términos de la Ley Provincial Nº
                        836-N (Ley de Violencia Familiar). Abierto el acto y cedida que le fuere la palabra y en uso de la misma <Text style={styles.boldText}>AMPLIO:</Text> {datos.observaciones} {genero == "Femenino" && "Seguidamente se le hace saber que existe la Línea 137, ubicado en Calle Mitre N° 171 -Resistencia-, donde se brinda asesoramiento legal y asistencia psicológica las 24 horas del dia de manera GRATUITA, y la Línea 102 ubicado en Avenida Sarmiento N° 1675-Resistencia-. "} {genero == "Femenino" && (
                            <Text style={styles.boldText}>PREGUNTANDO:</Text>)} {genero == "Femenino" && "“…Si desea ser asistida por dicho organismo."} {genero == "Femenino" && <Text style={styles.boldText}>RESPONDE:</Text>} {genero == "Femenino" && `“${datos.AsistidaPorDichoOrganismo == "Sí" ? "SÍ" : "NO"} `}
                        <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea ser examinad{genero == "Femenino" ? "a" : "o"} por el medico policial en turno…”. <Text style={styles.boldText}>RESPONDE:</Text>{datos.ExaminadaMedicoPolicial == "Sí" ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTANDO:</Text> “…Si desea
                        accionar penalmente por el delito que diera lugar…”. <Text style={styles.boldText}>RESPONDE:</Text> {datos.AccionarPenalmente == "Sí" ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea agregar, quitar o enmendar
                        algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que {datos.AgregarQuitarOEnmendarAlgo == "Sí" ? "SÍ" : "NO"} {datos.AgregarQuitarOEnmendarAlgo == "Sí" && datos.agrega}.  Se le hace entrega de una copia de esta denuncia {direccionDivision[0].direccion == "Metropolitana" && " y se le notifica que deberá presentarse ante el Juzgado del Menor y de La familia, sito en calle French Nº166- Rcia, al segundo día hábil, para los trámites pertinentes."} Con lo que no siendo para más, finaliza el acto, previa íntegra lectura efectuada por la compareciente y para constancia legal de su conformidad firma al pie ante Mí y secretaria.
                    </Text>

                </View>
                <Footer firmas datos={datos} />
            </Page>
        </Document>
    )

}
export default PDFAmpliacion;