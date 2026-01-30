function jugar(eleccionUsuario) {

    const opciones = ["piedra", "papel", "tijera"];
    const eleccionPC = opciones[Math.floor(Math.random() * 3)];

    let resultado = "";

    if (eleccionUsuario === eleccionPC) {
        resultado = "Empate 🤝";
    } 
    else if (
        (eleccionUsuario === "piedra" && eleccionPC === "tijera") ||
        (eleccionUsuario === "papel" && eleccionPC === "piedra") ||
        (eleccionUsuario === "tijera" && eleccionPC === "papel")
    ) {
        resultado = "Ganaste 🎉";
    } 
    else {
        resultado = "Perdiste 😢";
    }

    document.getElementById("resultado").innerText =
        "Tú: " + eleccionUsuario +
        " | PC: " + eleccionPC +
        " → " + resultado;
}
