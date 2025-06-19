// Hooks
import { useEffect, useState } from "react";
// Componentes
import EstadisticasMunicipios from "../TablasEstadisticas/EstadisticasMunicipios"
import DenunciasMunicipios from "../Graficos/DenunciasMunicipios"

// Props
type EstadisticasMunicipiosSeccionProps = {
  denunciasAMostrar: any;
}

function EstadisticasMunicipiosSeccion({ denunciasAMostrar }: EstadisticasMunicipiosSeccionProps) {
  // Estados
  const [estadisticaMunicipios, setEstadisticaMunicipios] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // UseEffect
  useEffect(() => {
    // Busca las estadisticas de los municipios
    const fetchDenuncias = async () => {
      // Si no hay denuncias, no hace nada
      if (denunciasAMostrar.length > 0) {
        // Calcula las estadisticas de los municipios
        const estadistica = await calcularEstadisticasMunicipio(denunciasAMostrar)
        // Setea las estadisticas
        setEstadisticaMunicipios(estadistica)
      }
      // Cambia el estado de loading
      setLoading(false);
    }
    fetchDenuncias()
  }, [denunciasAMostrar])


  const calcularEstadisticasMunicipio = (denuncias: any[]) => {
    // Calcula las estadisticas de los municipios con el formato {unidad_de_carga: {municipio: cantidad}}
    const estadisticas: { [unidad_de_carga: string]: { [municipio: string]: number } } = {};
    // Recorre las denuncias
    denuncias?.forEach(denuncia => {
      // Obtiene la unidad de carga y el municipio
      const { unidad_de_carga, municipio } = denuncia;
      // Si no existe la unidad de carga, la crea
      if (!estadisticas[unidad_de_carga]) {
        estadisticas[unidad_de_carga] = {};
      }
      // Si existe el municipio, suma 1, sino lo crea
      if (estadisticas[unidad_de_carga][municipio]) {
        estadisticas[unidad_de_carga][municipio]++;
      } else {
        estadisticas[unidad_de_carga][municipio] = 1;
      }

    });
    // Calcula los totales de cada unidad de carga
    const totales: { [unidad_de_carga: string]: number } = {};
    // Recorre las estadisticas
    for (const unidad in estadisticas) {
      // Suma los valores de cada municipio
      totales[unidad] = Object.values(estadisticas[unidad]).reduce((acc, curr) => acc + curr, 0);
    }
    // Retorna las estadisticas y los totales
    return { estadisticas, totales };
  };
  // Si esta cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl">Hechos registrados en las localidades de la Provincia del Chaco  {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
      <div className='flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col w-9/10 md:w-4/10'>
          {Object?.entries(estadisticaMunicipios?.estadisticas).map(([unidad, municipios]) => (
            <div key={unidad}>
              <h3 className='text-xl'>{unidad} </h3>
              <div>
                <ul>
                  <EstadisticasMunicipios estadisticasTotal={estadisticaMunicipios?.totales[unidad]} estadisticasUnidad={unidad} estadisticaMunicipios={municipios} />
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-10 w-full md:w-5/10'>
          <DenunciasMunicipios data={estadisticaMunicipios} total={denunciasAMostrar?.length} />
        </div>
      </div>
    </>

  )
}

export default EstadisticasMunicipiosSeccion