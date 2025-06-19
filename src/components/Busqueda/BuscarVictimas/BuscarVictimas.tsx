// Componentes
import InputRegister from '../../InputComponents/InputRegister';
// Backend APIs
import { buscarVictima } from '../../../api/CRUD/victimas.crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';

//import { columnsVictima } from './columnsDataTable'
import expandedComponents from './expandedComponents'
import { customStyles } from '../../../GlobalConst/customStyles'

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import { columnsVictima } from './columnsDataTableVictima'

// Campos
function BuscarVictimas() {
    const [victimasMostrar, setVictimasMostrar] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState("");
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {

        const fetchVictimas = async () => {
            const result = await buscarVictima(values);
            setVictimasMostrar(result)
        }
        fetchVictimas();
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
                        setVictimasMostrar([])
                        if (!values.id_victima && !values.nombre_victima && !values.apellido_victima && !values.dni_victima && !values.numero_de_expediente) {
                            setMostrarAlerta("Rellene al menos un campo");
                            return;
                        }
                        setMostrarAlerta("");
                        handleBusqueda(values)
                    }

                    )}>
                {mostrarAlerta && <span className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5" role="alert"> {mostrarAlerta}</span>}
                <InputRegister busqueda={true} campo="ID" nombre="id_victima" register={register} require={false} type="text" error={errors.nombre} />
                <InputRegister busqueda={true} campo="Nombre" nombre="nombre_victima" register={register} require={false} type="text" error={errors.nombre} />
                <InputRegister busqueda={true} campo="Apellido" nombre="apellido_victima" register={register} require={false} type="text" error={errors.apellido} />
                <InputRegister busqueda={true} campo="DNI" nombre="dni_victima" register={register} require={false} type="text" error={errors.dni_victima} />
                <InputRegister campo="Número de expediente" nombre="numero_de_expediente" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>

            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Víctima</h2>
                <DataTable
                    columns={columnsVictima}
                    data={victimasMostrar}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay denuncias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    defaultSortAsc={false}
                    expandableIcon={expandableIcon}
                />
            </div>
        </>
    )
}

export default BuscarVictimas