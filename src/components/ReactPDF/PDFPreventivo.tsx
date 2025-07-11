import { Document, Page, Text, View } from '@react-pdf/renderer';
import Header from './Header';
import Footer from './Footer';
import styles from '../../GlobalConst/PDFStyles';

type PDFProps = {
  datos: any;
  user: any;
  ampliacion?: boolean;
};


function PDF({ datos, user, ampliacion }: PDFProps) {
  const userDivisionZona = user.unidad.split(",");
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Obtener día, mes y año por separado
  const dividirDivision = userDivisionZona[0].split(" ");
  const municipio = dividirDivision[1]?.toUpperCase()
    ? dividirDivision[1]?.toUpperCase()
    : dividirDivision[0]?.toUpperCase() === "METROPOLITANA"
      ? "RESISTENCIA"
      : dividirDivision[0]?.toUpperCase();


  const getObjetoContent = () => {
    if (ampliacion) {
      return (
        <>
          <Text style={styles.indentedBoldStrokeText}>OBJETO: Com. Ampliación Sum. Policia Judicial</Text>
          <Text style={styles.indentedBoldStrokeText}>"{datos.objeto}"</Text>
          <Text style={styles.indentedText}>
            Ampliando anterior {datos.numero_nota_anterior}, {datos.objeto_anterior}, expediente {datos.numero_de_expediente} que damnifica a <Text style={styles.strokeText}>{datos.apellido_victima} {datos.nombre_victima} ({datos.edad_victima}), domiciliado {datos.direccion_victima}, DNI {datos.DNI_victima}. Cumplo en dirigirme a usted, llevando a su conocimiento que en fecha {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth() + 1]} de {new Date(datos.fecha).getUTCFullYear()} </Text> se amplió sumario de Policía Judicial por el delito de mención en rubro en virtud a las siguientes circunstancias:
          </Text>
        </>
      );
    }
    return (
      <>
        <Text style={styles.indentedBoldStrokeText}>OBJETO: Com. Inicio Sum. Policia Judicial</Text>
        <Text style={styles.indentedBoldStrokeText}>"{datos.objeto}"</Text>
        <Text style={styles.indentedText}>
          Cumplo en dirigirme a Ud. llevando a su conocimiento que en la fecha {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth() + 1]} de {new Date(datos.fecha).getUTCFullYear()} inició sumario policial judicial en base a denuncia radicada por el ciudadano quien se identificó como <Text style={styles.strokeText}>{datos.nombre_victima} {datos.apellido_victima} de {datos.edad_victima} años de edad, nacionalidad {datos.nacionalidad_victima}, {datos.estado_civil_victima}, {datos.sabe_leer_y_escribir_victima ? "con instrucción" : "sin instrucción"}, {datos.ocupacion_victima}, con domicilio en {datos.direccion_victima}, DNI N° {datos.DNI_victima}, teléfono N° {datos.telefono_victima}</Text>. Dando cuenta que:
        </Text>
      </>
    );
  };

  return (
    <Document>
      <Page size={datos.tipoHoja} style={styles.page}>
        <Header datos={datos} userDivisionZona={userDivisionZona}/>
        <View style={styles.section}>
          <View style={styles.sectionRight}>
            <Text style={styles.sectionRight}>
              {municipio}, {new Date(datos.fecha).getUTCDate()} de {meses[new Date(datos.fecha).getUTCMonth() + 1]} de {new Date(datos.fecha).getUTCFullYear()}
            </Text>
          </View>
          <Text style={styles.lineDashed}></Text>
          <Text style={styles.text}>SRES: {datos.autoridades}</Text>
          <Text style={styles.lineDashed}></Text>
          <Text style={styles.text}>{datos.numero_nota}</Text>
          <View style={styles.containerIndented}>
            {getObjetoContent()}
            <Text style={styles.indentedText}>{datos.observaciones}</Text>
            <Text style={styles.indentedText}>
              Efectuando consulta con <Text style={styles.boldStrokeText}>{datos.consultado}; Dispuso: </Text>
              {datos.resolucion}
            </Text>
          </View>
        </View>
        <Footer datos={datos}/>
      </Page>
    </Document>
  );
}

export default PDF;