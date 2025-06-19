import { useEffect, useState } from 'react';
import EstadisticasTiposDeViolenciaTabla from '../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla';
import TiposDeViolenciaTorta from '../Graficos/TiposDeViolenciaTorta';


import { tiposDeViolenciaText } from '../../GlobalConst/modalTextos'

// Iconos
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

type EstadisticasTiposDeViolenciaProps = {
  denunciasAMostrar: any
  setTitulo: any
  handleOpenModal: any
}

const EstadisticasTiposDeViolencia = ({ denunciasAMostrar, setTitulo, handleOpenModal }: EstadisticasTiposDeViolenciaProps) => {
  const [estadisticas, setEstadisticas] = useState<{ [tipo: string]: number }>({});

  const tipoViolenciaMapping: { [key: string]: string } = {
    Fisica: 'Física',
    Psicologica: 'Psicológica',
    Economica_y_patrimonial: 'Económica y Patrimonial',
    Sexual: 'Sexual',
    Simbolica: 'Simbólica',
    Politica: 'Política',
  };



  useEffect(() => {
    const calcularTiposDeViolencia = (denuncias: any[]) => {
      const estadisticas: { [tipo: string]: number } = { Total: 0 };

      denuncias.forEach((denuncia) => {
        const tipos = denuncia.tipo_de_violencia;
        const tiposActivos = [];

        for (const tipo in tipos) {
          if (tipos[tipo]) {
            tiposActivos.push(tipo);
          }
        }

        tiposActivos.forEach((tipo) => {
          if (!estadisticas[tipo]) {
            estadisticas[tipo] = 0;
          }
          estadisticas[tipo] += 1;
        });

        estadisticas.Total += 1;
      });

      return estadisticas;
    };
    setEstadisticas(calcularTiposDeViolencia(denunciasAMostrar));
    
    
  }, [denunciasAMostrar]);



  const formatTipoViolencia = (tipo: string) => {
    return tipo.split(' + ').map(t => tipoViolenciaMapping[t] || t).join(' + ');
  };

  return (
    <>
      <h1 className="text-2xl">Tipos de violencia registrados en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
      <h2 className='flex flex-row text-xl'>Ley 26.485
        <QuestionMarkCircleIcon className="w-6 cursor-pointer" onClick={() => (
          setTitulo("Tipos de Violencia"),
          handleOpenModal(tiposDeViolenciaText)
        )} />
      </h2>

      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          <EstadisticasTiposDeViolenciaTabla texto="Tipos de violencia" tipos_de_violencia={estadisticas} format={formatTipoViolencia} />
        </div>
        <div className='hidden md:block w-9/10 md:w-4/10 '>
          <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} aspect={1}/>
        </div>
        <div className='block md:hidden w-9/10 md:w-4/10'>
          <TiposDeViolenciaTorta tipos_de_violencia={estadisticas} aspect={1}/>

        </div>
      </div>
    </>
  )
}

export default EstadisticasTiposDeViolencia;