import { useEffect, useState } from 'react'
import EstadisticasTiposDeViolencia from '../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import TiposDeViolenciaTorta from '../Graficos/TiposDeViolenciaTorta';

function EstadisticasModoActuacionSeccion({denunciasAMostrar}) {

    const [estadisticaModoActuacion, setEstadisticaModoActuacion] = useState<any>([])

    useEffect(() => {
      // Se tiene que convertir al formato { tipo: cantidad } donde tipo es el modo de actuacion y cantidad es la cantidad de denuncias que tienen ese modo de actuacion
      const estadistica: { [tipo: string]: number } = {};
  
      // Contar las denuncias por modo de actuación
      denunciasAMostrar.forEach((denuncia: any) => {
          const modoActuacion = denuncia.modo_actuacion;
          if (estadistica[modoActuacion]) {
              estadistica[modoActuacion]++;
          } else {
              estadistica[modoActuacion] = 1;
          }
      });
  
      // Calcular el total y agregarlo al objeto
      const total = Object.values(estadistica).reduce((sum, value) => sum + value, 0);
      estadistica['Total'] = total;
  
      setEstadisticaModoActuacion(estadistica);
  }, [denunciasAMostrar]); // Asumiendo que denunciasAMostrar es una dependencia



  return (
    <>
        <h1 className='text-2xl'>Modos de actuación</h1>
        <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
        <EstadisticasTiposDeViolencia texto="Modos de actuación" tipos_de_violencia={estadisticaModoActuacion} format={(tipo) => tipo} />
        </div>
        <div className='hidden md:block w-9/10 md:w-4/10 '>
          <TiposDeViolenciaTorta tipos_de_violencia={estadisticaModoActuacion} aspect={2}/>
        </div>
        <div className='block md:hidden w-9/10 md:w-4/10'>
          <TiposDeViolenciaTorta tipos_de_violencia={estadisticaModoActuacion} aspect={1}/>
        </div>
        </div>
    </>
  )
}

export default EstadisticasModoActuacionSeccion