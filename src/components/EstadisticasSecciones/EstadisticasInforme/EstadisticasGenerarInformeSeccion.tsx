import PDF from './PDF';
import { pdf } from '@react-pdf/renderer';
import EstadisticasTiposDeViolencia from '../../TablasEstadisticas/EstadisticasTiposDeViolenciaTabla';
type EstadisticasGenerarInformeSeccionProps = {
    denunciasAMostrar: any;
    fecha: any;
};

function EstadisticasGenerarInformeSeccion({ denunciasAMostrar, fecha }: EstadisticasGenerarInformeSeccionProps) {
        const estadisticas:Record<string, { total: number; totalDivision: number; aprehensiones: number; solicitudesAprehension: number }> = denunciasAMostrar.reduce((acc:any, denuncia:any) => {
        const { unidad_de_carga, isDivision, aprehension, medida_dispuesta } = denuncia;

        if (!acc[unidad_de_carga]) {
            acc[unidad_de_carga] = {
                total: 0,
                totalDivision: 0,
                aprehensiones: 0,
                solicitudesAprehension: 0,
            };
        }

        acc[unidad_de_carga].total += 1;
        if (isDivision) {
            acc[unidad_de_carga].totalDivision += 1;
        }
        acc[unidad_de_carga].aprehensiones += aprehension ? 1 : 0;
        acc[unidad_de_carga].solicitudesAprehension += medida_dispuesta?.solicitud_de_aprehension? 1 : 0;

        return acc;
    }, {} as Record<string, { total: number; totalDivision: number; aprehensiones: number; solicitudesAprehension: number }>);


    const handleImprimir = async () => {

        const blob = await pdf(<PDF fecha={fecha} datos={estadisticas} />).toBlob();
        // Crea una URL de objeto a partir del blob
        const url = URL.createObjectURL(blob);
        // Abre la URL en una nueva pestaña
        window.open(url);

    }
    const format = (tipo: string) => {
        switch(tipo){
            case "total": return "Total";
            case "totalDivision": return "Total en División";
            case "aprehensiones": return "Aprehensiones";
            case "solicitudesAprehension": return "Solicitudes de Aprehensión";
        }

        return tipo;
    }
    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
            <button className={` bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-2/10 lg:w-1/10 m-2 transform transition-transform duration-300 ease-in-out hover:scale-105`} onClick={() => handleImprimir()}> Imprimir </button>
            </div>
            {Object.entries(estadisticas).map(([unidad, stats]) => (
                <div key={unidad} className='w-full'>
                    <EstadisticasTiposDeViolencia texto={unidad} format={format} tipos_de_violencia={stats} />
                </div>
            ))}
        </div>
    );
}

export default EstadisticasGenerarInformeSeccion;