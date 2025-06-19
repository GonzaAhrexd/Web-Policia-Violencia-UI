import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';

type DenunciasMedidasCautelaresGraficoProps = {
    estadistica: any
    aspect?: number
}

function DenunciasMedidasCautelaresGrafico({estadistica, aspect}: DenunciasMedidasCautelaresGraficoProps) {

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const wordMap: { [key: string]: string } = {
            'alimento': 'Alimento',
            'provisorio': 'Provisorio',
            'medida': 'Medida',
            'cautelar': 'Cautelar',
            'denuncia': 'Denuncia',
            'boton': 'Botón',
            'antipanico': 'Antipánico',
            'derecho': 'Derecho',
            'comunicacion': 'Comunicación',
            'restitucion': 'Restitución',
            'menor': 'Menor',
            'exclusion': 'Exclusión',
            'hogar': 'Hogar',
            'prohibicion': 'Prohibición',
            'acercamiento': 'Acercamiento',
            'aprehension': 'Aprehensión',
            'notificacion': 'Notificación',
            'de': 'de',
            'con': 'con',
            'total': 'Total',
            // Agrega más palabras y sus versiones con tildes aquí
        };

        const formatKey = (key: string) => {
            return key.split('_')
                .map(word => wordMap[word.toLowerCase()] || word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        const data = Object.keys(estadistica)
            .filter(key => key !== 'Total')
            .map(key => ({
                name: formatKey(key),
                Total: estadistica[key]
            }));
        setChartData(data);
    }, [estadistica]);

    return (
        <ResponsiveContainer width="100%" aspect={aspect || 1} >
            <BarChart layout="vertical" data={chartData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" barSize={20} fill="#413ea0">
                    <LabelList dataKey="Total" position="right" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );

}

export default DenunciasMedidasCautelaresGrafico