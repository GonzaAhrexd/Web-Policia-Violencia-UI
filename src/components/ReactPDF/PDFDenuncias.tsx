// Librerías y hooks react
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { useState } from 'react';
// Constanets
import direccionDivisiones from '../../GlobalConst/direccionDivisiones';
// Estilos
import styles from '../../GlobalConst/PDFStyles';
// Componentes
import Footer from './Footer';
import Header from './Header';


import DenunciaSinVerificar from '../../types/DenunciaSinVerificar';

type PDFProps = {
    datos: DenunciaSinVerificar | any;
    user: any;
    tipoDenuncia: string;
    genero: string;
    isBusqueda?: boolean;
}

type division = {
    division: string,
    direccion: string,
    telefono: string
}


function PDFDenuncias({ genero, tipoDenuncia, datos, user, isBusqueda }: PDFProps) {

    const userDivisionZona = user.unidad.split(",")

    const [isDivision,] = useState(!(userDivisionZona.length > 1));

    const fecha: Date = new Date()
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    // Obtener día, mes y año por separado
    const dia = isBusqueda ? new Date(datos.fecha).getDate() : fecha.getDate()
    const mes = isBusqueda ? meses[new Date(datos.fecha).getMonth()] : meses[fecha.getMonth()]
    const año = isBusqueda ? new Date(datos.fecha).getFullYear() : fecha.getFullYear()
    const horaActual = isBusqueda ? datos.hora : fecha.getHours().toString().padStart(2, '0') + ":" + fecha.getMinutes().toString().padStart(2, '0')

    // Según userDivisionZona[0], quiero obtener de direccionDivisiones
    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])
    const isExposicion = tipoDenuncia === "Exposición";
    const modoActuacion = datos.modo_actuacion_2 ? datos.modo_actuacion_2 : datos.modo_actuacion

    const RenderArticulo = () => {


        if (modoActuacion == "Denuncia Penal") {
            return ( 
            <Text style={styles.longText}>
                Quien es notificado del contenido del  artículo  245° (falso denunciante) del
                Código Penal de la Nación Argentina; el contenido del art. 84º del Código Procesal Penal de la provincia del Chaco, donde
                en sus partes dice{' '}
                <Text style={styles.boldText}>
                    “…LA VICTIMA DEL DELITO TENDRA DERECHO A SER INFORMADA ACERCA DE LAS FACULTADES QUE PUEDA EJERCER EN EL PROCESO-ARTICULO 8 Y 25, DE LAS RESOLUCIONES QUE SE DICTEN SOBRE LA SITUACION DEL IMPUTADO Y CUANDO FUERE MENOR O INCAPAZ SE AUTORIZARA A QUE DURANTE LOS ACTOS PROCESALES SEA ACOMPAÑADA POR PERSONA DE SU CONFIANZA, SIEMPRE QUE ELLO NO PERJUDIQUEN LA DEFENSA DEL IMPUTADO O LOS RESULTADOS DE LA INVESTIGACIÓN...”
                </Text>
            </Text>
)        } else {
            return (
                <Text style={styles.longText}>
                   Abierto el acto se le hace saber que se le recepcionará la presente de acuerdo a las previsiones del Art. 35° del Código Faltas de la Provincia Ley 850-J, 
            </Text>
    
)}

    }




    const RenderDenuncia = () => {
        return (
            <Text style={styles.longText}>
                {isDivision ? (
                    <>
                        En la División Violencia Familiar y de Género {userDivisionZona[0]}, con asiento en la ciudad de{' '}
                        {userDivisionZona[0] === 'Metropolitana' ? 'Resistencia, capital de la ' : userDivisionZona[0]}
                    </>
                ) : (
                    <>
                        En la {userDivisionZona[2] ? userDivisionZona[2] : `Comisaría ${userDivisionZona[1]}`} de la ciudad de{` ${userDivisionZona[1]}, `}
                    </>
                )}
                provincia del Chaco, a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la
                persona de mención en el título, quien interrogado por sus datos personales de identidad{' '}
                <Text style={styles.boldText}>DIJO LLAMARSE:</Text> como consta en el título, ser de nacionalidad:{' '}
                {datos.nacionalidad_victima}, de {datos.edad_victima} años de edad, estado civil {datos.estado_civil_victima},
                ocupación: {datos.ocupacion_victima}, {datos.SabeLeerYEscribir === 'Sí' ? 'con ' : 'sin '} instrucción, domiciliada{' '}
                {datos.direccion_victima} -, teléfono celular Nº {datos.telefono_victima}, identidad que acredita con juramento de ley,
                aduciendo tener DNI Nº {datos.dni_victima}. <RenderArticulo />
                {genero === 'Femenino' && (
                    <>
                        y Ley Nacional Nº 26.485, (Ley de protección integral para prevenir, sancionar y erradicar la violencia contra las
                        mujeres en los ámbitos en que desarrolla sus relaciones interpersonales)
                    </>
                )}{' '}
                y los términos de la Ley Provincial Nº 836-N (Ley de violencia familiar). Abierto el acto y cedida que le fuere la
                palabra y en uso de la misma <Text style={styles.boldText}>DENUNCIA:</Text> {datos.observaciones.trim()}
                {genero === 'Femenino' && (
                    <>
                        {' '}
                        Seguidamente se le hace saber que existe la Línea 137, ubicado en calle Mitre nº 171 -Resistencia-, donde se brinda
                        asesoramiento legal y asistencia psicológica las 24 horas del día de manera gratuita, y la Línea 102 ubicado en
                        avenida Sarmiento nº 1675-Resistencia-.{' '}
                        <Text style={styles.boldText}>PREGUNTANDO:</Text> “…Si desea ser asistida por dicho organismo.”{' '}
                        <Text style={styles.boldText}>RESPONDE:</Text>{' '}
                        {datos.AsistidaPorDichoOrganismo === 'Sí' ? 'SÍ' : 'NO'}{' '}
                    </>
                )}
                <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea ser examinad{genero === 'Femenino' ? 'a' : 'o'} por el
                médico policial en turno…”. <Text style={styles.boldText}>RESPONDE:</Text>{' '}
                {datos.ExaminadaMedicoPolicial === 'Sí' ? 'SÍ' : 'NO'}. <Text style={styles.boldText}>PREGUNTANDO:</Text> “…Si desea
                accionar penalmente por el delito que diera lugar…”. <Text style={styles.boldText}>RESPONDE:</Text>{' '}
                {datos.AccionarPenalmente === 'Sí' ? 'SÍ' : 'NO'}. <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea agregar,
                quitar o enmendar algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que{' '}
                {datos.AgregarQuitarOEnmendarAlgo === 'Sí' ? 'SÍ' : 'NO'}
                {datos.AgregarQuitarOEnmendarAlgo === 'Sí' && datos.agrega}. Se le hace entrega de una copia de esta denuncia
                {direccionDivision[0].direccion === 'Metropolitana' ? (
                    <>
                        {' '}
                        y se le notifica que deberá presentarse ante el Juzgado del Menor y de la Familia, sito en calle French nº 166 -Resistencia-,
                        al segundo día hábil, para los trámites pertinentes.
                    </>
                ) : (
                    '. '
                )}
                Con lo que, no siendo para más, finaliza el acto, previa íntegra lectura efectuada por la compareciente y para constancia
                legal de su conformidad firma al pie ante mí y secretaria.
            </Text>
        )
    }

    const RenderExposicion = () => {
        return (

            <Text style={styles.longText}>
                {isDivision ?
                    `En la División Violencia Familiar y de Género ${userDivisionZona[0]}, con asiento en la ciudad de ${userDivisionZona[0] == "Metropolitana" ? "Resistencia, capital de la " : userDivisionZona[0]} `
                    :
                    `En la ${userDivisionZona[2] ? userDivisionZona[2] : "Comisaría " + userDivisionZona[1]} de la ciudad de ${userDivisionZona[1]}, `
                }  Provincia del Chaco, a los {dia} del mes de {mes} del año {año}, siendo la hora {horaActual} comparece a despacho la persona de mención en el título,
                quien interrogado por sus datos personales de identidad <Text style={styles.boldText}>DIJO LLAMARSE: </Text><Text>{datos.nombre_victima} {datos.apellido_victima}, ser de nacionalidad: {datos.nacionalidad_victima},
                    de {datos.edad_victima} años de edad, Estado civil {datos.estado_civil_victima}, ocupación: {datos.ocupacion_victima}, {datos.SabeLeerYEscribir == "Sí" ? "con " : "sin "} instrucción, domiciliada {datos.direccion_victima}, Teléfono Celular Nº {datos.telefono_victima},
                    Identidad que acredita con Juramento de Ley, aduciendo tener DNI Nº {datos.dni_victima}.</Text> Abierto el acto y cedida que le fuere la palabra y en uso de la misma.<Text style={styles.boldText}>EXPONE:</Text> {datos.observaciones.trim()} <Text style={styles.boldText}>PREGUNTANDO:</Text> Si desea agregar, quitar o enmendar
                algo a lo expuesto precedentemente….” <Text style={styles.boldText}>RESPONDE:</Text> Que {datos.AgregarQuitarOEnmendarAlgo == "Sí" ? "SÍ" : "NO"}{datos.AgregarQuitarOEnmendarAlgo == "Sí" && ", AGREGA " + datos.agrega}. Con lo que no siendo para más, se da por finalizado el acto, previa integra lectura efectuada por el compareciente y para constancia legal de su conformidad firma al pie ante Mí y secretaria que <Text style={styles.boldText}>CERTIFICA.</Text>
            </Text>
        )
    }


    return (
        <Document>
            <Page size={datos.tipoHoja} style={styles.page}>
                <Header datos={datos} userDivisionZona={userDivisionZona} />
                <View style={styles.section}>
                    <View style={styles.sectionRight}>
                        <Text>Expediente {isBusqueda ? datos.numero_de_expediente : datos.PrefijoExpediente + (datos.numero_de_expediente ? datos.numero_de_expediente : "_____") + (datos.Expediente ? datos.Expediente : "_____") + datos.SufijoExpediente}
                        </Text>
                    </View>
                    <Text style={styles.subheader}>{isExposicion ? "- EXPOSICIÓN -" : "- DENUNCIA -"}</Text>
                    <View style={styles.textAndLineContainer}>
                        <Text style={styles.text}>{datos.nombre_victima} {datos.apellido_victima} S/ {isExposicion ? "EXPOSICIÓN" : "DENUNCIA"}:</Text>
                        <View style={styles.lineFiller} />
                        <Text style={styles.finalSlash}>/</Text>
                    </View>
                    {isExposicion ? <RenderExposicion /> : <RenderDenuncia />}
                </View>
                <Footer firmas datos={datos} />
            </Page>
        </Document>
    )

}
export default PDFDenuncias;