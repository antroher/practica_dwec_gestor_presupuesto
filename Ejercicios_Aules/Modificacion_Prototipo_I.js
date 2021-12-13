Array.prototype.mediaAritmetica = function () {
    let acumulado = 0;
    
    this.forEach((item) => {
        acumulado += item;
    })

    return acumulado/this.length;
}