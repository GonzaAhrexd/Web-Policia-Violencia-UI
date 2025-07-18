// Hooks
import { useEffect, useState } from 'react';
// Componentes
import InputText from '../InputComponents/InputText';
import InputCheckbox from '../InputComponents/InputCheckbox';
import InputRadio from '../InputComponents/InputRadio';
import InputNumber from '../InputComponents/InputNumber';
import SelectRegisterSingle from '../Select/SelectRegisterSingle';
// Campos
import { estadoCivil } from '../../GlobalConst/estadoCivilCampos';
import { generos } from '../../GlobalConst/generosCampos';
// Contexto
import { useCampos } from '../../context/campos';
import { useStore } from '../../pages/CargarDenuncias/store';
// Tipos
import Victima from '../../types/Victimas';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type FormularioVictimaProps = {
  datos: Victima;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  verificar?: boolean; // Diferencia comportamiento entre verificar y edición
  existente?: boolean; // Indica si la víctima ya existe
  editarConDenuncia?: boolean; // Indica si se edita con denuncia
  md?: boolean; // Controla el ancho del contenedor
  vinculo_con_agresor?: any;
  convivencia?: any;
  dependencia_economica?: any;
  hijos_con_agresor?: any;
  cantidad_hijos_con_agresor?: number | string;
  onlyVictima?: boolean; // Mostrar solo datos de la víctima
}

type OpcionesRadio = {
  nombre: string;
  value: string;
  id?: string;
};

