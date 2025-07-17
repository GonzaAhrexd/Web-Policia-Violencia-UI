type Victimario = {
    nombre: string;
    apellido: string;
    direccion?: string;
    edad?: number;
    DNI?: string;
    estado_civil: string;
    ocupacion: string;
    abuso_de_alcohol: boolean;
    antecedentes_toxicologicos: boolean;
    antecedentes_penales: boolean;
    antecedentes_contravencionales: boolean;
    antecedentes_psicologicos: boolean;
    entrenamiento_en_combate: boolean;
    denuncias_en_contra: string[];
    esta_aprehendido?: boolean;
    fue_liberado?: boolean;
};

export default Victimario;