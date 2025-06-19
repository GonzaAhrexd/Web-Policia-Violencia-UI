


type EstadisticasAprehensionPorDivisionProps = {
    estadisticasAprehensionPorDivision: any;
    total: number;
}

function EstadisticasAprehensionPorDivision({ estadisticasAprehensionPorDivision, total }: EstadisticasAprehensionPorDivisionProps) {
    return (
        <div className="table w-full m-4 border-2 border-sky-800">
            <div className='table-row'>
                <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                    <div className="w-8/10 ml-4">División</div>
                    <div className="w-2/10">Hechos</div>
                </div>
            </div>
            {
                Object.entries(estadisticasAprehensionPorDivision).map(([division, cantidad]:any) => (
                    <div className="flex flex-row items-between justify-between" key={division}>
                        <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">{division}</div>
                        <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                            {cantidad.medida_dispuesta_solicitud_de_aprehension}
                        </div>
                    </div>
                ))
            }
            <div className="flex flex-row items-between justify-between">
                <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">Total</div>
                <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                    {total}
                </div>
            </div>
        </div>
    )
}

export default EstadisticasAprehensionPorDivision