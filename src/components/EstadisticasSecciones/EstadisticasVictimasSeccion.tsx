import { useEffect, useState } from 'react'
// BackEnd
import { getVictimasArray } from '../../api/CRUD/victimas.crud'

// Componentes
import SeccionOcupacion from './EstadisticasVictima/SeccionOcupacion'
import SeccionCondicion from './EstadisticasVictima/SeccionCondicion'
import SeccionVinculoConAgresor from './EstadisticasVictima/SeccionVinculoConAgresor'
import SeccionCompartenViviendaYDependenciaEconomica from './EstadisticasVictima/SeccionCompartenViviendaYDependenciaEconomica'

type EstadisticasVictimasSeccionProps = {
    denunciasAMostrar: any
}

function EstadisticasVictimasSeccion({ denunciasAMostrar }: EstadisticasVictimasSeccionProps) {

    // Estado
    const [victimas, setVictimas] = useState(new Set())
    const [loading, setLoading] = useState(true)

    // UseEffect
    useEffect(() => {
        // Función para obtener las víctimas de las denuncias
        const fetchVictimas = async () => {
            // Set para guardar las víctimas
            const victimasSet = new Set();
            const arrayIds: string[] = [];
            // Usamos un bucle for...of para iterar sobre las denuncias
            console.log(denunciasAMostrar)

            for (const denuncia of denunciasAMostrar) {
                    arrayIds.push(denuncia.victima_ID);
            }

            try{
                const victimasArray = await getVictimasArray(arrayIds);
                victimasArray.forEach((victima: any) => {
                    victimasSet.add(JSON.stringify(victima));
                });
            }catch (error) {
                console.error('Error al obtener las víctimas:', error);
            }
            
            // Convertimos el Set a un arreglo de objetos
            const victimasArray: any = Array.from(victimasSet).map((victimaString: any) => JSON.parse(victimaString));
            setVictimas(victimasArray);
            setLoading(false);
        };
        // Llamamos a la función para obtener las víctimas
        fetchVictimas();
    }, [])

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
            <SeccionOcupacion persona={victimas} tipo="Ocupación de víctimas" />
            <SeccionCondicion victimas={victimas} />
            <SeccionVinculoConAgresor denunciasAMostrar={denunciasAMostrar} />
            <SeccionCompartenViviendaYDependenciaEconomica denunciasAMostrar={denunciasAMostrar} />
        </>
    )
}

export default EstadisticasVictimasSeccion