// Rechart
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Hooks
import { useEffect, useState } from 'react';

// Backend
import { getDenunciasEstadisticaAnual } from '../../api/CRUD/denuncias.crud';

type DenunciasMesProps = {
    aspect?: number
    inicio?: boolean
}
function DenunciasMes({ aspect, inicio }: DenunciasMesProps) {
    const [denuncias, setDenuncias] = useState(); // Array de 12 meses inicializados en 0

    useEffect(() => {
        const fetchDenuncias = async () => {
            try {
                const response = await getDenunciasEstadisticaAnual();
                setDenuncias(response); // Asignar los datos de denuncias al estado
            } catch (error) {
                console.error("Error fetching denuncias:", error);
            }
        }
        fetchDenuncias();
    }, []);



    return (
        <ResponsiveContainer width="100%" aspect={aspect || 1}>
            <BarChart width={150} height={40} data={denuncias}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" tick={{ fill: `${inicio ? '#ffffff' : '#000000'} ` }} />
                <YAxis tick={{ fill: `${inicio ? '#ffffff' : '#000000'} ` }} />
                <Tooltip />
                <Legend formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
                <Bar dataKey="total" fill='#6b48ff' />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DenunciasMes;
