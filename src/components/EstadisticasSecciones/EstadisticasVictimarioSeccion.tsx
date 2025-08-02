// Componentes
import SeccionOcupacion from './EstadisticasVictima/SeccionOcupacion'
import SeccionFuerzaDeSeguridad from './EstadisticasVictimario/SeccionFuerzasDeSeguridad'
import SeccionCondicionesVictimario from './EstadisticasVictimario/SeccionCondicionesVictimario'
// Hooks
import { useState, useEffect } from 'react'
// Backend
import { getVictimariosArray } from '../../api/CRUD/victimario.crud'


import Denuncia from '../../types/Denuncia';
import Victimario from '../../types/Victimario';

type EstadisticasVictimarioSeccionProps = {
    denunciasAMostrar: Denuncia[]
}


function EstadisticasVictimarioSeccion({ denunciasAMostrar }: EstadisticasVictimarioSeccionProps) {
    // Estado
    const [victimarios, setVictimarios] = useState<Set<Victimario>>(new Set())
    const [loading, setLoading] = useState(true)

    // UseEffect
   useEffect(() => {
    // Función para obtener los victimarios de las denuncias
    const fetchVictimarios = async () => {
        // Set temporal para evitar duplicados por contenido
        const victimarioSet = new Set<string>();
        const arrayIds: string[] = [];

        // Recolectamos los IDs de victimarios
        for (const denuncia of denunciasAMostrar) {
            arrayIds.push(denuncia.victimario_ID);
        }

        try {
            // Llamamos al backend
            const victimariosArray = await getVictimariosArray(arrayIds);

            // Usamos stringify para evitar duplicados aunque sean referencias distintas
            victimariosArray.forEach((victimario: any) => {
                victimarioSet.add(JSON.stringify(victimario));
            });

        } catch (error) {
            console.error("Error al obtener los victimarios:", error);
        }

        // Convertimos el Set en un array de objetos
        const victimarioArrayFinal: Set<Victimario> = new Set(
            Array.from(victimarioSet).map((victimarioString: string) => JSON.parse(victimarioString))
        );

        // Ahora victimarios es un array
        setVictimarios(victimarioArrayFinal);
        setLoading(false);
    };

    fetchVictimarios();
}, [denunciasAMostrar]);

    // Si está cargando, mostrar "Cargando..."
    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className="spinner"></div>
            </div>
        )

    }

    return (
        <>
            <SeccionOcupacion persona={victimarios} tipo={"Ocupación de victimarios"} />
            <SeccionFuerzaDeSeguridad victimarios={victimarios} denuncias={denunciasAMostrar} />
            <SeccionCondicionesVictimario victimarios={victimarios} denunciasAMostrar={denunciasAMostrar} />

        </>
    )
}

export default EstadisticasVictimarioSeccion