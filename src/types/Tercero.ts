type Tercero = {
    _id: string; // ID del tercero
    nombre: string; // Nombre del tercero
    apellido: string; // Apellido del tercero
    DNI: string; // DNI del tercero, sin puntos ni espacios
    denuncias_realizadas?: string[]; // Array de IDs de denuncias realizadas por el tercero
}

export default Tercero;