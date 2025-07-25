
type DenunciaSinVerificar = {
    _id: string;
    estado: string;
    cargado_por: string;
    numero_de_expediente: string;
    fecha: Date;
    hora: string;
    direccion: string;
    telefono: string;
    division: string;
    ampliado_de?: string;
    nombre_victima: string;
    apellido_victima: string;
    edad_victima: number;
    DNI_victima: string;
    estado_civil_victima: string;
    modo_actuacion: string;
    ocupacion_victima: string;
    nacionalidad_victima?: string;
    genero_victima: string;
    direccion_victima?: string;
    telefono_victima?: string;
    sabe_leer_y_escribir_victima?: boolean;
    observaciones?: string;
    agrega?: string;
    preguntas: {
        desea_ser_asistida: boolean;
        desea_ser_examinada_por_medico: boolean;
        desea_accionar_penalmente: boolean;
        desea_agregar_quitar_o_enmendar: boolean;
    }
    secretario: {
        nombre_completo_secretario: string;
        jerarquia_secretario: string;
        plaza_secretario?: string;
    };
    instructor: {
        nombre_completo_instructor: string;
        jerarquia_instructor: string;
    };
    ampliaciones_IDs?: string[];
    preventivo_ID?: string;
    radiograma_ID?: string;
};

export default DenunciaSinVerificar;