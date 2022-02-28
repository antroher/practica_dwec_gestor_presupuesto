let result = gastos.filter(function(item){
    let devuelve = true;

    if(typeof fd === "undefined")
    {
        if(item.fecha < fd)
        {
            devuelve = false;
        }
    }
    if(typeof fh === "undefined")
    {
        if(item.fecha > fh)
        {
            devuelve = false;
        }
    }
    if(item.descripcion.includes(desc))
    {
        devuelve = false;
    }
        
    return devuelve
});
return result;


filtrarGastos({fechaDesde: 3})