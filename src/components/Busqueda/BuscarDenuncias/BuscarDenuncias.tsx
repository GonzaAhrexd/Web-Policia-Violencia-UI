// Componentes
import InputText from '../../InputComponents/InputText';
import InputCheckbox from '../../InputComponents/InputCheckbox';
// import SelectDivisionMunicipios from '../../Select/SelectDivisionMunicipios';
import InputDateRange from '../../InputComponents/InputDateRange';
import Excel from './Excel';
import SelectRegisterSingle from '../../Select/SelectRegisterSingle';

// Backend APIs
import { buscarDenuncias } from '../../../api/CRUD/denuncias.crud';

// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import DataTable from 'react-data-table-component';
import { columnsDenuncia } from './columnsDataTableDenuncias'
import ExpandedComponentDenuncias from './ExpandedComponentDenuncias'
import { customStyles } from '../../../GlobalConst/customStyles'
import { useAuth } from '../../../context/auth';

// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

// Campos
import { useCampos } from '../../../context/campos';
// Tipos
import Denuncia from '../../../types/Denuncia';

type Filtros = {
    id_denuncia?: string;
    numero_de_expediente?: string;
    aprehension?: boolean;
    is_expediente_completo?: boolean;
    desde?: string;
    hasta?: string;
    relacion_victima_victimario?: string;
    unidad: string ;
    division?: string;
    municipio?: string;
    comisaria?: string;
}

function BuscarDenuncias() {
    const [denunciasAMostrar, setDenunciasAMostrar] = useState<Denuncia[]>([]);
    const { register, handleSubmit, setValue, watch, formState: {
        errors
    } } = useForm()

    const handleBusqueda = async (values: any) => {
        const fetchDenuncias = async () => {
            const result = await buscarDenuncias(values, true);
            setDenunciasAMostrar(result)
        }
        fetchDenuncias();
        setShowExcel(true);

    }
    // Obtén el valor actual del número de expediente del formulario
    const expedienteValue = watch('numero_de_expediente');
    const idValue = watch("id_denuncia");
    // Comprueba si el número de expediente está vacío o no
    const isDateRangeRequired = !expedienteValue && !idValue;
    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }

    const [showExcel, setShowExcel] = useState<Boolean>(false);
    const { unidades: unidadCampos, vinculo: vinculoCampos } = useCampos();
    const { user } = useAuth()
    const userDivisionZona: string[] = user.unidad.split(",")
    const [valuesGlobal, setValuesGlobal] = useState<Filtros>(null)

    return (
        <>       
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values: Filtros) => {
                        // Separa la unidad en division, municipio y comisaria siempre que tenga una , para separar, sino no
                        if (values.unidad && user.rol != "agente") {
                            const unidadSeparada = values.unidad.split(',')
                            values.municipio = unidadSeparada[1]
                            values.comisaria = unidadSeparada[2]
                        } else if (user.rol == "agente") {
                            values.division = userDivisionZona[0]
                            values.municipio = userDivisionZona[1]
                            values.comisaria = userDivisionZona[2]
                        }
                        handleBusqueda(values)
                        setValuesGlobal(values);
                    }
                    )}>
                <InputDateRange register={register} setValue={setValue} isRequired={isDateRangeRequired} />
                <InputText customSize="flex flex-col w-full xl:w-1/2" campo="ID" nombre="id_denuncia" register={register} error={errors.id_denuncia} require={false} />
                <InputText customSize='flex flex-col w-full xl:w-1/2' campo="Número de expediente" nombre="numero_de_expediente" register={register} error={errors.numero_de_expediente} require={false} />
                <div className='flex flex-col xl:flex-row w-full items-center justify-center'>
                    <SelectRegisterSingle isRequired={false} campo="Relación entre víctima y victimario" nombre="relacion_victima_victimario" opciones={vinculoCampos} setValue={setValue} error={errors.relacion_victima_victimario} />
                </div>
                {user.rol != "agente" &&
                    <div className='flex flex-col xl:flex-row w-full items-center justify-center'>
                        <SelectRegisterSingle selectDivisiones isRequired={false} campo="División, Municipio y Comisaría" nombre="division" opciones={unidadCampos} setValue={setValue} error={errors.division} />
                    </div>
                }
                <div>
                    <InputCheckbox campo="Aprehensión" nombre="aprehension" register={register} error={errors.aprehension} id="aprehension_busqueda" setValue={setValue} />
                    <InputCheckbox campo="Falta rellenar el expediente" nombre="is_expediente_completo" register={register} error={errors.is_expediente_completo} id="is_expediente_completo" setValue={setValue} />
                </div>
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
            <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Denuncias</h2>
                <div className="w-full flex flex-col items-center my-2">
                    {showExcel &&
                        <Excel filtros={valuesGlobal} />
                    }
                </div>
                <div className="overflow-x-auto">
                    <DataTable
                        columns={columnsDenuncia}
                        data={denunciasAMostrar}
                        pagination
                        expandableRows
                        expandableRowsComponent={ExpandedComponentDenuncias}
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
            </div>
        </>
    )
}

export default BuscarDenuncias