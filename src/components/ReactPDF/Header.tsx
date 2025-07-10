import { Text, View, Image } from '@react-pdf/renderer';
import styles from '../../GlobalConst/PDFStyles'
import { useState } from 'react';
import direccionDivisiones from '../../GlobalConst/direccionDivisiones';

type PDFProps = {
    datos: any;
    userDivisionZona: any;
}

type division = {
    division: string;
    direccion: string;
    telefono: string;
};


const  Header = ({ datos, userDivisionZona }: PDFProps) => {

    const [isDivision] = useState(!(userDivisionZona.length > 1));

    // Obtener día, mes y año por separado

    const direccionDivision: division[] = direccionDivisiones.filter((division) => division.division === userDivisionZona[0]);





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

export default Header;