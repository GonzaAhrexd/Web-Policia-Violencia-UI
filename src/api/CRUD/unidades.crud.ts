import axios from '../axios'

// POST: Agregar unidad
export const agregarUnidad = async (unidad: any) => {
    try {
        const response = await axios.post('/unidades/unidad', unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//  GET: Obtener unidades
export const obtenerUnidades = async () => {
    try {
        const response = await axios.get('/unidades/unidad')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar unidades
export const editarUnidad = async (unidad: any) => {
    try {
        const response = await axios.put(`/unidades/unidad/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Agregar municipio
export const agregarMunicipio = async (unidad: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-municipio/${unidad.id}`, unidad)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar municipio
export const editarMunicipio = async (municipio: any) => {
    try {
        const response = await axios.put(`/unidades/editar-municipio/`, municipio)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Agregar comisaria
export const agregarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar comisaría
export const editarComisaria = async (comisaria: any) => {
    try {
        const response = await axios.put(`/unidades/editar-comisaria/`, comisaria)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Eliminar cuadricula desde comisaria
export const eliminarCuadriculaDesdeComisaria = async (cuadricula: string, comisaria: string, municipio: string ) => {
    try {
        const response = await axios.put(`/unidades/eliminar-cuadricula/${cuadricula}/${comisaria}/${municipio}`,)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Agregar cuadricula
export const agregarCuadricula = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-cuadricula/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar cuadricula
export const editarCuadriculaDesdeComisaria = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/editar-cuadricula-desde-comisaria/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Eliminar municipio
export const eliminarMunicipio = async (nombre: any) => {
    try {
        const response = await axios.put(`/unidades/eliminar-municipio/${nombre}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Eliminar comisaria
export const eliminarComisaria = async (nombre: any, municipio: any) => {
    try {
        const response = await axios.put(`/unidades/eliminar-comisaria/${nombre}/${municipio}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Agregar cuadricula desde municipio
export const agregarCuadriculaDesdeMunicipio = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/agregar-cuadricula-desde-municipio/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar cuadricula desde municipio
export const editarCuadriculaDesdeMunicipio = async (cuadricula: any) => {
    try {
        const response = await axios.put(`/unidades/editar-cuadricula-desde-municipio/`, cuadricula)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Eliminar cuadricula desde municipio
export const eliminarCuadriculaDesdeMunicipio = async (cuadricula: string, municipio: string ) => {
    try{
        const response = await axios.put(`/unidades/eliminar-cuadricula-desde-municipio/${cuadricula}/${municipio}`,)
        return response.data
    } catch (error) {
        console.log(error)
    }
}