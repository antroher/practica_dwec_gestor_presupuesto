import { filtrarGastos } from "./gestionPresupuesto";

let results = gastos.filter(function(item){
    // Si devuelve true el elemento es ingresado ak¡l array y la iteración
    //Si ada es encontrado, devuelve un array vacio
    let devuelve = true;
    
    if(typeof fD !== "undefined")
        if(item.fecha < fD)
            devuelve = false;

            if(typeof fH !== "undefined")
        if(item.fecha > fH)
            devuelve = false;

            if(item.includes(descr)){
                devuelve = true;
            }
    return devuelve;
});

filtrarGastos({fechaDesde:3})