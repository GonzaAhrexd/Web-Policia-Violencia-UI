type Preventivo = {
    _id: string;
    supervision: string;
    numero_nota: string;
    numero_nota_anterior?: string | null;
    numero_de_expediente: string;
    fecha: Date;
    tipo_preventivo: string;
    ampliado_de?: string | null;
    preventivo_ampliado_ID?: string | null;
    numero_nota_preventivo?: string | null;
    con_denuncia_ampliada?: boolean;
    division: string;
    objeto: string;
    objeto_anterior?: string | null;
    consultado: string;
    observaciones: string;
    resolucion: string;
    autoridades: string;
    nombre_victima: string;
    apellido_victima: string;
    edad_victima: number;
    DNI_victima: string;
    estado_civil_victima: string;
    ocupacion_victima: string;
    nacionalidad_victima?: string | null;
    genero_victima: string;
    direccion_victima: string;
    telefono_victima: string;
    agrega: string;
    secretario: {
        nombre_completo_secretario: string;
        jerarquia_secretario: string;
        plaza_secretario?: string | null;
    };
    instructor: {
        nombre_completo_instructor: string;
        jerarquia_instructor: string;
    };
}

export default Preventivo;