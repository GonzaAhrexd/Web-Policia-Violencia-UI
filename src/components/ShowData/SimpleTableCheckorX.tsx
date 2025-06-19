import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface simpleTableCheckorXProps {
    campo?: string;
    datos: any;
    icono?: any;
}

function SimpleTableCheckorX({ campo, datos, icono }: simpleTableCheckorXProps) {
    return (
        <div className="table w-8/10 md:w-full m-4 border-2 border-sky-800">
            <div className='table-row'>

                <div className="flex flex-row bg-sky-900 text-white font-medium h-10 p-3">
                    <div className='mr-2'>
                        {campo ? campo : ""}
                    </div>
                    <div>
                        {icono}
                    </div>
                </div>
                <div className="table-cell bg-sky-900 text-white font-medium h-10" > </div>
            </div>
            {datos.map((data: any, index: number) => (

                <div className="flex flex-row items-between justify-between" key={index}>
                    <div className="flex pl-4 text-base font-medium md:text-xl w-4/10 md:w-4/10">{data.nombre}</div>
                    {typeof data.valor !== "boolean" ?
                        <div className="flex w-4/10 md:w-2/10 break-words break-all	">
                            {data.valor}
                        </div>
                        :
                        <div className="flex w-4/10 md:w-2/10">{
                            data.valor ?
                                <CheckIcon className='w-6' />
                                : <XMarkIcon className='w-6' />}

                        </div>
                    }
                </div>
            ))}

        </div>
    )
}

export default SimpleTableCheckorX