import axios from '../axios'


// DENUNCIAS
// POST: Crear denuncias
export const crearDenuncia = (denuncia: any) => {
    const formData = new FormData();
    // Pasa todos los datos de la denuncia a un FormData
    Object.keys(denuncia).forEach((key) => {
        formData.append(key, denuncia[key]);
    });
    
    try {
        axios.post(`/denuncias/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    })
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar denuncias del usuario actual
export const misDenuncias = async (values: any) => {
    try {
        const response = await axios.get(`/denuncias/mis-denuncias/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar denuncias del usuario actual
export const buscarDenuncias = async (values: any, manual: boolean) => {
    try {
        const response = await axios.get(`/denuncias/buscar/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_denuncia ? values.id_denuncia : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}/${values.relacion_victima_victimario ? encodeURIComponent(values.relacion_victima_victimario) : "no_ingresado" }/${values.aprehension ? values.aprehension : "no_ingresado" }/${manual}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Listar las denuncias para generar un excel
export const buscarDenunciasPlus = async (values: any ) => {
    try {
        const response = await axios.get(`/denuncias/excel/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}/${values.id_denuncia ? values.id_denuncia : "no_ingresado"}/${values.numero_de_expediente ? encodeURIComponent(values.numero_de_expediente) : "no_ingresado"}/${values.is_expediente_completo ? values.is_expediente_completo : "no_ingresado"}/${values.division ? values.division : "no_ingresado"}/${values.municipio ? values.municipio : "no_ingresado"}/${values.comisaria ? values.comisaria : "no_ingresado"}/${values.relacion_victima_victimario ? encodeURIComponent(values.relacion_victima_victimario) : "no_ingresado" }/${values.aprehension ? values.aprehension : "no_ingresado" }`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}



// GET: Buscar denuncias por id
export const buscarDenunciasPorId = async (id: string) => {
    try {
        const response = await axios.get(`/denuncias/buscar/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


// GET: Cantidad de denuncias
export const cantidadDenuncias = async (values: any) => {
    try {
        const response = await axios.get(`/denuncias/cantidad/${values.desde ? values.desde : "no_ingresado"}/${values.hasta ? values.hasta : "no_ingresado"}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Estadística anual de denuncias
export const getDenunciasEstadisticaAnual = async () => {
    try {
        const response = await axios.get(`/denuncias/estadistica-anual`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// GET: Estadística diaria, semanal, mensual y anual
export const getDenunciasEstadisticaPeriodos = async () => {
    try {
        const response = await axios.get(`/denuncias/estadistica-periodos/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


// PUT: Editar denuncias
export const editarDenuncia = async (denuncia: any) => {
    try {
        const response = await axios.put(`/denuncias/${denuncia.denuncia_id}`, denuncia)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// PUT: Editar imagen de denuncia
export const editarImagenDenuncia = async (imagenDenuncia : any) => {
    const formData = new FormData();
    // Pasa todos los datos de la denuncia a un FormData
    Object.keys(imagenDenuncia).forEach((key) => {
        formData.append(key, imagenDenuncia[key]);
    });
    try {
        axios.put(`/denuncias/imagen/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        console.log(error)
    }
}


// DELETE: Eliminar denuncias
export const eliminarDenuncia = async (id: string) => {
    try {
        const response = await axios.delete(`/denuncias/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
