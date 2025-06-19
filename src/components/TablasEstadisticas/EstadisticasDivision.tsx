import { useEffect, useState } from 'react'

type EstadisticasDivisionProps = {
    estadisticasDivisiones: any;
}

function EstadisticasDivision({ estadisticasDivisiones }: EstadisticasDivisionProps) {

    const [total, setTotal] = useState(null);
    const [isDivision, setIsDivision] = useState(null);

    useEffect(() => {
        // Obtener el total del total y de isDivision
        // @ts-ignore
        const total = Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.valor, 0);
        // @ts-ignore
        const isDivision = Object.values(estadisticasDivisiones).reduce((acc, curr) => acc + curr.isDivision, 0);
        // @ts-ignore
        setTotal(total);
        // @ts-ignore
        setIsDivision(isDivision);
    }, [])
    return (
        <>
            <div className="table w-full m-4 border-2 border-sky-800">
                <div className='table-row'>
                    <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                        <div className="w-8/10 ml-4">Dirección Zona</div>
                        <div className="w-2/10">{total}</div>
                    </div>
                </div>
                {
                    Object.entries(estadisticasDivisiones).map(([division, cantidad]) => (
                        <div className="flex flex-row items-between justify-between" key={division}>
                            <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">{division}</div>
                            <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                                { /* @ts-ignore */}
                                {cantidad.valor}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="table w-full m-4 border-2 border-sky-800">
                <div className='table-row'>
                    <div className="flex items-center justify-between bg-sky-900 text-white font-medium h-10" >
                        <div className="w-8/10 ml-4">División Violencia Familiar y de Género </div>
                        <div className="w-2/10">{isDivision}</div>
                    </div>
                </div>
                {
                    Object.entries(estadisticasDivisiones).map(([division, cantidad]) => (
                        <div className="flex flex-row items-between justify-between" key={division}>
                            <div className="flex pl-4 text-base font-medium md:text-xl w-full  md:w-8/10">{division}
                            </div>
                            <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                                { /* @ts-ignore */}
                                {cantidad.isDivision}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default EstadisticasDivision