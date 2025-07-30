import { useState, useEffect } from 'react'
import EstadisticasTiposDeViolencia from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import OcupacionGrafico from '../../Graficos/OcupacionGrafico'

import Victima from '../../../types/Victimas'
import Victimario from '../../../types/Victimario'

type SeccionOcupacionProps = {
    persona: Set<Victima | Victimario>
    tipo: string
}

function SeccionOcupacion({persona, tipo}: SeccionOcupacionProps) {

    const [estadisticaOcupacion, setEstadisticaOcupacion] = useState<any>({})
    useEffect(() => {
        const fetchOcupaciones = async () => {
            const ocupaciones = await obtenerOcupaciones()
            setEstadisticaOcupacion(ocupaciones)
        }
        fetchOcupaciones()
    }, [persona])

    const obtenerOcupaciones = () => {
        // Necesito que me vaya contando cada una de las ocupaciones que tienen las víctimas, es decir, algo como { "empleada": 5, "estudiante": 3, "desempleada": 2 }
        const ocupaciones: { [ocupacion: string]: number } = {}

        for(const victima of persona) {
            if (!ocupaciones[victima.ocupacion]) {
                ocupaciones[victima.ocupacion] = 0
            }
            ocupaciones[victima.ocupacion] += 1
    }
        return ocupaciones
    }

    const format = (ocupacion: string) => {
        return ocupacion.charAt(0).toUpperCase() + ocupacion.slice(1)
    }

    return (

        <>
        <h1 className="text-2xl">{tipo} registrados en la Provincia del Chaco en el periodo seleccionado {"(Total de " + persona?.size + " víctimas)"}</h1>
        <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col items-center justify-center w-full md:w-4/10'>
                <EstadisticasTiposDeViolencia texto="Ocupación" tipos_de_violencia={estadisticaOcupacion} format={format} />      
            </div>
            <div className='w-full md:w-5/10'>
              <OcupacionGrafico ocupaciones={estadisticaOcupacion} total={persona.size}/>
            </div>
        </div>
    </>

)
}

export default SeccionOcupacion