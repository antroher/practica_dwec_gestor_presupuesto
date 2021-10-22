function filtrarGastos(objeto){
    let fd;
    let fh;
    let vmin;
    let vmax;
    let desc;
    let etitiene;
    
    if(objeto.hasOwnProperty("fechaDesde"))
    {
        fd = objeto.fechaDesde;
        console.log(fd);
        if(!isNaN(Date.parse(fd)))
        {
            fd = Date.parse(fd);
        }
    }
    
}

filtrarGastos({fechaDesde: 3})