
type Radiograma = {
    _id: string;
    supervision: string;
    nro_expediente: string;
    nro_nota_preventivo: string;
    nro_nota_preventivo_anterior?: string | null;
    tipo_radiograma: string;
    fecha: Date;
    fecha_anterior?: Date | null;
    hora: string;
    direccion: string;
    telefono: string;
    destinatario: string;
    objeto: string;
    observaciones?: string | null;
    preventivo_ID: string;
    ampliado_de?: string | null;
    ampliacion_ID?: string | null;
    solicita: string;
    consultado_preventivo: string;
    resolucion_preventivo: string;
    nombre_victima: string;
    apellido_victima: string;
    edad_victima: number;
    DNI_victima: string;
    estado_civil_victima: string;
    ocupacion_victima: string;
    nacionalidad_victima?: string | null;
    genero_victima: string;
    direccion_victima?: string | null;
    telefono_victima?: string | null;
    etnia_victima?: string | null;
    instructor: {
        nombre_completo_instructor: string;
        jerarquia_instructor: string;
    };    
}
export default Radiograma;