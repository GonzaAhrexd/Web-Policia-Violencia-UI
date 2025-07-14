import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import styles from '../../../GlobalConst/PDFStyles'
interface PDFProps {
    datos: any;
    fecha: any;
}

function PDF({ datos, fecha }: PDFProps) {

 

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
                    <Text style={styles.textBold}>Comunicar Novedad</Text>
                    <Text>Conforme lo solicitado, cumplo en informar, registros desde fecha {(formatFecha(fecha.desde))} hasta {formatFecha(fecha.hasta)} de denuncias de Violencia Familiar y de Género recepcionada en las distintas dependencias policiales de la Provincia del Chaco, detallando por Direcciones de Zonas, que a continuación se detalla: </Text>
                </View>
                <View>
                    {Object.entries(datos).map(([unidad, stats]: any) => (
                        <View key={unidad}>
                            <Text>{unidad}</Text>
                            <Text style={styles.datos}>Total: {stats.total}</Text>
                            <Text style={styles.datos}>Total división: {stats.totalDivision}</Text>
                            <Text style={styles.datos}>Aprehensiones: {stats.aprehensiones}</Text>
                            <Text style={styles.datos}>Solicitudes de Aprehensión: {stats.solicitudesAprehension}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )

}

export default PDF;