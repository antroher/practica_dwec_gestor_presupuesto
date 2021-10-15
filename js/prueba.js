function convertidorFecha(fecha) {
    let fechaConvertida = Date.parse(fecha);
    return fechaConvertida;
}

let fecha = convertidorFecha("Mon, 25 Dec 1995 13:30:00 GMT");
console.log(fecha);