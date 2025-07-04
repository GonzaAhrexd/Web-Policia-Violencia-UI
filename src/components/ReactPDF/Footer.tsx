import { Text, View } from '@react-pdf/renderer';
import styles from '../../GlobalConst/PDFStyles';

type FooterProps = {
    datos: any;
    firmas?: boolean
    secretario?: boolean;
    instructor?: boolean;
}


const Footer = ({ datos, firmas = false, secretario = true, instructor = true }: FooterProps) => {


    const SecretarioPDF = () => {
        return (
            <View style={styles.sectionSignatureEndSecretario}>
                <Text style={styles.signaturesNameAndJerarquia}>{datos?.nombre_completo_secretario ? datos?.nombre_completo_secretario : datos?.secretario?.nombre_completo_secretario}</Text>
                <Text style={styles.signaturesNameAndJerarquia}>{datos?.jerarquia_secretario ? datos?.jerarquia_secretario : datos?.secretario?.jerarquia_secretario} {datos?.plaza_secretario}</Text>
                <Text style={styles.boldText}>-SECRETARIO-</Text>
            </View>
        );
    }

    const InstructorPDF = () => {
        return (
            <View style={styles.sectionSignatureEndText}>
                <Text style={styles.signaturesNameAndJerarquia}>{datos?.nombre_completo_instructor ? datos?.nombre_completo_instructor : datos?.instructor?.nombre_completo_instructor}</Text>
                <Text style={styles.signaturesNameAndJerarquia}>{datos?.jerarquia_instructor ? datos?.jerarquia_instructor : datos?.instructor?.jerarquia_instructor} {datos?.plaza_instructor}</Text>
                <Text style={styles.boldText}>-INSTRUCTOR-</Text>
            </View>
        );
    }


    return (
        <View minPresenceAhead={20} wrap={false}>
            {firmas && (
                <>
                    <View style={styles.line} />
                    <View style={styles.sectionSignatureEnd}>
                        <Text>Firma</Text>
                        <Text>Aclaración</Text>
                        <Text>DNI</Text>
                    </View>
                </>
            )}
            {(secretario && instructor) && ( 
                <View style={styles.sectionSignatureEndContainer}>
                <SecretarioPDF />
                <InstructorPDF />
            </View>
            )}
            {/* Si está solo uno de los dos en true, muestra el que está en true en el medio */}
            {(((secretario || instructor) && !(secretario && instructor))) &&
            <View style={styles.sectionSignatureCenter}>
                {secretario && <SecretarioPDF />}
                {instructor && <InstructorPDF />}
            </View>
            }
        </View>
    );
};

export default Footer;