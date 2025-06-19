import { useState, useEffect } from 'react'
import EstadisticasTiposDeViolencia from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
import DenunciasMedidasCautelaresGrafico from '../../Graficos/DenunciasMedidasCautelaresGrafico'


type SeccionOcupacionProps = {
  victimas: any
}

function SeccionCondicion({ victimas }: SeccionOcupacionProps) {
  const [estadisticasCondicion, setEstadisticasCondicion] = useState<any>({})


  useEffect(() => {
    const calcularTiposDeViolencia = (denuncias: any[]) => {
      const estadisticas: { [tipo: string]: number } = {};

      denuncias.forEach((denuncia) => {
        const tipos = denuncia.condiciones_de_vulnerabilidad;
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

      });

      return estadisticas;
    };
    setEstadisticasCondicion(calcularTiposDeViolencia(victimas));
  }, [victimas]);

  
  const tipoViolenciaMapping: { [key: string]: string } = {
    embarazo: 'Embarazo',
    periodo_post_parto: 'Periodo post-parto',
    periodo_de_lactancia: 'Periodo de Lactancia',
    discapacidad: 'Discapacidad',
    enfermedad_cronica: 'Enfermedad Crónica',
    adulto_mayor: 'Adulto mayor',
    menor_de_edad: 'Menor de edad',
    tratamiento_psicologico: 'Tratamiento psicológico',
};


  const format = (tipo: string) => {
      return tipo.split(' + ').map(t => tipoViolenciaMapping[t] || t).join(' + ');
  };


  return (
    <>
      <h1 className="text-2xl">Condición de víctimas registrados en la Provincia del Chaco en el periodo seleccionado {"(Total de " + victimas?.length + " víctimas)"}</h1>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-full md:w-4/10'>
          <EstadisticasTiposDeViolencia texto="Condición" tipos_de_violencia={estadisticasCondicion} format={format} />
        </div>
        <div className='w-full md:w-5/10'>
          <DenunciasMedidasCautelaresGrafico estadistica={estadisticasCondicion} aspect={2} />
        </div>
      </div>
    </>
  )
}

export default SeccionCondicion