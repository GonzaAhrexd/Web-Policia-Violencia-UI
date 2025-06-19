import { useState, useEffect } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';

type DenunciasMunicipiosProps = {
    data: any;
    total: number;
};

function DenunciasMunicipios({ data, total }: DenunciasMunicipiosProps) {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const { estadisticas } = data;
        const transformData = (data: any) => {
            const result = [];
            for (const region in data) {
                if (data.hasOwnProperty(region)) {
                    for (const city in data[region]) {
                        if (data[region].hasOwnProperty(city)) {
                            result.push({ name: city, Cantidad: data[region][city] });
                        }
                    }
                }
            }
            return result;
        };

        setChartData(transformData(estadisticas));
    }, [data]);


    return (
        <ResponsiveContainer width="100%" aspect={1} >
            <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={chartData}
                margin={{
                    left: 40,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" scale="auto" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Cantidad" barSize={15} fill="#413ea0">
                    <LabelList
                        dataKey="Cantidad"
                        position="right"
                        formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                    />
                </Bar>
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default DenunciasMunicipios;