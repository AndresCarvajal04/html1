function Calcular() {

    // Obtener los valores
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);

    // Validar datos
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor ingrese ambos números");
        return;
    }

    let divisoresComunes = [];

    // Buscar divisores comunes
    for (let i = 1; i <= Math.min(num1, num2); i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            divisoresComunes.push(i);
        }
    }

    // Mostrar resultado
    alert("Divisores comunes: " + divisoresComunes.join(", "));
}
