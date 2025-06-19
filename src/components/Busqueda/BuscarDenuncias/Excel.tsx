import { utils, writeFile } from 'xlsx';
import { useState } from 'react';
import { buscarDenunciasPlus } from '../../../api/CRUD/denuncias.crud';
import { TableCellsIcon } from '@heroicons/react/24/outline';

// Interface for the component props
type Denuncia = {
  filtros: any;
}

// TypeScript interface derived from columnConfig

// Component
function Excel({ filtros }: Denuncia) {
  const [isLoading, setIsLoading] = useState(false);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Centralized column configuration
  const columnConfig: {
    key: string;
    header: string;
    width: number;
    getValue: (denuncia: any) => string | number | undefined;
  }[] = [
      { key: 'id', header: 'ID', width: 26, getValue: (d) => d?._id },
      { key: 'fecha', header: 'Fecha', width: 10, getValue: (d) => `${new Date(d.fecha).getUTCDate().toString().padStart(2, '0')}/${(new Date(d.fecha).getUTCMonth() + 1).toString().padStart(2, '0')}/${new Date(d.fecha).getUTCFullYear()}`, },
      { key: 'mes', header: 'Mes', width: 6, getValue: (d) => meses[new Date(d?.fecha).getMonth()] },
      { key: 'año', header: 'Año', width: 6, getValue: (d) => new Date(d?.fecha).getFullYear().toString() },
      { key: 'direccion', header: 'Dirección', width: 20, getValue: (d) => d?.direccion },
      { key: 'GIS', header: 'GIS', width: 24, getValue: (d) => d?.GIS },
      { key: 'barrio', header: 'Barrio', width: 12, getValue: (d) => d?.barrio },
      { key: 'tipo_de_lugar', header: 'Tipo de lugar', width: 18, getValue: (d) => d?.tipo_de_lugar },
      { key: 'unidad_de_carga', header: 'Unidad de carga', width: 18, getValue: (d) => d?.unidad_de_carga },
      { key: 'municipio', header: 'Municipio', width: 13, getValue: (d) => d?.municipio },
      { key: 'jurisdiccion', header: 'Jurisdicción policial', width: 28, getValue: (d) => d?.jurisdiccion_policial },
      { key: 'cuadricula', header: 'Cuadrícula', width: 14, getValue: (d) => d?.cuadricula },
      { key: 'isDivision', header: 'Cargado en la división', width: 22, getValue: (d) => (d?.isDivision ? 'Sí' : 'No') },
      { key: 'numero_de_expediente', header: 'Número de expediente', width: 22, getValue: (d) => d?.numero_de_expediente },
      { key: 'is_expediente_completo', header: 'Expediente completo', width: 18, getValue: (d) => (d?.is_expediente_completo ? 'Sí' : 'No') },
      { key: 'modo_actuacion', header: 'Modo de actuación', width: 20, getValue: (d) => d?.modo_de_actuacion },
      { key: 'juzgado_interviniente', header: 'Juzgado interviniente', width: 20, getValue: (d) => `${d?.juzgado_interviniente} ${d?.juzgado_interviniente_numero}`, },
      { key: 'dependencia_derivada', header: 'Dependencia derivada', width: 18, getValue: (d) => d?.dependencia_derivada },
      { key: 'violencia', header: 'Violencia', width: 20, getValue: (d) => d?.violencia },
      { key: 'modalidades', header: 'Modalidades', width: 26, getValue: (d) => d?.modalidades },
      { key: 'violencia_fisica', header: 'Violencia física', width: 13, getValue: (d) => (d?.tipo_de_violencia.Fisica ? 'Sí' : 'No') },
      { key: 'violencia_psicologica', header: 'Violencia psicológica', width: 18, getValue: (d) => (d?.tipo_de_violencia.Psicologica ? 'Sí' : 'No'), },
      { key: 'violencia_sexual', header: 'Violencia sexual', width: 14, getValue: (d) => (d?.tipo_de_violencia.Sexual ? 'Sí' : 'No') },
      { key: 'violencia_economica_y_patrimonial', header: 'Violencia económica y patrimonial', width: 30, getValue: (d) => (d?.tipo_de_violencia.Economica_y_patrimonial ? 'Sí' : 'No'), },
      { key: 'violencia_simbolica', header: 'Violencia simbólica', width: 17, getValue: (d) => (d?.tipo_de_violencia.Simbolica ? 'Sí' : 'No'), },
      { key: 'violencia_politica', header: 'Violencia política', width: 14, getValue: (d) => (d?.tipo_de_violencia.Politica ? 'Sí' : 'No'), },
      { key: 'empleo_de_armas', header: 'Empleo de armas', width: 15, getValue: (d) => (d?.empleo_de_armas ? 'Sí' : 'No') },
      { key: 'arma_empleada', header: 'Arma empleada', width: 20, getValue: (d) => d?.arma_empleada },
      { key: 'prohibicion_de_acercamiento', header: 'Prohibición de acercamiento', width: 26, getValue: (d) => (d?.medida.prohibicion_de_acercamiento ? 'Sí' : 'No'), },
      { key: 'restitucion_de_menor', header: 'Restitución de menor', width: 22, getValue: (d) => (d?.medida.restitucion_de_menor ? 'Sí' : 'No'), },
      { key: 'exclusion_hogar', header: 'Exclusión del hogar', width: 20, getValue: (d) => (d?.medida.exclusion_de_hogar ? 'Sí' : 'No') },
      { key: 'alimento_provisorio', header: 'Alimento provisorio', width: 18, getValue: (d) => (d?.medida.alimento_provisorio ? 'Sí' : 'No'), },
      { key: 'derecho_comunicacion', header: 'Derecho a la comunicación', width: 24, getValue: (d) => (d?.medida.derecho_comunicacion ? 'Sí' : 'No'), },
      { key: 'boton_antipanico', header: 'Botón antipánico', width: 16, getValue: (d) => (d?.medida.boton_antipanico ? 'Sí' : 'No') },
      { key: 'prohibicion_de_acercamiento_dispuesta', header: 'Prohibición de acercamiento dispuesta', width: 34, getValue: (d) => (d?.medida_dispuesta.prohibicion_de_acercamiento ? 'Sí' : 'No'), },
      { key: 'boton_antipanico_dispuesto', header: 'Botón antipánico dispuesto', width: 26, getValue: (d) => (d?.medida_dispuesta.boton_antipanico ? 'Sí' : 'No'), },
      { key: 'exclusion_de_hogar_dispuesta', header: 'Exclusión del hogar dispuesta', width: 26, getValue: (d) => (d?.medida_dispuesta.exclusion_de_hogar ? 'Sí' : 'No'), },
      { key: 'en_libertad', header: 'En libertad dispuesto', width: 20, getValue: (d) => (d?.medida_dispuesta.en_libertad ? 'Sí' : 'No'), },
      { key: 'cese_de_hostigamiento', header: 'Cese de hostigamiento', width: 20, getValue: (d) => (d?.medida_dispuesta.cese_de_hostigamiento ? 'Sí' : 'No'), },
      { key: 'notificacion_expediente', header: 'Notificación de expediente', width: 26, getValue: (d) => (d?.medida_dispuesta.notificacion_expediente ? 'Sí' : 'No'), },
      { key: 'solicitud_de_aprehension', header: 'Solicitud de Aprehensión', width: 26, getValue: (d) => (d?.solicitud_de_aprehension ? 'Sí' : 'No'), },
      { key: 'aprehension', header: 'Aprehensión', width: 16, getValue: (d) => (d?.aprehension ? 'Sí' : 'No'), },
      { key: 'expedientes_con_cautelar', header: 'Expedientes c/cautelar', width: 26, getValue: (d) => (d?.expedientes_con_cautelar ? 'Sí' : 'No'), },
      { key: 'ninguna', header: 'Ninguna', width: 26, getValue: (d) => (d?.ninguna ? 'Sí' : 'No') },
      { key: 'denunciado_por_terceros', header: 'Denunciado por terceros', width: 20, getValue: (d) => (d?.denunciado_por_tercero ? 'Sí' : 'No'), },
      { key: 'observaciones', header: 'Observaciones', width: 200, getValue: (d) => d?.observaciones },
      // VÍCTIMAS
      { key: 'nombre_victima', header: 'Nombre de la víctima', width: 20, getValue: (d) => d.Victima?.nombre },
      { key: 'apellido_victima', header: 'Apellido de la víctima', width: 20, getValue: (d) => d.Victima?.apellido },
      { key: 'edad_victima', header: 'Edad de la víctima', width: 20, getValue: (d) => d.Victima?.edad },
      { key: 'dni_victima', header: 'DNI de la víctima', width: 18, getValue: (d) => d.Victima?.DNI },
      { key: 'genero', header: 'Género de la víctima', width: 16, getValue: (d) => d.Victima?.genero },
      { key: 'domicilio_victima', header: 'Domicilio de la víctima', width: 24, getValue: (d) => d.Victima?.direccion },
      { key: 'estado_civil_victima', header: 'Estado civil de la víctima', width: 24, getValue: (d) => d.Victima?.estado_civil },
      { key: 'ocupacion_victima', header: 'Ocupación de la víctima', width: 22, getValue: (d) => d.Victima?.ocupacion },
      { key: 'vinculo_con_agresor_victima', header: 'Vínculo con el agresor de la víctima', width: 32, getValue: (d) => d?.relacion_victima_victimario, },
      { key: 'condicion_de_vulnerabilidad_victima', header: 'Condición de vulnerabilidad de la víctima', width: 24, getValue: (d) => (d.Victima?.condicion_de_vulnerabilidad ? 'Sí' : 'No'), },
      { key: 'embarazo_victima', header: 'Embarazo', width: 16, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.embarazo ? 'Sí' : 'No') },
      { key: 'periodo_post_parto_victima', header: 'Post parto', width: 24, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.post_parto ? 'Sí' : 'No') },
      { key: 'periodo_de_lactancia_victima', header: 'Lactancia', width: 24, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.lactancia ? 'Sí' : 'No') },
      { key: 'discapacidad_victima', header: 'Discapacidad', width: 24, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.discapacidad ? 'Sí' : 'No') },
      { key: 'enfermedad_cronica_victima', header: 'Enfermedad crónica', width: 24, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.enfermedad_cronica ? 'Sí' : 'No'), },
      { key: 'adulto_mayor_victima', header: 'Adulto mayor', width: 20, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.adulto_mayor ? 'Sí' : 'No'), },
      { key: 'menor_de_edad_victima', header: 'Menor de edad', width: 20, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.menor_de_edad ? 'Sí' : 'No'), },
      { key: 'tratamiento_psicologico_victima', header: 'Tratamiento psicológico', width: 30, getValue: (d) => (d.Victima?.condiciones_de_vulnerabilidad.tratamiento_psicologico ? 'Sí' : 'No'), },
      { key: 'convivencia_victima', header: 'Convivencia', width: 22, getValue: (d) => (d?.convivencia ? 'Sí' : 'No') },
      { key: 'dependencia_economica', header: 'Dependencia económica', width: 20, getValue: (d) => (d?.dependencia_economica ? 'Sí' : 'No') },
      { key: 'cantidad_de_denuncias_realizadas_por_la_victima', header: 'Cantidad de denuncias previas', width: 24, getValue: (d) => d.Victima?.denuncias_realizadas?.length, },
      { key: 'tiene_hijos', header: 'Tiene hijos', width: 12, getValue: (d) => (d.Victima?.hijos.tiene_hijos ? 'Sí' : 'No') },
      { key: 'mayores_de_edad', header: 'Mayores de edad', width: 17, getValue: (d) => (d.Victima?.hijos.mayores_de_edad ? 'Sí' : 'No') },
      { key: 'menores_de_edad', header: 'Menores de edad', width: 20, getValue: (d) => (d.Victima?.hijos.menores_de_edad ? 'Sí' : 'No') },
      { key: 'menores_discapacitados', header: 'Menores discapacitados', width: 20, getValue: (d) => (d.Victima?.hijos.menores_discapacitados ? 'Sí' : 'No'), },
      { key: 'hijos_con_el_agresor', header: 'Hijos con el agresor', width: 16, getValue: (d) => d?.hijos_victima_con_victimario },
      // VICTIMARIOS
      { key: 'nombre_victimario', header: 'Nombre del victimario', width: 18, getValue: (d) => d?.Victimario?.nombre },
      { key: 'apellido_victimario', header: 'Apellido del victimario', width: 22, getValue: (d) => d?.Victimario?.apellido },
      { key: 'edad_victimario', header: 'Edad del victimario', width: 20, getValue: (d) => d?.Victimario?.edad },
      { key: 'dni_victimario', header: 'DNI del victimario', width: 28, getValue: (d) => d?.Victimario?.DNI },
      { key: 'domicilio_victimario', header: 'Domicilio del victimario', width: 30, getValue: (d) => d?.Victimario?.direccion },
      { key: 'estado_civil_victimario', header: 'Estado civil del victimario', width: 30, getValue: (d) => d?.Victimario?.estado_civil },
      { key: 'ocupacion_victimario', header: 'Ocupación del victimario', width: 28, getValue: (d) => d?.Victimario?.ocupacion },
      { key: 'abuso_de_alcohol_victimario', header: 'Abuso de alcohol del victimario', width: 36, getValue: (d) => (d?.Victimario?.abuso_de_alcohol ? 'Sí' : 'No'), },
      { key: 'antecedentes_toxicologicos_victimario', header: 'Antecedentes toxicológicos del victimario', width: 36, getValue: (d) => (d?.Victimario?.antecedentes_toxicologicos ? 'Sí' : 'No'), },
      { key: 'antecedentes_penales_victimario', header: 'Antecedentes penales del victimario', width: 26, getValue: (d) => (d?.Victimario?.antecedentes_penales ? 'Sí' : 'No'), },
      { key: 'antecedentes_contravencionales_victimario', header: 'Antecedentes contravencionales del victimario', width: 30, getValue: (d) => (d?.Victimario?.antecedentes_contravencionales ? 'Sí' : 'No'), },
      { key: 'antecedentes_psicologicos_victimario', header: 'Antecedentes psicológicos del victimario', width: 30, getValue: (d) => (d?.Victimario?.antecedentes_psicologicos ? 'Sí' : 'No'), },
      { key: 'esta_aprehendido', header: 'Está aprehendido', width: 16, getValue: (d) => (d?.Victimario?.esta_aprehendido ? 'Sí' : 'No'), },
      { key: 'fue_liberado', header: 'Fue liberado', width: 16, getValue: (d) => (d?.Victimario?.fue_liberado ? 'Sí' : 'No'), },
      { key: 'entrenamiento_en_combate_victimario', header: 'Entrenamiento en combate del victimario', width: 26, getValue: (d) => (d?.Victimario?.entrenamiento_en_combate ? 'Sí' : 'No'), },
      { key: 'cantidad_de_denuncias_realizadas_contra_el_victimario', header: 'Denuncias previas en contra', width: 16, getValue: (d) => d?.Victimario?.denuncias_en_contra?.length, },
      // TERCERO
      { key: 'tercero_nombre', header: 'Nombre del tercero', width: 24, getValue: (d) => d?.Tercero?.nombre ?? 'No hay tercero' },
      { key: 'tercero_apellido', header: 'Apellido del tercero', width: 24, getValue: (d) => d?.Tercero?.apellido ?? 'No hay tercero' },
      { key: 'tercero_dni', header: 'DNI del tercero', width: 24, getValue: (d) => d?.Tercero?.DNI ?? 'No hay tercero' },
      { key: 'tercero_vinculo_con_victima', header: 'Vínculo del tercero con la víctima', width: 30, getValue: (d) => d?.vinculo_con_la_victima_tercero ?? 'No hay tercero', },
    ];


  const rellenarDenuncias = async () => {
    const denunciasLista = await buscarDenunciasPlus(filtros);
    const denuncias: [] = denunciasLista.map((denuncia: any) => {
      const row: any = {};
      columnConfig.forEach(({ key, getValue }) => {
        row[key] = getValue(denuncia);
      });
      return row;
    });
    return denuncias;
  };


  const getExcelColumnName = (index: number): string => {
    let columnName = '';
    while (index >= 0) {
      columnName = String.fromCharCode(65 + (index % 26)) + columnName;
      index = Math.floor(index / 26) - 1;
    }
    return columnName;
  };

  const exportarDenuncias = async () => {
    setIsLoading(true);
    const denuncias = await rellenarDenuncias();

    // Create worksheet
    const hoja = utils.json_to_sheet(denuncias);

    // Set column widths
    hoja['!cols'] = columnConfig.map(({ width }) => ({ wch: width }));

    // Set column headers
    // @ts-ignore
    columnConfig.forEach(({ key, header }, index) => {
      const cellRef = `${getExcelColumnName(index)}1`; // Usa la nueva función para obtener A, B, ..., AA, AB, etc.
      hoja[cellRef] = { v: header, t: 's' };
    });

    // Create workbook and append sheet
    const libro = utils.book_new();
    utils.book_append_sheet(libro, hoja, 'Denuncias');

    // Write file
    writeFile(libro, 'denuncias.xlsx');
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="spinner m-6"></div>;
  }

  return (
    <button
      className={`flex flex-row items-center justify-center bg-sky-950 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded w-full md:w-3/10 scale-up-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      onClick={exportarDenuncias}
      disabled={isLoading}
    >
      <TableCellsIcon className="h-6 w-6" />
      Generar Excel
    </button>
  );
}

export default Excel;