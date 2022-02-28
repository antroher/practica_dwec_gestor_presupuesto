function crearObjeto (x, y) {
    this.x = (isNaN(parseFloat(x))) ? 0 : parseFloat(x),
    this.y = (isNaN(parseFloat(y))) ? 0 : parseFloat(y), 

    this.cambiar = function (newX, newY) {
        this.x = (isNaN(parseFloat(newX))) ? this.x : parseFloat(newX);
        this.y = (isNaN(parseFloat(newY))) ? this.y : parseFloat(newY)
    },

    this.copia = function () {
        return new crearObjeto(this.x, this.y);
    }, 

    this.iguales = function (puntoComp) {
        if ((puntoComp.x + puntoComp.y) === (this.x + this.y)) {
            console.log("Ambos puntos son iguales.")
            return `Ambos puntos son iguales.`
        }
        else {
            console.log("Los puntos no son iguales.")
            return `Los puntos no son iguales.`
        }
    }, 

    this.suma = function (puntoSum) {
        return {
            x: puntoSum.x + this.x,
            y: puntoSum.y + this.y
        };
    }, 

    this.obtenerDistancia = function (puntoDist) {
        return Math.sqrt(Math.pow(Math.abs(puntoDist.x - this.x),2) + Math.pow(Math.abs(puntoDist.y - this.y),2));
    },

    this.toString = function() {
        return `${this.x},${this.y}`;
    }
}