// Componentes
import InputText from '../../InputComponents/InputText';
// Backend APIs
import { buscarTercero } from '../../../api/CRUD/terceros.crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';
// Dependencias de esta carpeta
import { columnTercero } from './columnDataTableTerceros'
import expandedComponents from './ExpandedComponentTercero'
import { customStyles } from '../../../GlobalConst/customStyles'
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Campos

import Tercero from '../../../types/Tercero';



function BuscarTerceros() {
    const [tercerosMostrar, setTercerosMostrar] = useState<Tercero[]>([]);
    const [mostrarAlerta, setMostrarAlerta] = useState<string>("");
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarTercero(values);
            setTercerosMostrar(result)
        }
        fetchDenuncias();
    }


    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <>
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values) => {

                        if (!values.id_tercero && !values.nombre_tercero && !values.apellido_tercero && !values.dni_tercero && !values.numero_de_expediente) {
                            setTercerosMostrar([])
                            setMostrarAlerta("Rellene al menos un campo");
                            return;
                        }
                        setMostrarAlerta("");
                        handleBusqueda(values)
                    }
                    )}>
                {mostrarAlerta && <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert"> {mostrarAlerta}</span>}
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="ID" nombre="id_tercero" register={register} require={false}  error={errors.id_tercero} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="Nombre" nombre="nombre_tercero" register={register} require={false}  error={errors.nombre} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="Apellido" nombre="apellido_tercero" register={register} require={false}  error={errors.apellido} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="DNI" nombre="dni_tercero" register={register} require={false}  error={errors.dni_victima} />
                <InputText campo="Número de expediente" nombre="numero_de_expediente" register={register} require={false}  error={errors.numero_de_expediente} customSize='flex flex-col w-full xl:w-1/2' />
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Tercero</h2>
                <DataTable
                    columns={columnTercero}
                    data={tercerosMostrar}
                    pagination
                    expandableRows
                    customStyles={customStyles}
                    expandableRowsComponent={expandedComponents}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay terceros para mostrar"
                    defaultSortFieldId={"Fecha"}
                    defaultSortAsc={false}
                    expandableIcon={expandableIcon}
                />
            </div>
        </>
    )
}

export default BuscarTerceros