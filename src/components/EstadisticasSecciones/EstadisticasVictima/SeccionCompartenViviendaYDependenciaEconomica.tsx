// Hooks
import { useEffect, useState } from 'react'
// Componentes
import EstadisticasTiposDeViolencia from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import SiNoTorta from '../../Graficos/SiNoTorta'
type SeccionCompartenViviendaYDependenciaEconomicaProps = {
    denunciasAMostrar: any
}


function SeccionCompartenViviendaYDependenciaEconomica({ denunciasAMostrar }: SeccionCompartenViviendaYDependenciaEconomicaProps) {

    const [compartenVivienda, setCompartenVivienda] = useState({})
    const [dependenciaEconomica, setDependenciaEconomica] = useState({})

    // Obtene la cantidad en denunciasAMostrar donde comparten vivienda con un useEffect que recorra denunciasAMostrar y guarde en el formato { si: 5, no: 3, total: 8}
    useEffect(() => {
        const contadorCompartenVivienda: { [key: string]: number } = {};
        const contadorDependenciaEconomica: { [key: string]: number } = {};
    
        denunciasAMostrar.forEach((denuncia: any) => {
            const comparten = denuncia.convivencia ? "Sí" : "No";
            const dependencia = denuncia.dependencia_economica ? "Sí" : "No";
    
            if (contadorCompartenVivienda[comparten]) {
                contadorCompartenVivienda[comparten]++;
            } else {
                contadorCompartenVivienda[comparten] = 1;
            }
    
            if (contadorDependenciaEconomica[dependencia]) {
                contadorDependenciaEconomica[dependencia]++;
            } else {
                contadorDependenciaEconomica[dependencia] = 1;
            }
        });
        setCompartenVivienda(contadorCompartenVivienda);
        setDependenciaEconomica(contadorDependenciaEconomica);
    }, [denunciasAMostrar]);
    

    const format = (value: string) => {
        // Haz que si es true devuelva "Si" y si es false devuelva "No", si es undefined que devuelva "Sin definir"
        return value;
    }
    return (
        <>
            <h1 className="text-2xl"> Convivencia y Dependencia Económica en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <div className="flex flex-col md:flex-row w-full justify-between">
                <div className='w-full md:w-4/10'>
                    <EstadisticasTiposDeViolencia texto="Comparten vivienda" tipos_de_violencia={compartenVivienda} format={format} />
                    <SiNoTorta estadistica={compartenVivienda} aspect={2}/>
                </div>
                <div className='w-full md:w-4/10'>
                        <EstadisticasTiposDeViolencia texto="Dependencia Económica" tipos_de_violencia={dependenciaEconomica} format={format} />
                        <SiNoTorta estadistica={dependenciaEconomica} aspect={2}/>
                </div>
            </div>
        </>
    )
}

export default SeccionCompartenViviendaYDependenciaEconomica