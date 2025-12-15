function calcularFactorial(n) {
    if (n < 0) {
        return 'Error: El factorial no se define para números negativos.';
    }
    
    n = Math.floor(n);
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
        factorial *= i;
    }
    
    return factorial;
}

function calcular() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacion = document.getElementById('operacion').value;
    const resultadoDiv = document.getElementById('resultado');
    
    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        resultado = 'Por favor, ingrese ambos números.';
        resultadoDiv.innerText = resultado;
        return;
    }

    switch (operacion) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultado = 'Error: División por cero.';
                resultadoDiv.innerText = resultado;
                return;
            }
            resultado = num1 / num2;
            break;
        case 'factorial':
            resultado = calcularFactorial(num1);
            resultadoDiv.innerText = 'Resultado: ' + resultado;
            return;
    }

    resultadoDiv.innerText = 'Resultado: ' + resultado;
}
