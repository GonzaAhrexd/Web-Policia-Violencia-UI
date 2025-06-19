// Componentes
import SeccionOcupacion from './EstadisticasVictima/SeccionOcupacion' 
import SeccionFuerzaDeSeguridad from './EstadisticasVictimario/SeccionFuerzasDeSeguridad'
import SeccionCondicionesVictimario from './EstadisticasVictimario/SeccionCondicionesVictimario'
// Hooks
import { useState, useEffect } from 'react'
// Backend
import { getVictimariosArray } from '../../api/CRUD/victimario.crud'

type EstadisticasVictimarioSeccionProps = {
    denunciasAMostrar: any
}


function EstadisticasVictimarioSeccion({denunciasAMostrar}: EstadisticasVictimarioSeccionProps) {
    // Estado
    const [victimarios, setVictimarios] = useState(new Set())
    const [loading, setLoading] = useState(true)
    
    // UseEffect
    useEffect(() => {
        // Función para obtener los victimarios de las denuncias
        const fetchVictimarios = async () => {
            // Set para guardar los victimarios
            const victimarioSet = new Set();
            const arrayIds: string[] = [];


            for (const denuncia of denunciasAMostrar) {
                arrayIds.push(denuncia.victimario_ID);
            }

            try{
                const victimariosArray = await getVictimariosArray(arrayIds);
                victimariosArray.forEach((victimario: any) => {
                    victimarioSet.add(JSON.stringify(victimario));
                });
            } catch (error) {
                console.error("Error al obtener los victimarios:", error);
            }

            // Convertimos el Set a un arreglo de objetos
            const victimarioArray: any = Array.from(victimarioSet).map((victimarioString: any) => JSON.parse(victimarioString));
            setVictimarios(victimarioArray);
            setLoading(false);
        };
        
        // Llamamos a la función para obtener los victimarios
        fetchVictimarios();
        
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
        <SeccionOcupacion persona={victimarios} tipo={"Ocupación de victimarios"} />
        <SeccionFuerzaDeSeguridad victimarios={victimarios} denuncias={denunciasAMostrar} />
        <SeccionCondicionesVictimario victimarios={victimarios} denunciasAMostrar={denunciasAMostrar} />
        
    </>
  )
}

export default EstadisticasVictimarioSeccion