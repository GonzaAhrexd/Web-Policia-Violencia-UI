import { useEffect, useState } from "react"

import EstadisticasTiposDeViolencia from "../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla"
import DenunciasMedidasCautelaresGrafico from "../../Graficos/DenunciasMedidasCautelaresGrafico"
type SeccionVinculoConAgresorProps = {
  denunciasAMostrar: any
}

function SeccionVinculoConAgresor({ denunciasAMostrar }: SeccionVinculoConAgresorProps) {

  const [vinculoConAgresor, setVinculoConAgresor] = useState({})


  useEffect(() => {
    const contador: { [key: string]: number } = {};

    denunciasAMostrar.forEach((denuncia: any) => {
      const relacion = denuncia.relacion_victima_victimario;
      if (contador[relacion]) {
        contador[relacion]++;
      } else {
        contador[relacion] = 1;
      }
    });

    setVinculoConAgresor(contador);
  }, [denunciasAMostrar]);


  const format = (value: string) => {
    return value;
  }


  return (
    <>
      <h1 className="text-2xl">Vínculo entre víctimas y victimarios registrados en la Provincia del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
     <div className="w-full flex flex-col md:flex-row justify-between">
      <div className='w-full md:w-4/10 '>
        <EstadisticasTiposDeViolencia texto="Vínculo con el agresor" tipos_de_violencia={vinculoConAgresor} format={format} />
      </div>
      <div className='w-9/10 md:w-5/10'>
      <DenunciasMedidasCautelaresGrafico  estadistica={vinculoConAgresor}/>
      </div>
     </div>
    </>

  );

}

export default SeccionVinculoConAgresor