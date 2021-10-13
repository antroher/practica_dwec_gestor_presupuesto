function crearFecha() {
    let fechaObjeto = new Date();
        let fechaActual = fechaObjeto.getDate() + "/" + (fechaObjeto.getMonth() + 1) + "/" + fechaObjeto.getFullYear() + "T" + 
            fechaObjeto.getHours() + ":" + fechaObjeto.getMinutes();
    return   fechaActual
}   

let fecha = crearFecha();
console.log(fecha);