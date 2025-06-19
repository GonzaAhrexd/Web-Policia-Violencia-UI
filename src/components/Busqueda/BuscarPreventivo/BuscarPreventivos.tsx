// Hooks
import { useState } from "react"
import { useForm } from "react-hook-form"
// Librerías React
import DataTable from "react-data-table-component"
// Contexto 
import { useAuth } from "../../../context/auth"
import { useCampos } from "../../../context/campos"
// Componentes
import InputDateRange from "../../InputComponents/InputDateRange"
import InputRegister from "../../InputComponents/InputRegister"
import SelectDivisionMunicipios from "../../Select/SelectDivisionMunicipios"
// BackEnd APIs
import { buscarPreventivo } from "../../../api/CRUD/preventivo.crud"
// Constantes
import { customStyles }  from "../../../GlobalConst/customStyles" 
// Iconos
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline'

import columnsPreventivos from "./columnsPreventivo"
import expandedComponent from "./expandedComponent"
import InputCheckbox from "../../InputComponents/InputCheckbox"
type ValoresBusqueda = {
    numero_nota: string
    id_preventivo: string
    desde: Date,
    hasta: Date,
    division: string
    unidad: string
    municipio: string
    comisaria: string
    mostrar_ampliaciones: boolean
}


function BuscarPreventivos() {

    const { register, handleSubmit, setValue, watch, formState: {
        errors
    } } = useForm()

    const { user } = useAuth()
    const { unidades: unidadCampos } = useCampos()
    const [preventivosLista, setPreventivosLista] = useState();
    const notaValue = watch('numero_nota');
    const idValue = watch("id_preventivo");
    // Comprueba si el número de expediente está vacío o no
    const isDateRangeRequired = !notaValue && !idValue;

    // Iconos para expandir
    const expandableIcon = {
        collapsed: <ArrowDownCircleIcon className='h-6 w-6' />,
        expanded: <ArrowUpCircleIcon className='h-6 w-6' />
    }


    return (
        <>
            <form className="w-full flex flex-col items-center"
                onSubmit={
                    handleSubmit(async (values: ValoresBusqueda) => {
                        if (values.unidad && user.rol != "agente") {
                            const unidadDividida = values.unidad.split(',')
                            values.division = unidadDividida[0]
                            values.municipio = unidadDividida[1]
                            values.comisaria = unidadDividida[2]
                        } else if (user.rol == "agente") {
                            values.division = user.unidad
                        }
                
                        const preventivosFound = await buscarPreventivo(values)
                        setPreventivosLista(preventivosFound)
                    }
                    )}>
                <InputDateRange register={register} setValue={setValue} isRequired={isDateRangeRequired} />
                <InputRegister busqueda={true} campo="ID" nombre="id_preventivo" register={register} type="text" error={errors.id_preventivo} require={false} />
                <InputRegister busqueda={true} campo="Número de nota" nombre="numero_nota" register={register} type="text" error={errors.numero_nota} require={false} />
                <InputCheckbox campo="Mostrar ampliaciones" nombre="mostrar_ampliaciones" register={register} setValue={setValue} id="mostrar_ampliaciones" />
                {user.rol != "agente" &&
                    <div className='flex flex-col xl:flex-row w-full items-center justify-center'>
                        <SelectDivisionMunicipios isRequired={false} campo="División, Municipio y Comisaría" nombre="division" opciones={unidadCampos} register={register} setValue={setValue} type="text" error={errors.division} />
                    </div>
                }
                <button className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10"> Buscar</button>
            </form>
              <div className="flex flex-col w-full">
                <h2 className='text-2xl my-5'>Preventivos</h2>
                <DataTable
                    // @ts-ignore
                    columns={columnsPreventivos}
                    data={preventivosLista}
                    pagination
                    expandableRows
                    expandableRowsComponent={expandedComponent}
                    customStyles={customStyles}
                    responsive={true}
                    striped={true}
                    highlightOnHover={true}
                    noDataComponent="No hay preventivos para mostrar"
                    defaultSortFieldId={"Fecha"}
                    expandableIcon={expandableIcon}
                />
            </div>
        </>
    )
}

export default BuscarPreventivos