// Componentes
import InputRegister from '../../InputComponents/InputRegister';
import InputDateRange from '../../InputComponents/InputDateRange';
// Backend APIs
import { buscarExposicion } from '../../../api/CRUD/exposicion.crud';
// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';
import { columnsDenuncia } from './columnsDataTableDenuncias'
import expandedComponents from './expandedComponents'
import { customStyles } from '../../../GlobalConst/customStyles'

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

function BuscarExposiciones() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState([]);
    const { register, handleSubmit, setValue, watch, formState: {
        errors
    } } = useForm()
    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarExposicion(values);
            setDenunciasAMostrar(result)
        }
        fetchDenuncias();
    }

    // Obtén el valor actual del número de expediente del formulario
    const idValue = watch("id_exposicion");
    const nombreValue = watch("nombre_victima");
    const apellidoValue = watch("apellido_victima");
    const dniValue = watch("dni_victima")
    // Comprueba si el número de expediente está vacío o no
    const isDateRangeRequired = !idValue && !nombreValue && !apellidoValue && !dniValue;


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
                        // Separa la unidad en division, municipio y comisaria siempre que tenga una , para separar, sino no
                        if (values.unidad) {
                            values.unidad = values.unidad.split(',')
                            values.municipio = values.unidad[1]
                            values.comisaria = values.unidad[2]
                        }
                        handleBusqueda(values)
                    }
                    )}>
                <InputDateRange register={register} setValue={setValue} isRequired={isDateRangeRequired} />
                <InputRegister busqueda campo="ID" nombre="id_exposicion" register={register} type="text" error={errors.id_denuncia} require={false}/>
                <InputRegister busqueda campo="Nombre víctima" nombre="nombre_victima" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                <InputRegister busqueda campo="Apellido víctima" nombre="apellido_victima" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                <InputRegister busqueda campo="DNI víctima" nombre="dni_victima" register={register} type="text" error={errors.numero_de_expediente} require={false}></InputRegister>
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Exposiciones</h2>
                <DataTable
                    columns={columnsDenuncia}
                    data={denunciasAMostrar}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponents}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay denuncias para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />
            </div>
        </>
    )
}

export default BuscarExposiciones