import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import direccionDivisiones from '../../GlobalConst/direccionDivisiones';

import styles from '../../GlobalConst/PDFStyles';

interface PDFProps {
    tipoPersona: string
    datos: any
    user: any
    denunciasAMostrar: any
    valores: any
}
type division = {
    division: string,
    direccion: string,
    telefono: string
}

function PDF({ tipoPersona, valores, datos, user, denunciasAMostrar }: PDFProps) {



    const userDivisionZona = user.unidad.split(",")

    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0])

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Image src="EscudoProvinciaDelChaco.png" style={styles.images} />
                    <View style={styles.sectionCenter}>
                        <Text style={styles.textBold}>POLICÍA DE LA PROVINCIA DEL</Text>
                        <Text style={styles.textBold}>CHACO</Text>
                        <Text>DIVISIÓN VIOLENCIA FAMILIAR Y DE GÉNERO</Text>
                        <Text>{direccionDivision[0].division.toUpperCase()}</Text>
                        <Text>{direccionDivision[0].direccion} - {direccionDivision[0].division} - Chaco; Tel. {direccionDivision[0].telefono}</Text>
                    </View>
                    <Image src="Escudo_Policia_Chaco_Transparente.png" style={styles.images} />
                </View>
                <View style={styles.section}>
                    <View style={styles.boldText}>
                        <Text>Fecha {new Date().toLocaleDateString('es-AR')}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.longText}>
                        <Text>COMUNICAR NOVEDAD: </Text>
                        {tipoPersona == "víctima" &&
                            <Text>Conforme a lo ordenado por la superioridad hasta la fecha, se consultaron los registros del sistema para verificar los antecedentes de denuncias realizadas por la víctima {datos.nombre + ' ' + datos.apellido} D.N.I N° {datos.DNI}. Se encontró lo siguiente: </Text>
                        }
                        {tipoPersona == "victimario" &&
                            <Text>Conforme a lo ordenado por la superioridad hasta la fecha, se consultaron los registros del sistema para verificar los antecedentes de denuncias en contra del victimario {datos.nombre + ' ' + datos.apellido} D.N.I N° {datos.DNI}. Se encontró lo siguiente: </Text>
                        }
                        {tipoPersona == "tercero" &&
                            <Text>Conforme a lo ordenado por la superioridad hasta la fecha, se consultaron los registros del sistema para verificar los antecedentes de denuncias realizadas, como tercero, por  {datos.nombre + ' ' + datos.apellido} D.N.I N° {datos.DNI}. Se encontró lo siguiente: </Text>
                        }

                    </View>
                </View>
                {denunciasAMostrar.map((denuncia: any, index: number) => {
                    return (
                        <View style={styles.section} key={index}>
                            <View>
                                {tipoPersona == "víctima" &&
                                    <Text style={styles.longText}>{(index + 1) + ')'} Denuncia con fecha {new Date(denuncia.fecha).toLocaleDateString('es-AR')} - {denuncia.jurisdiccion_policial}, Expediente {denuncia.numero_de_expediente} denuncia realizada contra {denuncia.victimario_nombre} </Text>
                                }
                                {tipoPersona == "victimario" &&
                                    <Text style={styles.longText}>{(index + 1) + ')'} Denuncia con fecha {new Date(denuncia.fecha).toLocaleDateString('es-AR')} - {denuncia.jurisdiccion_policial}, Expediente {denuncia.numero_de_expediente} denuncia realizada por {denuncia.victima_nombre} </Text>
                                }
                                {
                                    tipoPersona == "tercero" &&
                                    <Text style={styles.longText}>{(index + 1) + ')'} Denuncia con fecha {new Date(denuncia.fecha).toLocaleDateString('es-AR')}-{denuncia.jurisdiccion_policial}, Expediente {denuncia.numero_de_expediente} denuncia realizada contra {denuncia.victimario_nombre}, por la víctima {denuncia.victima_nombre} </Text>

                                }


                            </View>
                        </View>)
                })}
                <View style={styles.section}>
                    <Text style={styles.signature}>Atte. {valores.atte}</Text>
                </View>
            </Page>
        </Document>


    )
}

export default PDF