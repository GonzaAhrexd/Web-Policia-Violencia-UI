// Hooks
import { useState, useEffect } from 'react';

// Texto modal
import { tiposModalidades } from '../../GlobalConst/modalTextos'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Componentes
import EstadisticasTiposDeViolenciaTabla from '../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla';
import TiposDeViolenciaTorta from '../Graficos/TiposDeViolenciaTorta'; 

// Props
type EstadisticasModalidadesProps = {
    handleOpenModal: any,
    setTitulo: any,
    denunciasAMostrar: any,
}


function EstadisticasModalidades({ handleOpenModal, setTitulo, denunciasAMostrar }: EstadisticasModalidadesProps) {
    // Estado
    const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});

    // UseEffect
    useEffect(() => {
        // Función para calcular las modalidades de violencia
        const calcularModalidadesDeViolencia = (denuncias: any[]) => {
            // Objeto para guardar las estadísticas
            const estadisticas: { [modalidad: string]: number } = { Total: 0 };
            // Recorrer las denuncias
            denuncias.forEach((denuncia) => {
            // Obtener la modalidad de la denuncia
              const modalidad = denuncia.modalidades;
            // Si la modalidad existe, sumar 1 al contador de esa modalidad 
              if (modalidad) {
                if (!estadisticas[modalidad]) {
                  estadisticas[modalidad] = 0;
                }
                estadisticas[modalidad] += 1;
                estadisticas.Total += 1;
              }
            });
          
            return estadisticas;
          };
          // Calcular las modalidades de violencia
        setEstadisticas(calcularModalidadesDeViolencia(denunciasAMostrar));
    }, [denunciasAMostrar]);

    // Formatear el tipo de violencia
    const formatTipoViolencia = (tipo: string) => {
        return tipo;
    }
    
    return (
        <>
            <h1 className="text-2xl">Modalidades de violencia registradas en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <h2 className='flex flex-row text-xl'>Ley 26.485
                <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (
                    setTitulo("Modalidades"),
                    handleOpenModal(tiposModalidades)
                )} />
            </h2>

            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <EstadisticasTiposDeViolenciaTabla texto="Tipos de violencia" tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
                </div>
                <div className='flex md:hidden flex-col w-full md:w-4/10 h-full'>
                    <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} aspect={1} />
                </div>
                <div className='hidden md:flex flex-col w-full md:w-4/10 h-full'>
                    <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} aspect={2} />
                </div>
            </div>
        </>
    )
}

export default EstadisticasModalidades