function EditVictima({ datos, register, setValue, watch, errors, verificar = false, existente = false, editarConDenuncia = false, md = false, vinculo_con_agresor, convivencia, dependencia_economica, hijos_con_agresor, cantidad_hijos_con_agresor, onlyVictima = false }: FormularioVictimaProps) {
  // Estados
  const [isHijos, setIsHijos] = useState<boolean>(verificar ? false : datos?.hijos?.tiene_hijos || false);
  const [isHijosConAgresor, setIsHijosConAgresor] = useState<boolean>(hijos_con_agresor ? hijos_con_agresor > 0 : false);
  const [isCondicionVulnerabilidad, setIsCondicionVulnerabilidad] = useState<boolean>(verificar ? false : datos?.condicion_de_vulnerabilidad || false);
  const [isAdultoMayor, setIsAdultoMayor] = useState<boolean>(verificar ? false : datos?.condiciones_de_vulnerabilidad?.adulto_mayor || false);
  const [isMenorEdad, setIsMenorEdad] = useState<boolean>(verificar ? false : datos?.condiciones_de_vulnerabilidad?.menor_de_edad || false);

  const { ocupaciones, vinculo } = useCampos();
  const { victimaCargar } = useStore();

  // Opciones para InputRadio
  const opcionesCondicionDeVulnerabilidad: OpcionesRadio[] = [
    { nombre: 'Sí', value: 'si', id: 'si_asistida' },
    { nombre: 'No', value: 'no', id: 'no_asistida' },
  ];
  const opcionesConvivencia: OpcionesRadio[] = [
    { nombre: 'Sí', value: 'si', id: 'si_convivencia' },
    { nombre: 'No', value: 'no', id: 'no_convivencia' },
  ];
  const opcionesHijos: OpcionesRadio[] = [
    { nombre: 'Sí', value: 'si', id: 'si_hijos' },
    { nombre: 'No', value: 'no', id: 'no_hijos' },
  ];
  const opcionesDependenciaEconomica: OpcionesRadio[] = [
    { nombre: 'Sí', value: 'si', id: 'si_dependencia_economica' },
    { nombre: 'No', value: 'no', id: 'no_dependencia_economica' },
  ];

  // Efecto para actualizar estados
  useEffect(() => {
    setTimeout(() => {
      if (existente || editarConDenuncia) {
        setIsHijos(victimaCargar.tiene_hijos || datos.hijos?.tiene_hijos || false);
        setIsCondicionVulnerabilidad(
          victimaCargar.condicion_de_vulnerabilidad || datos.condicion_de_vulnerabilidad || false
        );
        setIsAdultoMayor(
          victimaCargar.condiciones_de_vulnerabilidad?.adulto_mayor ||
            datos.condiciones_de_vulnerabilidad?.adulto_mayor || false
        );
        setIsMenorEdad(
          victimaCargar.condiciones_de_vulnerabilidad?.menor_de_edad ||
            datos.condiciones_de_vulnerabilidad?.menor_de_edad || false
        );
      } else {
        setIsHijos(datos?.hijos?.tiene_hijos || false);
        setIsCondicionVulnerabilidad(datos?.condicion_de_vulnerabilidad || false);
        setIsAdultoMayor(datos?.condiciones_de_vulnerabilidad?.adulto_mayor || false);
        setIsMenorEdad(datos?.condiciones_de_vulnerabilidad?.menor_de_edad || false);
      }
      setIsHijosConAgresor(hijos_con_agresor ? hijos_con_agresor > 0 : false);
    }, 200);
  }, [datos, victimaCargar, verificar, existente, editarConDenuncia, hijos_con_agresor]);

  return (
    <div key={datos._id} className={`w-full ${md ? 'lg:w-6/10' : ''}`}>
      {!(verificar || existente) && <h1 className="text-2xl my-5">Víctima</h1>}
      <InputText campo="" nombre="victima_id" register={register} setValue={setValue} hidden error={errors.nombre_victima} valor={datos._id}
      />

      <div className="flex flex-col md:flex-row my-2">
        <InputText campo="Nombre" nombre="nombre_victima" register={register} setValue={setValue} error={errors.nombre_victima} valor={datos.nombre} require={verificar}
        />
        <InputText campo="Apellido" nombre="apellido_victima" register={register} setValue={setValue} error={errors.apellido_victima} valor={datos.apellido} require={verificar}
        />
        <SelectRegisterSingle campo="Género" nombre="genero_victima" opciones={generos} setValue={setValue} error={errors.genero_victima} valor={datos.genero} isRequired={false}
        />
      </div>

      <div className="flex flex-col md:flex-row my-2">
        <InputNumber require={verificar} campo="Edad" nombre="edad_victima" register={register} setValue={setValue} error={errors.edad_victima} valor={verificar ? datos.edad : datos.edad != null ? datos.edad : ''} maxLenght={2}
        />
        <InputNumber require={verificar} campo="DNI" nombre="dni_victima" register={register} setValue={setValue} error={errors.dni_victima} valor={verificar ? datos.DNI : datos.DNI !== 'S/N' ? datos.DNI : ''} maxLenght={8}
        />
        <InputText require={verificar} campo="Domicilio" nombre="direccion_victima" register={register} setValue={setValue} error={errors.direccion_victima} valor={verificar ? datos.direccion : datos.direccion !== '' ? datos.direccion : ' '}
        />
      </div>

      <div className="flex flex-col xl:flex-row my-2">
        <SelectRegisterSingle valor={datos.estado_civil} campo="Estado Civil" nombre="estado_civil_victima" opciones={estadoCivil} setValue={setValue} error={errors.estado_civil_victima} isRequired={false}
        />
        <SelectRegisterSingle valor={datos.ocupacion} campo="Ocupación" nombre="ocupacion_victima" opciones={ocupaciones} setValue={setValue} error={errors.ocupacion_victima} isRequired={false}
        />
        {(!onlyVictima || verificar) && (
          <SelectRegisterSingle valor={existente ? undefined : vinculo_con_agresor} campo="Vínculo con el Agresor" nombre="vinculo_con_agresor_victima" opciones={vinculo} setValue={setValue} error={errors.vinculo_con_agresor_victima} isRequired={false}
          />
        )}
      </div>

      <div className="flex flex-col my-2">
        <span className="ml-4 font-medium">Condición de vulnerabilidad</span>
        <InputRadio key={datos._id} watch={watch} handleChange={setIsCondicionVulnerabilidad} campo="condicion_de_vulnerabilidad" nombre="condicion_de_vulnerabilidad" register={register} opciones={opcionesCondicionDeVulnerabilidad} defaultValue={isCondicionVulnerabilidad ? 0 : 1}/>
        {isCondicionVulnerabilidad && (
          <div className={`grid grid-cols-1 md:grid-cols-3 my-2 bg-slate-100 border-2 md:border-0 border-slate-500 md:bg-white rounded-md`}>
            <InputCheckbox campo="Embarazo" nombre="embarazo" register={register} setValue={setValue} error={errors.embarazo} id="embarazo" state={datos.condiciones_de_vulnerabilidad?.embarazo}/>
            <InputCheckbox campo="Periodo Post-parto" nombre="periodo_post_parto" register={register} setValue={setValue} error={errors.periodo_post_parto} id="periodo_post_parto" state={datos.condiciones_de_vulnerabilidad?.periodo_post_parto}/>
            <InputCheckbox campo="Periodo de lactancia" nombre="periodo_de_lactancia" register={register} setValue={setValue} error={errors.periodo_de_lactancia} id="periodo_de_lactancia" state={datos.condiciones_de_vulnerabilidad?.periodo_de_lactancia}/>
            <InputCheckbox campo="Discapacidad" nombre="discapacidad" register={register} setValue={setValue} error={errors.discapacidad} id="discapacidad" state={datos.condiciones_de_vulnerabilidad?.discapacidad}/>
            <InputCheckbox campo="Enfermedad Crónica" nombre="enfermedad_cronica" register={register} setValue={setValue} error={errors.enfermedad_cronica} id="enfermedad_cronica" state={datos.condiciones_de_vulnerabilidad?.enfermedad_cronica}/>
            <InputCheckbox setHook={setIsAdultoMayor} disabled={isMenorEdad} campo="Adulto mayor" nombre="adulto_mayor" register={register} setValue={setValue} error={errors.adulto_mayor} id="adulto_mayor" state={datos.condiciones_de_vulnerabilidad?.adulto_mayor}/>
            <InputCheckbox setHook={setIsMenorEdad} disabled={isAdultoMayor} campo="Menor de edad" nombre="menor_de_edad" register={register} setValue={setValue} error={errors.menor_de_edad} id="menor_de_edad" state={datos.condiciones_de_vulnerabilidad?.menor_de_edad}/>
            <InputCheckbox campo="Tratamiento psicológico" nombre="tratamiento_psicologico" register={register} setValue={setValue} error={errors.tratamiento_psicologico} id="tratamiento_psicologico" state={datos.condiciones_de_vulnerabilidad?.tratamiento_psicologico}/>
          </div>
        )}
      </div>

      {(!onlyVictima || verificar) && (
        <>
          <div className="flex flex-col my-2">
            <span className="ml-4 font-medium">¿Comparten vivienda?</span>
            <InputRadio campo="convivencia" nombre="convivencia" register={register} opciones={opcionesConvivencia} defaultValue={convivencia ? 0 : 1}
            />
          </div>
          <div className="flex flex-col my-2">
            <span className="ml-4 font-medium">¿Hay Dependencia económica?</span>
            <InputRadio campo="dependencia_economica" nombre="dependencia_economica" register={register}  opciones={opcionesDependenciaEconomica} defaultValue={dependencia_economica ? 0 : 1}
            />
          </div>
        </>
      )}

      <div className="flex flex-col my-2">
        <span className="ml-4 font-medium">Hijos</span>
        <InputRadio key={datos._id} watch={watch} handleChange={setIsHijos} campo="hijos" nombre="hijos" register={register} opciones={opcionesHijos} defaultValue={isHijos ? 0 : 1}
        />
      </div>

      {isHijos && (
        <div className="bg-slate-100 border-2 md:border-0 border-slate-500 md:bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 my-2">
            <InputCheckbox campo="Mayores de 18" nombre="mayor_de_18" register={register} setValue={setValue} error={errors.mayor_de_18} id="mayores18" state={datos.hijos?.mayores_de_edad}
            />
            <InputCheckbox campo="Menores de 18" nombre="menor_de_18" register={register} setValue={setValue} error={errors.menor_de_18} id="menores18" state={datos.hijos?.menores_de_edad}
            />
            <InputCheckbox campo="Menores discapacitados" nombre="menores_discapacitados" register={register} setValue={setValue} error={errors.menores_discapacitados} id="menoresDiscapacitados" state={datos.hijos?.menores_discapacitados}
            />
            {(existente || editarConDenuncia || !onlyVictima) && (
              <InputCheckbox campo="Hijos con el agresor" nombre="hijos_con_agresor" register={register} setValue={setValue} error={errors.hijos_con_agresor} setHook={setIsHijosConAgresor} state={isHijosConAgresor} id="hijosConElAgresor"/>
            )}
          </div>
          {(isHijosConAgresor && (existente || editarConDenuncia || !onlyVictima)) && (
            <InputNumber campo="Cantidad" nombre="cantidad_hijos_con_agresor" register={register} setValue={setValue} error={errors.cantidad_hijos_con_agresor} maxLenght={2} valor={cantidad_hijos_con_agresor || ''}/>
          )}
        </div>
      )}
    </div>
  );
}

export default EditVictima;