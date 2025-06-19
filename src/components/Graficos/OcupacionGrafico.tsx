// Hook
import { useState, useEffect } from 'react';
// ReCharts
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';


type OcupacionGraficoProps = {
    ocupaciones: any
    total: number
}

function OcupacionGrafico({ocupaciones, total}: OcupacionGraficoProps) {

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        
        const transformData = (data: any) => {
            const result = [];
            for (const ocupacion in data) {
                if (data.hasOwnProperty(ocupacion)) {
                    result.push({ name: ocupacion, Ocupacion: data[ocupacion] });
                }
            }
            return result;
        };

        const transformedData = transformData(ocupaciones);
        setChartData(transformedData);
    }, [ocupaciones]);



    return (

        <ResponsiveContainer width="70%" aspect={1}>
        <BarChart width={150} height={40} data={chartData}>
            <CartesianGrid strokeDasharray="4 1 2" />
            <XAxis dataKey="name" type="category" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ocupacion" barSize={100} fill="#413ea0" >
                <LabelList
                    dataKey="Ocupacion"
                    position="center"
                    fill="#ffffff"
                    formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
)
}

export default OcupacionGrafico