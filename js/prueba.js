function prueba(valor1 = Date.now(), valor2) {
    console.log(typeof valor1);
    return valor1;
}

let test = prueba();
let fecha = new Date(test).toLocaleDateString();
console.log(fecha);
let fechaNueva = test.toLocaleDateString();
