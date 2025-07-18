// Componentes
import InputText from '../../InputComponents/InputText';
// Backend APIs
import { buscarVictimario } from '../../../api/CRUD/victimario.crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';
// Dependencias de esta carpeta
import { columnVictimario } from './columnsDataTableVictimario'
import expandedComponents from './expandedComponents'
import { customStyles } from '../../../GlobalConst/customStyles'
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'
// Campos
function BuscarVictimario() {
    const [victimarioMostrar, setVictimarioMostrar] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState("");
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarVictimario(values);
            setVictimarioMostrar(result)
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
                        if (!values.id_victimario && !values.nombre_victimario && !values.apellido_victimario && !values.dni_victimario && !values.numero_de_expediente) {
                            setVictimarioMostrar([])
                            setMostrarAlerta("Rellene al menos un campo");
                            return;
                        }
                        setMostrarAlerta("");
                        handleBusqueda(values)
                    }
                    )}>
                {mostrarAlerta && <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert"> {mostrarAlerta}</span>}
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="ID" nombre="id_victimario" register={register} require={false} error={errors.id_victimario} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="Nombre" nombre="nombre_victimario" register={register} require={false} error={errors.nombre} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="Apellido" nombre="apellido_victimario" register={register} require={false} error={errors.apellido} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="DNI" nombre="dni_victimario" register={register} require={false} error={errors.dni_victima} />
                <InputText campo="Número de expediente" nombre="numero_de_expediente" register={register} require={false} error={errors.numero_de_expediente} customSize='flex flex-col w-full xl:w-1/2' />

                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Victimario</h2>
                <DataTable
                    columns={columnVictimario}
                    data={victimarioMostrar}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay victimarios para mostrar"
                    defaultSortFieldId={"Fecha"}
                    defaultSortAsc={false}
                    expandableIcon={expandableIcon}
                />
            </div>
        </>
    )
}

export default BuscarVictimario