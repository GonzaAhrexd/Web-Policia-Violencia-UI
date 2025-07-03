// Hooks
import { useEffect, useState } from 'react';
//Componentes
import InputRegister from '../InputComponents/InputRegister';
import InputCheckbox from '../InputComponents/InputCheckbox';
import InputRadio from '../InputComponents/InputRadio';
import InputNumber from '../InputComponents/InputNumber';
import SelectRegisterSingle from '../Select/SelectRegisterSingle';
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos';
import { generos } from '../../GlobalConst/generosCampos';
// Contexto
import { useCampos } from '../../context/campos';

interface FormularioVictimaProps {
  datos: any;
  register: any;
  setValue: any;
  errors: any;
  watch: any;
  verificar?: boolean; // Nuevo prop para diferenciar el comportamiento
  // Props adicionales para compatibilidad con EditVictima si verificar es false
  md?: boolean;
  vinculo_con_agresor?: any;
  convivencia?: any;
  dependencia_economica?: any;
  hijos_con_agresor?: any;
  existente?: boolean;
  cantidad_hijos_con_agresor?: string;
  condicion_de_vulnerabilidad?: boolean; // Este prop es redundante con datos.condicion_de_vulnerabilidad, se podría unificar.
  onlyVictima?: boolean;
}

function EditVictima({ datos, register, setValue, errors, watch, verificar = false, md, vinculo_con_agresor, convivencia, dependencia_economica, hijos_con_agresor, existente, cantidad_hijos_con_agresor, onlyVictima }: FormularioVictimaProps) {
  // Estados
  // Se inicializan con los valores de 'datos' o valores por defecto para 'verificar'
  const [isHijos, setIsHijos] = useState(verificar ? false : datos?.hijos?.tiene_hijos);
  const [isHijosConAgresor, setIsHijosConAgresor] = useState(verificar ? (datos.hijos ? datos.hijos.hijos_con_el_agresor > 0 : false) : (hijos_con_agresor ? hijos_con_agresor > 0 : false));
  const [isCondicionVulnerabilidad, setIsCondicionVulnerabilidad] = useState(verificar ? false : datos?.condicion_de_vulnerabilidad);
  const [isAdultoMayor, setIsAdultoMayor] = useState(verificar ? false : datos?.condiciones_de_vulnerabilidad?.adulto_mayor);
  const [isMenorEdad, setIsMenorEdad] = useState(verificar ? false : datos?.condiciones_de_vulnerabilidad?.menor_de_edad);

  const { ocupaciones, vinculo } = useCampos();

  // Opciones para InputRadio
  const opcionesCondicionDeVulnerabilidad = [
    { nombre: 'Sí', value: 'si', id: 'si_asistida' },
    { nombre: 'No', value: 'no', id: 'no_asistida' },
  ];
  const opcionesConvivencia = [
    { nombre: 'Sí', value: 'si', id: 'si_convivencia' },
    { nombre: 'No', value: 'no', id: 'no_convivencia' },
  ];
  const opcionesHijos = [
    { nombre: 'Sí', value: 'si', id: 'si_hijos' },
    { nombre: 'No', value: 'no', id: 'no_hijos' },
  ];
  const opcionesDependenciaEconomica = [
    { nombre: 'Sí', value: 'si', id: 'si_dependencia_economica' },
    { nombre: 'No', value: 'no', id: 'no_dependencia_economica' },
  ];

  // Efecto para actualizar estados cuando cambian los datos (similar a EditVictima)
  useEffect(() => {
    // Si estamos en modo edición (verificar es false), actualizamos los estados
    if (!verificar) {
      setTimeout(() => {
        setIsHijos(datos?.hijos?.tiene_hijos);
        setIsHijosConAgresor(hijos_con_agresor ? hijos_con_agresor > 0 : false);
        setIsCondicionVulnerabilidad(datos?.condicion_de_vulnerabilidad);
        setIsAdultoMayor(datos?.condiciones_de_vulnerabilidad?.adulto_mayor);
        setIsMenorEdad(datos?.condiciones_de_vulnerabilidad?.menor_de_edad);
      }, 200);
    }
  }, [datos, verificar, hijos_con_agresor]);

  return (
    <div key={!verificar ? datos._id : undefined} className={`w-full ${ md ? 'lg:w-6/10' : ''}`}>
      {!verificar && !existente && <h1 className='text-2xl my-5'>Víctima</h1>}
      {!verificar && <InputRegister campo='' nombre='victima_id' register={register} setValue={setValue} type='hidden' error={errors.nombre_victima} valor={datos._id} />}

      <div className='flex flex-col md:flex-row my-2'>
        <InputRegister campo='Nombre' nombre='nombre_victima' register={register} setValue={setValue} type='text' error={errors.nombre_victima} valor={datos.nombre} require={verificar ? true : false} />
        <InputRegister campo='Apellido' nombre='apellido_victima' register={register} setValue={setValue} type='text' error={errors.apellido_victima} valor={datos.apellido} require={verificar ? true : false} />
        <SelectRegisterSingle campo='Género' nombre='genero_victima' opciones={generos} setValue={setValue} error={errors.genero_victima} valor={datos.genero} isRequired={false} />
      </div>
      <div className='flex flex-col md:flex-row my-2'>
        <InputNumber require={verificar ? true : false} campo='Edad' nombre='edad_victima' register={register} setValue={setValue} type='text' error={errors.edad_victima} valor={verificar ? datos.edad : (datos.edad != null ? datos.edad : '')} maxLenght={2} />
        <InputNumber require={verificar ? true : false} campo='DNI' nombre='dni_victima' register={register} setValue={setValue} type='text' error={errors.dni_victima} valor={verificar ? datos.DNI : (datos.DNI != 'S/N' ? datos.DNI : '')} maxLenght={8} />
        <InputRegister require={verificar ? true : false} campo='Domicilio' nombre='direccion_victima' register={register} setValue={setValue} type='text' error={errors.direccion_victima} valor={verificar ? datos.direccion : (datos.direccion != '' ? datos.direccion : ' ')} />
      </div>
      <div className='flex flex-col xl:flex-row my-2'>
        <SelectRegisterSingle valor={datos.estado_civil} campo='Estado Civil' nombre='estado_civil_victima' opciones={estadoCivil} setValue={setValue} error={errors.estado_civil_victima} isRequired={false} />
        <SelectRegisterSingle valor={datos.ocupacion} campo='Ocupación' nombre='ocupacion_victima' opciones={ocupaciones} setValue={setValue} error={errors.ocupacion_victima} isRequired={false} />
        {/* Lógica para Vínculo con el Agresor */}
        {verificar && <SelectRegisterSingle valor={datos.vinculo_con_agresor} campo='Vínculo con el Agresor' nombre='vinculo_con_agresor_victima' opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} isRequired={false} />}
        {!verificar && existente && <SelectRegisterSingle campo='Vínculo con el Agresor' nombre='vinculo_con_agresor_victima' opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} isRequired={false} />}
        {!verificar && !existente && vinculo_con_agresor && <SelectRegisterSingle valor={vinculo_con_agresor} campo='Vínculo con el Agresor' nombre='vinculo_con_agresor_victima' opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} isRequired={false} />}
      </div>

      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>Condición de vulnerabilidad</span>
        <InputRadio
          key={!verificar ? datos._id : 'condicion_vulnerabilidad'}
          watch={watch}
          handleChange={setIsCondicionVulnerabilidad}
          campo='condicion_de_vulnerabilidad'
          nombre='condicion_de_vulnerabilidad'
          register={register}
          type='radio'
          opciones={opcionesCondicionDeVulnerabilidad}
          defaultValue={verificar ? (datos.condicion_de_vulnerabilidad ? 0 : 1) : (isCondicionVulnerabilidad ? 0 : 1)}
        />
        {isCondicionVulnerabilidad && (
          <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0 border-slate-500 md:bg-white rounded-md`}>
            <InputCheckbox campo='Embarazo' nombre='embarazo' register={register} setValue={setValue} error={errors.dependencia_economica} id='dependencia_economica' state={verificar ? datos.embarazo : datos.condiciones_de_vulnerabilidad.embarazo} />
            <InputCheckbox campo='Periodo Post-parto' nombre='periodo_post_parto' register={register} setValue={setValue} error={errors.periodo_post_parto} id='periodo_post_parto' state={verificar ? datos.periodo_post_parto : datos.condiciones_de_vulnerabilidad.periodo_post_parto} />
            <InputCheckbox campo='Periodo de lactancia' nombre='periodo_de_lactancia' register={register} setValue={setValue} error={errors.periodo_de_lactancia} id='periodo_de_lactancia' state={verificar ? datos.periodo_de_lactancia : datos.condiciones_de_vulnerabilidad.periodo_de_lactancia} />
            <InputCheckbox campo='Discapacidad' nombre='discapacidad' register={register} setValue={setValue} error={errors.discapacidad} id='discapacidad' state={verificar ? datos.discapacidad : datos.condiciones_de_vulnerabilidad.discapacidad} />
            <InputCheckbox campo='Enfermedad Crónica' nombre='enfermedad_cronica' register={register} setValue={setValue} error={errors.enfermedad_cronica} id='enfermedad_cronica' state={verificar ? datos.enfermedad_cronica : datos.condiciones_de_vulnerabilidad.enfermedad_cronica} />
            <InputCheckbox setHook={setIsAdultoMayor} disabled={isMenorEdad} campo='Adulto mayor' nombre='adulto_mayor' register={register} setValue={setValue} error={errors.adulto_mayor} id='adulto_mayor' state={verificar ? datos.adulto_mayor : datos.condiciones_de_vulnerabilidad.adulto_mayor} />
            <InputCheckbox setHook={setIsMenorEdad} disabled={isAdultoMayor} campo='Menor de edad' nombre='menor_de_edad' register={register} setValue={setValue} error={errors.menor_de_edad} id='menor_de_edad' state={verificar ? datos.menor_de_edad : datos.condiciones_de_vulnerabilidad.menor_de_edad} />
            <InputCheckbox campo='Tratamiento psicológico' nombre='tratamiento_psicologico' register={register} setValue={setValue} error={errors.tratamiento_psicologico} id='tratamiento_psicologico' state={verificar ? datos.tratamiento_psicologico : datos.condiciones_de_vulnerabilidad.tratamiento_psicologico} />
          </div>
        )}
      </div>

      {/* Secciones condicionales basadas en `onlyVictima` */}
      {(!onlyVictima || verificar) && ( 
        <>
          <div className='flex flex-col my-2'>
            <span className='ml-4 font-medium'>¿Comparten vivienda?</span>
            <InputRadio campo='convivencia' nombre='convivencia' register={register} type='radio' opciones={opcionesConvivencia} defaultValue={verificar ? (datos.convivencia ? 0 : 1) : (convivencia ? 0 : 1)} />
          </div>
          <div className='flex flex-col my-2'>
            <span className='ml-4 font-medium'>¿Hay Dependencia económica?</span>
            <InputRadio campo='dependencia_economica' nombre='dependencia_economica' register={register} type='radio' opciones={opcionesDependenciaEconomica} defaultValue={verificar ? (datos.dependencia_economica ? 0 : 1) : (dependencia_economica ? 0 : 1)} />
          </div>
        </>
      )}

      <div className='flex flex-col my-2'>
        <span className='ml-4 font-medium'>Hijos</span>
        <InputRadio
          key={!verificar ? datos._id : 'hijos'}
          watch={watch}
          handleChange={setIsHijos}
          campo='hijos'
          nombre='hijos'
          register={register}
          type='radio'
          opciones={opcionesHijos}
          defaultValue={verificar ? (datos.hijos?.tiene_hijos ? 0 : 1) : (datos?.hijos?.tiene_hijos ? 0 : 1)}
        />
      </div>
      {isHijos && (
        <div className='bg-slate-100 border-2 md:border-0 border-slate-500 md:bg-white rounded-md'>
          <div className={`grid grid-cols-1 md:grid-cols-3 my-2`}>
            <InputCheckbox campo='Mayores de 18' nombre='mayor_de_18' register={register} setValue={setValue} error={errors.mayor_de_18} id='mayores18' state={verificar ? datos.hijos?.mayores_de_edad : datos?.hijos?.mayores_de_edad} />
            <InputCheckbox campo='Menores de 18' nombre='menor_de_18' register={register} setValue={setValue} error={errors.menor_de_18} id='menores18' state={verificar ? datos.hijos?.menores_de_edad : datos?.hijos?.menores_de_edad} />
            <InputCheckbox campo='Menores discapacitados' nombre='menores_discapacitados' register={register} setValue={setValue} error={errors.menores_discapacitados} id='menoresDiscapacitados' state={verificar ? datos.hijos?.menores_discapacitados : datos?.hijos?.menores_discapacitados} />
            <InputCheckbox campo='Hijos con el agresor' nombre='hijos_con_agresor' register={register} setValue={setValue} error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id='hijosConElAgresor' />
          </div>
          <div>
            {isHijosConAgresor && (
              <InputNumber
                campo='Cantidad'
                nombre='cantidad_hijos_con_agresor'
                register={register}
                setValue={setValue}
                type='text'
                error={errors.cantidad_hijos_con_agresor}
                maxLenght={2}
                valor={verificar ? (datos.hijos?.hijos_con_el_agresor || '') : (cantidad_hijos_con_agresor || '')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EditVictima;