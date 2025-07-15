/*
 Uso del componente:
    EditVictima recibe los datos de las victimas para ser mostrados y editados en el formulario
    de la sección de victima.
    Este componente es utilizado en editSection.
*/
// Hooks
import { useEffect, useState } from 'react'
//Componentes
import InputRegister from '../InputComponents/InputRegister'
import InputCheckbox from '../InputComponents/InputCheckbox'
import InputNumber from '../InputComponents/InputNumber'
import InputRadio from '../InputComponents/InputRadio'
import SelectRegisterSingle from '../Select/SelectRegisterSingle'
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos'
import { generos } from '../../GlobalConst/generosCampos'
// Contexto
import { useCampos } from '../../context/campos'
import { useStore } from '../../pages/CargarDenuncias/store'

type DatosVictima = {
    _id: string;
    nombre: string;
    apellido: string;
    genero: string;
    edad: number;
    DNI: string;
    estado_civil: string;
    ocupacion: string;
    direccion: string;
    condicion_de_vulnerabilidad: boolean;
    condiciones_de_vulnerabilidad: {
        embarazo: boolean;
        periodo_post_parto: boolean;
        periodo_de_lactancia: boolean;
        discapacidad: boolean;
        enfermedad_cronica: boolean;
        adulto_mayor: boolean;
        menor_de_edad: boolean;
        tratamiento_psicologico: boolean;
        dependencia_economica: boolean;
    };
    hijos: {
        tiene_hijos: boolean;
        dependencia_economica: boolean;
        mayores_de_edad: boolean;
        menores_de_edad: boolean;
        menores_discapacitados: boolean;
    },
    denuncias_realizadas: string[];
}

// Props
type CargarVictimaProps = {
    datos: DatosVictima;
    register: any;
    setValue: any;
    errors: any;
    md?: any;
    vinculo_con_agresor?: any;
    hijos_con_agresor?: any;
    existente?: any;
    variante?: any;
    editarConDenuncia?: any;
    cantidad_hijos_con_agresor?: string;
    condicion_de_vulnerabilidad?: boolean,
    watch: any;
}

