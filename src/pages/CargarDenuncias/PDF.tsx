import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useState } from 'react';

interface PDFProps {
    datos: any;
    user: any;
    tipoDenuncia: string;
    genero: string;
    isBusqueda?: boolean;
}

function PDF({ genero, tipoDenuncia, datos, user, isBusqueda }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")

    const [isDivision,] = useState(!(userDivisionZona.length > 1));

    const fecha: Date = new Date()
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Obtener día, mes y año por separado
    const dia = isBusqueda ? new Date(datos.fecha).getDate() : fecha.getDate()
    const mes = isBusqueda ? meses[new Date(datos.fecha).getMonth()] : meses[fecha.getMonth()]
    const año = isBusqueda ? new Date(datos.fecha).getFullYear() : fecha.getFullYear()
    const horaActual = isBusqueda ? datos.hora : fecha.getHours().toString().padStart(2, '0') + ":" + fecha.getMinutes().toString().padStart(2, '0')

    type division = {
        division: string,
        direccion: string,
        telefono: string
    }
    // Direcciones de las divisiones
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
            fontSize: 10,
            textAlign: 'justify',
            lineHeight: 1.5, // Aumenta el espacio entre líneas
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
            fontSize: 11,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        sectionSignatureEndText: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginRight: 10
        },
        sectionSignatureEndSecretario: {
            display: 'flex',
            fontSize: 11,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
            marginLeft: 30
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

    });

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

    const Footer = () => {
        return (
            <View minPresenceAhead={150} wrap={false}>
                <Text>_____________________________________________________</Text>
                <View style={styles.sectionSignatureEnd}>
                    <Text>Firma</Text>
                    <Text>Aclaración</Text>
                    <Text>DNI</Text>
                </View>
                <View style={styles.sectionSignatureEndContainer}>
                    <View style={styles.sectionSignatureEndSecretario}>
                        <Text style={styles.signaturesNameAndJerarquia}> {!isBusqueda ? datos.nombre_completo_secretario : datos?.secretario?.nombre_completo_secretario}</Text>
                        <Text style={styles.signaturesNameAndJerarquia}> {!isBusqueda ? datos.jerarquia_secretario : datos?.secretario?.jerarquia_secretario} {!isBusqueda ? datos.plaza_secretario : (datos?.secretario?.plaza_secretario != "Sin plaza" ? datos?.secretario?.plaza_secretario : "")}</Text>
                        <Text style={styles.boldText}>-SECRETARIO-</Text>
                    </View>
                    <View style={styles.sectionSignatureEndText}>
                        <Text style={styles.signaturesNameAndJerarquia}>{!isBusqueda ? datos.nombre_completo_instructor : datos?.instructor?.nombre_completo_instructor}</Text>
                        <Text style={styles.signaturesNameAndJerarquia}>{!isBusqueda ? datos.jerarquia_instructor : datos?.instructor?.jerarquia_instructor}</Text>
                        <Text style={styles.boldText}>-INSTRUCTOR-</Text>
                    </View>
                </View>
            </View>
        );
    };

    // Create Document Component
    if (tipoDenuncia == "Exposición") {
        return (
            <Document>
                <Page style={styles.page}>
                    <Header />
                    <View style={styles.section}>
                        <View style={styles.sectionRight}>
                            <Text>Expediente
                                {isBusqueda ? datos.numero_de_expediente : datos.PrefijoExpediente + (datos.numero_de_expediente ? datos.numero_de_expediente : "_____") + (datos.Expediente ? datos.Expediente : "_____") + datos.SufijoExpediente}</Text>
                        </View>
                        <Text style={styles.subheader}>- EXPOSICIÓN -</Text>
                        <Text style={styles.text}>{datos.nombre_victima} {datos.apellido_victima} S/ EXPOSICIÓN:--------------------------------------------------------/</Text>
                        <Text style={styles.longText}>
                            {isDivision ?
                                `En la División Violencia Familiar y de Género ${userDivisionZona[0]}, con asiento en la ciudad de ${userDivisionZona[0] == "Metropolitana" ? "Resistencia, capital de la " : userDivisionZona[0]} `
                                :
                                `En la ${userDivisionZona[2] ? userDivisionZona[2] : "Comisaría " + userDivisionZona[1]} de la ciudad de ${userDivisionZona[1]}`
                            }  Provincia del
                            Chaco
                            , a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la persona de mención en el título,
                            quien interrogado por sus datos personales de identidad <Text style={styles.boldText}>DIJO LLAMARSE:</Text> <Text style={styles.boldText}>{datos.nombre_victima} {datos.apellido_victima}, ser de nacionalidad: {datos.nacionalidad_victima},
                                de {datos.edad_victima} años de edad, Estado civil {datos.estado_civil_victima}, ocupación: {datos.ocupacion_victima}, {datos.SabeLeerYEscribir == "Sí" ? "con " : "sin "} instrucción, domiciliada {datos.direccion_victima} -, Teléfono Celular Nº {datos.telefono_victima},
                                Identidad que acredita con Juramento de Ley, aduciendo tener DNI Nº {datos.dni_victima}.</Text> Abierto el acto y cedida que le fuere la palabra y en uso del a misma. EXPONE: {datos.observaciones} <Text style={styles.boldText}> PREGUNTANDO:</Text> Si desea agregar, quitar o enmendar
                            algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que {datos.AgregarQuitarOEnmendarAlgo == "Sí" ? "SÍ" : "NO"} {datos.AgregarQuitarOEnmendarAlgo == "Sí" && ", AGREGA " + datos.agrega}. Con lo que no siendo para más, se da por finalizado el acto, previa integra lectura efectuada por el compareciente y para constancia legal de su conformidad firma al pie ante Mí y secretaria que <Text style={styles.boldText}> CERTIFICA. </Text>
                        </Text>

                    </View>
                    <Footer />
                </Page>
            </Document>
        )
    }
    else {
        return (
            <Document>
                <Page style={styles.page}>
                    <Header />
                    <View style={styles.section}>
                        <View style={styles.sectionRight}>
                            <Text>Expediente {isBusqueda ? datos.numero_de_expediente : datos.PrefijoExpediente + (datos.numero_de_expediente ? datos.numero_de_expediente : "_____") + (datos.Expediente ? datos.Expediente : "_____") + datos.SufijoExpediente}</Text>  
                        </View>
                        <Text style={styles.subheader}>- DENUNCIA -</Text>
                        <Text style={styles.text}>{datos.nombre_victima} {datos.apellido_victima} S/ DENUNCIA:--------------------------------------------------------/</Text>
                        <Text style={styles.longText}>
                            {isDivision ?
                                `En la División Violencia Familiar y de Género ${userDivisionZona[0]}, con asiento en la ciudad de ${userDivisionZona[0] == "Metropolitana" ? "Resistencia, capital de la " : userDivisionZona[0]} `
                                :
                                `En la ${userDivisionZona[2] ? userDivisionZona[2] : "Comisaría " + userDivisionZona[1]} de la ciudad de ${userDivisionZona[1]}`
                            }   Provincia del
                            Chaco, a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la persona de mención en el título,
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
                            836-N (Ley de Violencia Familiar). Abierto el acto y cedida que le fuere la palabra y en uso de la misma <Text style={styles.boldText}>DENUNCIA:</Text> {datos.observaciones} {genero == "Femenino" && "Seguidamente se le hace saber que existe la Línea 137, ubicado en Calle Mitre N° 171 -Resistencia-, donde se brinda asesoramiento legal y asistencia psicológica las 24 horas del dia de manera GRATUITA, y la Línea 102 ubicado en Avenida Sarmiento N° 1675-Resistencia-. "} {genero == "Femenino" && (
                                <Text style={styles.boldText}>PREGUNTANDO:</Text>)} {genero == "Femenino" && "“…Si desea ser asistida por dicho organismo."} {genero == "Femenino" && <Text style={styles.boldText}>RESPONDE:</Text>} {genero == "Femenino" && `“${datos.AsistidaPorDichoOrganismo == "Sí" ? "SÍ" : "NO"} `}
                            <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea ser examinad{genero == "Femenino" ? "a" : "o"} por el medico policial en turno…”. <Text style={styles.boldText}>RESPONDE:</Text>{datos.ExaminadaMedicoPolicial == "Sí" ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTANDO:</Text> “…Si desea
                            accionar penalmente por el delito que diera lugar…”. <Text style={styles.boldText}>RESPONDE:</Text> {datos.AccionarPenalmente == "Sí" ? "SÍ" : "NO"}. <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea agregar, quitar o enmendar
                            algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que {datos.AgregarQuitarOEnmendarAlgo == "Sí" ? "SÍ" : "NO"} {datos.AgregarQuitarOEnmendarAlgo == "Sí" && datos.agrega}.  Se le hace entrega de una copia de esta denuncia {direccionDivision[0].direccion == "Metropolitana" && " y se le notifica que deberá presentarse ante el Juzgado del Menor y de La familia, sito en calle French Nº166- Rcia, al segundo día hábil, para los trámites pertinentes."} Con lo que no siendo para más, finaliza el acto, previa íntegra lectura efectuada por la compareciente y para constancia legal de su conformidad firma al pie ante Mí y secretaria.
                        </Text>

                    </View>
                    <Footer />
                </Page>
            </Document>
        )
    }
}
export default PDF;