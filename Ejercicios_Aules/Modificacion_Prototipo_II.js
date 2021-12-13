Array.prototype.filtrarMenor = function (value) {
    let arrayFiltrado = this.filter((item) => {
        return item < value; 
    });

    return arrayFiltrado;
}