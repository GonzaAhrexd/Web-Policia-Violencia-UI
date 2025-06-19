// Hooks
import { useEffect, useState } from "react"
// Componentes
import SeccionOcupacionFuerzas from "../EstadisticasVictima/SeccionOcupacion"
import EstadisticasTabla from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla'
type SeccionOcupacionProps = {
  victimarios: any,
  denuncias: any
}

function SeccionOcupacion({ victimarios, denuncias }: SeccionOcupacionProps) {


  const [victimariosFuerzasDeSeguridad, setVictimariosFuerzasDeSeguridad] = useState<any>([])
  const [municipiosCount, setMunicipiosCount] = useState<any>([])
  useEffect(
    () => {
      const victimariosFuerzasDeSeguridad = victimarios.filter((victimario: any) => {
        return (
          victimario.ocupacion === 'Policía Provincial' ||
          victimario.ocupacion === 'Policía Federal Argentina' ||
          victimario.ocupacion === 'Servicio Penitenciario Provincial' ||
          victimario.ocupacion === 'Servicio Penitenciario Federal' ||
          victimario.ocupacion === 'Policía de Seguridad Aeroportuaria' ||
          victimario.ocupacion === 'Gendarmería Nacional Argentina' ||
          victimario.ocupacion === 'Ejército Argentino' ||
          victimario.ocupacion === 'Prefectura Naval Argentina'
        )
      })

      setVictimariosFuerzasDeSeguridad(victimariosFuerzasDeSeguridad)

      // @ts-ignore
      const victimariosIds = victimariosFuerzasDeSeguridad.map(victimario => victimario._id);
      
      // @ts-ignore
      const denunciasFuerzasDeSeguridad = denuncias.filter(denuncia => victimariosIds.includes(denuncia.victimario_ID));
      
     calcularEstadisticasMunicipio(denunciasFuerzasDeSeguridad)

      setMunicipiosCount(calcularEstadisticasMunicipio(denunciasFuerzasDeSeguridad).estadisticas)

    },
    [victimarios, denuncias]
  )

  
  const calcularEstadisticasMunicipio = (denuncias: any[]) => {
    const estadisticas: {  [municipio: string]: number }  = {};
    denuncias?.forEach(denuncia => {
      const { municipio } = denuncia;


      if (estadisticas[municipio]) {
        estadisticas[municipio]++;
      } else {
        estadisticas[municipio] = 1;
      }
    });

    const totales: { [unidad_de_carga: string]: number } = {};

    for (const unidad in estadisticas) {
      totales[unidad] = Object.values(estadisticas[unidad]).reduce((acc, curr) => acc + curr, 0);
    }
    return { estadisticas, totales };
  };

  const format = (value: any) => {
    return value;
  }


  return (
    <>
      <SeccionOcupacionFuerzas persona={victimariosFuerzasDeSeguridad} tipo="Hechos realizados por Fuerzas de seguridad" />
      <EstadisticasTabla tipos_de_violencia={municipiosCount} texto="Municipio" format={format} /> 

    </>
  )
}

export default SeccionOcupacion