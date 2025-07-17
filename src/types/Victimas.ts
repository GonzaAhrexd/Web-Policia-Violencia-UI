type Victima = {
    nombre: string;
    apellido: string;
    direccion?: string;
    edad: number;
    genero: string;
    DNI: string;
    estado_civil: string;
    ocupacion: string;
    condicion_de_vulnerabilidad: boolean;
    condiciones_de_vulnerabilidad: {
        embarazo?: boolean;
        periodo_post_parto?: boolean;
        periodo_de_lactancia?: boolean;
        discapacidad?: boolean;
        enfermedad_cronica?: boolean;
        adulto_mayor?: boolean;
        menor_de_edad?: boolean;
        tratamiento_psicologico?: boolean;
    };
    hijos: {
        tiene_hijos: boolean;
        mayores_de_edad: boolean;
        menores_de_edad: boolean;
        menores_discapacitados: boolean;
    };
    denuncias_realizadas?: string[];
};

export default Victima;