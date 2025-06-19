import  { useEffect, useState } from 'react';
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';

type AprehensionesPorDivisionGraficoProps = {
    datos: any;
    total: number;
    }

function AprehensionesPorDivisionGrafico({datos, total}: AprehensionesPorDivisionGraficoProps) {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        
        const transformData = (data: any) => {
            const result = [];
            for (const division in data) {
                if (data.hasOwnProperty(division)) {
                    result.push({ name: division, Aprehension: data[division].aprehension, Solicitud_de_aprehension:  data[division].medida_dispuesta_solicitud_de_aprehension - data[division].aprehension });
                }
            }
            return result;
        };

        const transformedData = transformData(datos);
        setChartData(transformedData);
    }, [datos]);

    return (
        <ResponsiveContainer width="70%" aspect={1}>
            <BarChart width={150} height={40} data={chartData}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" type="category" />
                <YAxis type="number" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Aprehension" barSize={100} fill="#413ea0" >
                    <LabelList
                        dataKey="Aprehension"
                        position="center"
                        fill="#ffffff"
                        formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                    />
                </Bar>
                <Bar dataKey="Solicitud_de_aprehension" barSize={100} fill="#7773f0" >
                    <LabelList
                        dataKey="Solicitud_de_aprehension"
                        
                        position="center"
                        fill="#ffffff"
                        formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
  )
}

export default AprehensionesPorDivisionGrafico