import  { useEffect, useState } from 'react';
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';

type DenunciasMunicipiosProps = {
    data: any;
    total: number;
};

function DenunciasMunicipios({ data, total }: DenunciasMunicipiosProps) {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {

        const transformData = (data: any) => {
            const result = [];
            for (const division in data) {
                if (data.hasOwnProperty(division)) {
                    result.push({ name: division, Total: data[division].valor, Division: data[division].isDivision });
                }
            }
            return result;
        };

        const transformedData = transformData(data);
        setChartData(transformedData);
    }, [data]);

    return (
        <ResponsiveContainer width="70%" aspect={1}>
            <BarChart width={150} height={40} data={chartData}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" type="category" />
                <YAxis type="number" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" barSize={100} fill="#413ea0" >
                    <LabelList
                        dataKey="Total"
                        position="center"
                        fill="#ffffff"
                        formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                    />
                </Bar>
                <Bar dataKey="Division" barSize={100} fill="#7773f0" >
                    <LabelList
                        dataKey="Division"
                        position="center"
                        fill="#ffffff"
                        formatter={(value: any) => `${((value / total) * 100).toFixed(2)}%`}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DenunciasMunicipios;