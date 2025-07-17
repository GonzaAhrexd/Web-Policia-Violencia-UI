type TipoDeViolencia = {
    Fisica: boolean;
    Psicologica: boolean;
    Sexual: boolean;
    Economica_y_patrimonial: boolean;
    Simbolica: boolean;
    Politica: boolean;
};

type Medida = {
    prohibicion_de_acercamiento: boolean;
    restitucion_de_menor: boolean;
    exclusion_de_hogar: boolean;
    alimento_provisorio: boolean;
    derecho_de_comunicacion: boolean;
    boton_antipanico: boolean;
    restitucion_de_bienes: boolean;
    ninguna_solicitada: boolean;
};

type MedidaDispuesta = {
    prohibicion_de_acercamiento: boolean;
    exclusion_de_hogar: boolean;
    boton_antipanico: boolean;
    solicitud_de_aprehension: boolean;
    expedientes_con_cautelar: boolean;
    en_libertad: boolean;
    cese_de_hostigamiento: boolean;
    notificacion_expediente: boolean;
    ninguna: boolean;
};

type Denuncia = {
    _id: string;
    victima_ID: string;
    victima_nombre: string;
    victimario_ID: string;
    victimario_nombre: string;
    relacion_victima_victimario: string;
    convivencia: boolean;
    modo_actuacion: string;
    dependencia_economica: boolean;
    hijos_victima_con_victimario: number;
    fecha: any ;
    direccion: string;
    GIS?: string;
    barrio?: string;
    tipo_de_lugar: string;
    unidad_de_carga: string;
    municipio: string;
    jurisdiccion_policial: string;
    cuadricula: string;
    isDivision: boolean;
    numero_de_expediente: string;
    is_expediente_completo: boolean;
    juzgado_interviniente: string;
    juzgado_interviniente_numero?: string;
    dependencia_derivada: string;
    violencia: string;
    modalidades: string;
    tipo_de_violencia: TipoDeViolencia;
    empleo_de_armas: boolean;
    arma_empleada: string;
    medida: Medida;
    medida_dispuesta: MedidaDispuesta;
    denunciado_por_tercero: boolean;
    tercero_ID?: string;
    vinculo_con_la_victima_tercero?: string;
    aprehension: boolean;
    observaciones?: string;
    imagen?: string;
    denunciada_cargada_por: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default Denuncia;