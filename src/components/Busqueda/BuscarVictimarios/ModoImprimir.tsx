import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputRegister from '../../InputComponents/InputRegister'
import { PrinterIcon, XMarkIcon } from '@heroicons/react/24/solid'
import SelectRegisterSingle from '../../Select/SelectRegisterSingle'
import InputCheckbox from '../../InputComponents/InputCheckbox'

import { pdf } from '@react-pdf/renderer';
import PDF from './PDF';
interface modoImprimirProps {
    modoImprimir: any
    setModoImprimir: any
    denunciasAMostrar: any
    user: any
    data: any
}

function modoImprimir({ modoImprimir, setModoImprimir, denunciasAMostrar, user, data }: modoImprimirProps) {

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()


    const [isListarTodo, setIsListarTodo] = useState(false)

    const [opcionesVictimarios, setOpcionesVictimarios] = useState<any>([])

    useEffect(() => {
        denunciasAMostrar.forEach((denuncia: any) => {
            setOpcionesVictimarios((opcionesVictimarios:any ) => {
                // @ts-ignore
                if (!opcionesVictimarios.some(opcion => opcion.nombre === denuncia.victima_nombre)) {
                    return [...opcionesVictimarios, { nombre: denuncia.victima_nombre, value: denuncia.victima_nombre }];
                } else {
                    return opcionesVictimarios;
                }
            });
        });
    }, []);

    return (
        <>
            <h1 className='text-3xl my-5 font-sans	'>Imprimir antecedentes</h1>
            <form
                className='flex flex-col w-8/10 md:w-full'
                onSubmit={
                    handleSubmit(async (values) => {

                        // @ts-ignore
                        const denunciasFiltradas = denunciasAMostrar.filter(denuncia => denuncia.victima_nombre == values.denuncias_de || values.listar_todo === true);

                        const blob = await pdf(<PDF datos={data} user={user} denunciasAMostrar={denunciasFiltradas} valores={values} />).toBlob();
                        // Crea una URL de objeto a partir del blob
                        const url = URL.createObjectURL(blob);
                        // Abre la URL en una nueva pestaña
                        window.open(url);

                    })}>

                <div>
                    <InputRegister busqueda={true} notMid={true} campo="Firma atentamente" nombre="atte" register={register} type="text" error={errors.atte} />
                    {!isListarTodo &&
                        <SelectRegisterSingle mid={true} campo="Listar denuncias de" nombre="denuncias_de" setValue={setValue} error={errors} opciones={opcionesVictimarios} />
                    }
                    <InputCheckbox setHook={setIsListarTodo} state={isListarTodo} campo="Listar todo" nombre="listar_todo" register={register} error={errors.listarTodo} id="listarTodo"  setValue={setValue} />
                </div>
                <div className='my-5 flex flex-col md:flex-row sm:items-center md:justify-center w-full '>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' >
                        <PrinterIcon className="w-7" />
                    </button>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-full sm:w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setModoImprimir(!modoImprimir)}>
                        <XMarkIcon className="w-7" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default modoImprimir