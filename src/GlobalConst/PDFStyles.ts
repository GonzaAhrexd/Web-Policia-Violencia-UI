import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        paddingBottom: 30,
        paddingTop: 30,
        paddingLeft: "3.0cm",
        paddingRight: "2.5cm"
    },
    section: {
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
    },
    line: {
        borderBottom: '1px solid black',
        marginTop: 60,
    },
    lineDashed: {
        borderBottom: '2px dashed black',
        marginTop: 5,
        marginBottom: 5,
    },
    subheader: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    headerDireccion: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
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
        fontSize: 12,
        textAlign: 'justify',
        lineHeight: 1.5, // Aumenta el espacio entre líneas
    },
    boldText: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    sectionSignatureEnd: {
        display: 'flex',
        fontSize: 12,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    sectionSignatureEndContainer: {
        display: 'flex',
        fontSize: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3,
    },
    sectionSignatureEndText: {
        display: 'flex',
        fontSize: 11,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    sectionSignatureEndSecretario: {
        display: 'flex',
        fontSize: 11,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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
    // Preventivo
    indentedBoldStrokeText: {
        textIndent: 200, // Sangría solo en la primera línea
        fontSize: 12,
        textAlign: 'justify',
        fontWeight: 'bold',
        lineHeight: 1.5,
        textDecoration: 'underline',
    },
    // Radiograma
    indentedText: {
        textIndent: 200,
        fontSize: 12,
        textAlign: 'justify',
        lineHeight: 1.5,
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
    boldStrokeText: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: 12,
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    strokeText: {
        textDecoration: 'underline',
    },
    containerIndented: {
        width: '100%',
    },
    boldUnderlineText: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        fontSize: 12,
    },
    sectionSignatureCenter: {
        display: 'flex',
        fontSize: 11,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10,
    },
})

export default styles;