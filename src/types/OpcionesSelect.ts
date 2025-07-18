type Opcion = {
    value: string;
    nombre: string;
    subdivisiones?: Opcion[]; // Opcional, indica que puede tener subniveles
}


export default Opcion;