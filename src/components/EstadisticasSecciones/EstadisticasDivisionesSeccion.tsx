// Hooks
import { useEffect, useState } from "react";
// Componentes
import EstadisticasDivision from "../TablasEstadisticas/EstadisticasDivision"
import DenunciasDivisionesComisariasTorta from "../Graficos/DenunciasDivisionesComisariasTorta";
import DenunciasDivisiones from "../Graficos/DenunciasDivisiones"

// Props
type EstadisticasMunicipiosSeccionProps = {
    denunciasAMostrar: any;
}

function EstadisticasMunicipiosSeccion({ denunciasAMostrar }: EstadisticasMunicipiosSeccionProps) {

    // Estados
    const [estadisticasDivisiones, setEstadisticasDivisiones] = useState<any>({});
    const [loading, setLoading] = useState(true);

    // USeEffect
    useEffect(() => {
        // Buscar y calcular las estadisticas de las divisiones cuando denuncias a mostrar cambie
        const fetchDenuncias = async () => {
            // Si hay denuncias a mostrar
            if (denunciasAMostrar.length > 0) {
                // Calcular las estadisticas de las divisiones
                const estadistica = await calcularEstadisticasDivision(denunciasAMostrar)
                // Setear las estadisticas
                setEstadisticasDivisiones(estadistica)
            }
            // Setear loading en false
            setLoading(false);
        }
        // Llama a la funcion fetchDenuncias
        fetchDenuncias()
    }, [denunciasAMostrar])

    // Funcion para calcular estadisticas de las divisiones
    const calcularEstadisticasDivision = (denuncias: any[]) => {
        // En estadisticas guardo la cantidad de denuncias por division y la cantidad de denuncias que fueron recepcionadas en las divisiones
        const estadisticas: { [key: string]: { valor: number; isDivision: number } } = {};
        // Recorro las denuncias
        denuncias.forEach((denuncia) => {
            // Guardo la division
            const division = denuncia.unidad_de_carga;
            // Si no existe la division en estadisticas la creo
            if (!estadisticas[division]) {
                estadisticas[division] = { valor: 0, isDivision: 0 };
            }
            estadisticas[division].valor += 1;
            // Si la denuncia es division sumo 1 a isDivision
            if (denuncia.isDivision) {
                estadisticas[division].isDivision += 1;
            }
        });
        // Retorno estadisticas
        return estadisticas;

    };
    // Si loading es true muestro un div con Loading
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-2xl">Hechos registrados en direcciones y divisiones del Chaco {"(Total de " + denunciasAMostrar?.length + " casos)"}</h1>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col w-9/10 md:w-4/10'>
                    <div>
                        <EstadisticasDivision estadisticasDivisiones={estadisticasDivisiones} />
                    </div>
                    <div className="text-2xl">
                        {/* @ts-ignore */}
                        De un total de {denunciasAMostrar?.length} denuncias, {Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)} fueron recepcionadas en las distintas divisiones de la provincia.
                    </div>
                    <div className=" hidden md:block">
                    {/* @ts-ignore */}
                    <DenunciasDivisionesComisariasTorta aspect={2} comisarias={(denunciasAMostrar?.length) - Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)} division={Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)} />
                    </div>
                    <div className=" block md:hidden ">
                    {/* @ts-ignore */}
                    <DenunciasDivisionesComisariasTorta aspect={1} comisarias={(denunciasAMostrar?.length) - Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)} division={Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0)} />
                    </div>
                </div>
                <div className='mt-10 w-full md:w-5/10'>
                    <DenunciasDivisiones data={estadisticasDivisiones} total={denunciasAMostrar?.length} />
                </div>
            </div>
        </>

    )
}

export default EstadisticasMunicipiosSeccion