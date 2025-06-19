
type EstadisticaMunicipiosProps = {
    estadisticaMunicipios: any;
    estadisticasUnidad: string;
    estadisticasTotal: number;
}

function EstadisticasMunicipios({ estadisticaMunicipios, estadisticasUnidad, estadisticasTotal }: EstadisticaMunicipiosProps) {
    return (
        <div className="table w-full m-4 border-2 border-sky-800">
            <div className='table-row'>
                <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" > 
                    <div className="w-8/10 ml-4"> {estadisticasUnidad}</div> 
                    <div className="w-2/10  ">{estadisticasTotal}</div>
                </div>
            </div>
            {Object.entries(estadisticaMunicipios).map(([municipio, cantidad]) => (
                <div className="flex flex-row items-between justify-between" key={municipio}>
                    <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">{municipio}</div>
                    <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                        { /* @ts-ignore */}
                        {cantidad}
                    </div>
                </div>
            ))
            }
        </div>


    )
}

export default EstadisticasMunicipios