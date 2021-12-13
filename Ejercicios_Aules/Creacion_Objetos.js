function crearObjeto (x, y) {
    this.x = (isNaN(parseFloat(x))) ? 0 : parseFloat(x),
    this.y = (isNaN(parseFloat(y))) ? 0 : parseFloat(y), 

    this.cambiar = function (newX, newY) {
        this.x = (isNaN(parseFloat(newX))) ? this.x : parseFloat(newX);
        this.y = (isNaN(parseFloat(newY))) ? this.y : parseFloat(newY)
    },

    this.copia = function () {
        return {x: this.x, y: this.y};
    }, 

    this.iguales = function (compX, compY) {
        if ((compX + compY) === (this.x + this.y)) {
            console.log("Ambos puntos son iguales.")
        }
        else {
            console.log("Los puntos no son iguales.")
        }
    }, 

    this.suma = function (sumX, sumY) {
        return {
            x: sumX + this.x,
            y: sumY + this.y
        };
    }, 

    this.obtenerDistancia = function (newX, newY) {
        return Math.sqrt((Math.abs(newX - this.x))^2 + Math.abs((newY - this.y))^2);
    },
    this.toString = function() {
        return `${this.x},${this.y}`;
    }
}