function EditVictimaExistente({datos, register, setValue, errors, watch, editarConDenuncia, existente, hijos_con_agresor, cantidad_hijos_con_agresor, vinculo_con_agresor, md }: CargarVictimaProps) {

    const { victimaCargar } = useStore()
    
    // Estados
    const [isHijos, setIsHijos] = useState(victimaCargar.tiene_hijos)
    const [isHijosConAgresor, setIsHijosConAgresor] = useState(hijos_con_agresor ? hijos_con_agresor > 0 : false)
    const [isCondicionVulnerabilidad, setIsCondicionVulnerabilidad] = useState(victimaCargar.condicion_de_vulnerabilidad) // Para mostrar o no el campo de condición de vulnerabilidad si es seleccionado el checkbox condición de vulnerabilidad
    const [isAdultoMayor, setIsAdultoMayor] = useState(victimaCargar.condiciones_de_vulnerabilidad.adulto_mayor) // Para mostrar o no el campo de adulto mayor si es seleccionado el checkbox adulto mayor
    const [isMenorEdad, setIsMenorEdad] = useState(victimaCargar.condiciones_de_vulnerabilidad?.menor_de_edad) // Para mostrar o no el campo de menor de edad si es seleccionado el checkbox menor de edad


    const { ocupaciones, vinculo } = useCampos();

    // Actualiza de los state con los datos usando un useEffect, pero que de un timeout para darle tiempo de actualizar los datos
    useEffect(() => {
        setTimeout(() => {
            setIsHijos(datos.hijos.tiene_hijos)
            setIsHijosConAgresor(hijos_con_agresor ? hijos_con_agresor > 0 : false)
            setIsCondicionVulnerabilidad(datos.condicion_de_vulnerabilidad)
            setIsAdultoMayor(datos.condiciones_de_vulnerabilidad.adulto_mayor)
            setIsMenorEdad(datos.condiciones_de_vulnerabilidad.menor_de_edad)
        }, 200)

    }, [datos])
    // Opciones condición de vulnerabilidad
    const opcionesCondicionDeVulnerabilidad = [
        { nombre: 'Sí', value: 'si', id: "si_asistida" },
        { nombre: 'No', value: 'no', id: "no_asistida" },
    ]
    // Opciones convivencia
    const opcionesConvivencia = [
        { nombre: 'Sí', value: 'si', id: "si_convivencia" },
        { nombre: 'No', value: 'no', id: "no_convivencia" },
    ]
    // Opciones hijos
    const opcionesHijos = [
        { nombre: 'Sí', value: 'si', id: "si_hijos" },
        { nombre: 'No', value: 'no', id: "no_hijos" },
    ]

    const opcionesDependenciaEconomica = [
        { nombre: 'Sí', value: 'si', id: "si_dependencia_economica" },
        { nombre: 'No', value: 'no', id: "no_dependencia_economica" },
    ]
    return (
        <div key={datos._id} className={`w-full ${md && "lg:w-6/10"}`}>
            {!existente && <h1 className='text-2xl my-5'>Víctima</h1>}
            <InputRegister campo="" nombre="victima_id" register={register} setValue={setValue} hidden error={errors.nombre_victima} valor={datos._id} />
            <div className='flex flex-col md:flex-row my-2'>
                <InputRegister campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} error={errors.nombre_victima} valor={datos.nombre} />
                <InputRegister campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} error={errors.apellido_victima} valor={datos.apellido} />
                <SelectRegisterSingle campo="Género" nombre="genero_victima" opciones={generos} setValue={setValue} error={errors.genero_victima} valor={datos.genero} isRequired={false}/>

            </div>
            <div className='flex flex-col md:flex-row my-2'>
                <InputNumber require={false} campo="Edad" nombre="edad_victima" register={register} setValue={setValue} error={errors.edad_victima} valor={datos.edad != null ? datos.edad : ""} maxLenght={2} />
                <InputNumber require={false} campo="DNI" nombre="dni_victima" register={register} setValue={setValue} error={errors.dni_victima} valor={datos.DNI != "S/N" ? datos.DNI : ""} maxLenght={8} />
                <InputRegister require={false} campo="Domicilio" nombre="direccion_victima" register={register} setValue={setValue} error={errors.direccion_victima} valor={datos.direccion != "" ? datos.direccion : " "} />
            </div>
            <div className='flex flex-col xl:flex-row my-2'>
                <SelectRegisterSingle valor={datos.estado_civil} campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} setValue={setValue} error={errors.estado_civil_victima} isRequired={false} />
                <SelectRegisterSingle valor={datos.ocupacion} campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} setValue={setValue} error={errors.ocupacion_victima} isRequired={false} />
                <SelectRegisterSingle valor={existente ? undefined : vinculo_con_agresor} campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} isRequired={false}/>
            </div>

            <div className='flex flex-col my-2'>
                <span className='ml-4 font-medium'>Condición de vulnerabilidad</span>
                <InputRadio key={datos._id} watch={watch} handleChange={setIsCondicionVulnerabilidad} campo="condicion_de_vulnerabilidad" nombre="condicion_de_vulnerabilidad" register={register} type="radio" opciones={opcionesCondicionDeVulnerabilidad} defaultValue={isCondicionVulnerabilidad ? 0 : 1} />
                {isCondicionVulnerabilidad &&
                    <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md`}>
                        <InputCheckbox campo="Embarazo" nombre="embarazo" register={register} setValue={setValue} error={errors.dependencia_economica} id="dependencia_economica" state={datos.condiciones_de_vulnerabilidad.dependencia_economica} />
                        <InputCheckbox campo="Periodo Post-parto" nombre="periodo_post_parto" register={register} setValue={setValue} error={errors.periodo_post_parto} id="periodo_post_parto" state={datos.condiciones_de_vulnerabilidad.periodo_post_parto} />
                        <InputCheckbox campo="Periodo de lactancia" nombre="periodo_de_lactancia" register={register} setValue={setValue} error={errors.periodo_de_lactancia} id="periodo_de_lactancia" state={datos.condiciones_de_vulnerabilidad.periodo_de_lactancia} />
                        <InputCheckbox campo="Discapacidad" nombre="discapacidad" register={register} setValue={setValue} error={errors.discapacidad} id="discapacidad" state={datos.condiciones_de_vulnerabilidad.discapacidad} />
                        <InputCheckbox campo="Enfermedad Crónica" nombre="enfermedad_cronica" register={register} setValue={setValue} error={errors.enfermedad_cronica} id="enfermedad_cronica" state={datos.condiciones_de_vulnerabilidad.enfermedad_cronica} />
                        <InputCheckbox setHook={setIsAdultoMayor} disabled={isMenorEdad} campo="Adulto mayor" nombre="adulto_mayor" register={register} setValue={setValue} error={errors.adulto_mayor} id="adulto_mayor" state={datos.condiciones_de_vulnerabilidad.adulto_mayor} />
                        <InputCheckbox setHook={setIsMenorEdad} disabled={isAdultoMayor} campo="Menor de edad" nombre="menor_de_edad" register={register} setValue={setValue} error={errors.menor_de_edad} id="menor_de_edad" state={datos.condiciones_de_vulnerabilidad.menor_de_edad} />
                        <InputCheckbox campo="Tratamiento psicológico" nombre="tratamiento_psicologico" register={register} setValue={setValue} error={errors.tratamiento_psicologico} id="tratamiento_psicologico" state={datos.condiciones_de_vulnerabilidad.tratamiento_psicologico} />
                    </div>
                }
            </div>
            <div className='flex flex-col my-2'>
                <span className='ml-4 font-medium'>¿Comparten vivienda?</span>
                <InputRadio campo="convivencia" nombre="convivencia" register={register} type="radio" opciones={opcionesConvivencia} defaultValue={1} />
            </div>
            <div className='flex flex-col my-2'>
                <span className='ml-4 font-medium'>¿Hay Dependencia económica?</span>
                <InputRadio campo="dependencia_economica" nombre="dependencia_economica" register={register} type="radio" opciones={opcionesDependenciaEconomica} defaultValue={1} />
            </div>
            <div className='flex flex-col my-2'>
                <span className='ml-4 font-medium'>Hijos</span>
                <InputRadio key={datos._id} watch={watch} handleChange={setIsHijos} campo="hijos" nombre="hijos" register={register} type="radio" opciones={opcionesHijos} defaultValue={datos.hijos.tiene_hijos ? 0 : 1} />
            </div>
            {isHijos &&
                <div className='bg-slate-100 border-2 md:border-0  border-slate-500 md:bg-white rounded-md'>
                    <div className={`grid grid-cols-1 md:grid-cols-3 my-2`}>
                        <InputCheckbox campo="Dependencia económica" nombre="dependencia_economica" register={register} setValue={setValue} error={errors.dependencia_economica} id="dependenciaEconomica" state={datos.hijos.dependencia_economica} />
                        <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue} error={errors.mayor_de_18} id="mayores18" state={datos.hijos.mayores_de_edad} />
                        <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue} error={errors.menor_de_18} id="menores18" state={datos.hijos.menores_de_edad} />
                        <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue} error={errors.menores_discapacitados} id="menoresDiscapacitados" state={datos.hijos.menores_discapacitados} />
                        {existente && <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />}
                        {editarConDenuncia && <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor" />}
                    </div>
                    <div>
                        {(isHijosConAgresor && existente) && <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue}  error={errors.cantidad_hijos_con_agresor} maxLenght={2} />}
                        {(isHijosConAgresor && editarConDenuncia) && <InputNumber valor={cantidad_hijos_con_agresor} campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue}  error={errors.cantidad_hijos_con_agresor} maxLenght={2} />}
                    </div>
                </div>
            }
        </div>
    )
}

export default EditVictimaExistente