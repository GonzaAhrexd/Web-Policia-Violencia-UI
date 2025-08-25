import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputText from '../../InputComponents/InputText'
import { PrinterIcon, XMarkIcon } from '@heroicons/react/24/solid'
import SelectRegisterSingle from '../../Select/SelectRegisterSingle'
import InputCheckbox from '../../InputComponents/InputCheckbox'

import { pdf } from '@react-pdf/renderer';
import PDF from '../../ReactPDF/PDFRegistroPersonas';

// Tipos 
import Denuncia from '../../../types/Denuncia';
import Usuario from '../../../types/Usuarios';
import Victima from '../../../types/Victimas';
import Victimario from '../../../types/Victimario';
import Tercero from '../../../types/Tercero';
type modoImprimirProps = {
    tipoPersona: string
    modoImprimir: boolean
    setModoImprimir: (modo: boolean) => void
    denunciasAMostrar: Denuncia[]
    user: Usuario
    data: Victima | Victimario | Tercero
}

function modoImprimir({ tipoPersona, modoImprimir, setModoImprimir, denunciasAMostrar, user, data }: modoImprimirProps) {

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm()

    const [isListarTodo, setIsListarTodo] = useState(false)

    const [opcionesPersonas, setOpcionesPersonas] = useState<any>([])

    useEffect(() => {
        denunciasAMostrar.forEach((denuncia: Denuncia) => {
            {
                if (tipoPersona == "víctima") {
                    setOpcionesPersonas((opcionesVictimarios: Victimario[]) => {
                        if (!opcionesVictimarios.some(opcion => opcion.nombre === denuncia.victimario_nombre)) {
                            return [...opcionesVictimarios, { nombre: denuncia.victimario_nombre, value: denuncia.victimario_nombre }];
                        } else {
                            return opcionesVictimarios;
                        }
                    });
                }
            }
            {
                if (tipoPersona == "victimario") {

                    setOpcionesPersonas((opcionesVictimarios: Victima[]) => {
                        if (!opcionesVictimarios.some(opcion => opcion.nombre === denuncia.victima_nombre)) {
                            return [...opcionesVictimarios, { nombre: denuncia.victima_nombre, value: denuncia.victima_nombre }];
                        } else {
                            return opcionesVictimarios;
                        }
                    });
                }
            }
            {
                if (tipoPersona == "tercero") {
                    setOpcionesPersonas((opcionesTerceros: Tercero[]) => {
                        if (!opcionesTerceros.some(opcion => opcion.nombre === denuncia.victima_nombre)) {
                            return [...opcionesTerceros, { nombre: denuncia.victima_nombre, value: denuncia.victima_nombre }];
                        } else {
                            return opcionesTerceros;
                        }
                    });
                }
            }
        });
    }, []);

    return (
        <>
            <h1 className='text-3xl my-5 font-sans'>Imprimir antecedentes</h1>
            <form onSubmit={
                handleSubmit(async (values) => {
                    
                    let denunciasFiltradas

                    if (tipoPersona == "víctima") {
                        denunciasFiltradas = denunciasAMostrar.filter(denuncia => denuncia.victimario_nombre == values.denuncias_de || values.listar_todo === true);
                    } 
                    if(tipoPersona == "victimario") {
                        denunciasFiltradas = denunciasAMostrar.filter(denuncia => denuncia.victima_nombre == values.denuncias_de || values.listar_todo === true);
                    }
                    if (tipoPersona == "tercero") {
                        denunciasFiltradas = denunciasAMostrar.filter(denuncia => denuncia.victima_nombre == values.denuncias_de || values.listar_todo === true);
                    }
                    
                    // Crea un blob con el PDF
                    const blob = await pdf(<PDF tipoPersona={tipoPersona} datos={data} user={user} denunciasAMostrar={denunciasFiltradas} valores={values} />).toBlob();
                    // Crea una URL de objeto a partir del blob
                    const url = URL.createObjectURL(blob);
                    // Abre la URL en una nueva pestaña
                    window.open(url);
                })}>

                <div>
                    <InputText customSize="flex flex-col w-full md:w-full" campo="Firma atentamente" nombre="atte" register={register} error={errors.atte} />
                    {!isListarTodo &&
                        <SelectRegisterSingle mid={true} campo="Listar denuncias de" nombre="denuncias_de" setValue={setValue} error={errors} opciones={opcionesPersonas} />
                    }
                    <InputCheckbox setHook={setIsListarTodo} state={isListarTodo} campo="Listar todo" nombre="listar_todo" register={register} error={errors.listarTodo} id="listarTodo" setValue={setValue} />
                </div>
                <div className='my-5 flex flex-col md:flex-row items-center justify-center w-full '>
                    <button className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0'>
                        <PrinterIcon className="w-7" />
                    </button>
                    <div className='bg-sky-950 hover:bg-sky-700 text-white cursor-pointer font-bold py-2 px-4 rounded w-6/10 md:w-2/10 flex items-center justify-center mx-2 mt-2 md:mt-0' onClick={() => setModoImprimir(!modoImprimir)}>
                        <XMarkIcon className="w-7" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default modoImprimir