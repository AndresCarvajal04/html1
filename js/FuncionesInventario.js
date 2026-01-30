let inventario = [];
let ids = 0;

/* ===============================
   CARGAR INVENTARIO AUTOMÁTICO
================================= */
fetch("inventario.txt")
    .then(r => r.text())
    .then(data => {
        inventario = data
            .split("\n")
            .map(l => l.split(";").map(x => x.trim()))
            .filter(l => l.length === 3);
    });

/* ===============================
   CREAR INPUT
================================= */
function crearInput(id, tipo, readonly = false) {
    let i = document.createElement("input");
    i.type = tipo;
    i.id = id;
    i.readOnly = readonly;
    return i;
}

/* ===============================
   AGREGAR FILA DESDE CÓDIGO
================================= */
function agregarPorCodigo(codigoBuscado) {
    let item = inventario.find(p => p[0] === codigoBuscado);
    if (!item) return;

    let tbody = document.querySelector("#InventarioID tbody");
    let fila = tbody.insertRow();

    fila.insertCell(0).innerText = ids + 1;

    let codigo = crearInput("codigo" + ids, "text", true);
    codigo.value = item[0];
    fila.insertCell(1).appendChild(codigo);

    let nombre = crearInput("nombre" + ids, "text", true);
    nombre.value = item[1];
    fila.insertCell(2).appendChild(nombre);

    let valor = crearInput("valor" + ids, "number");
    valor.value = item[2];
    fila.insertCell(3).appendChild(valor);

    let cantidad = crearInput("cantidad" + ids, "number");
    cantidad.value = 1;
    fila.insertCell(4).appendChild(cantidad);

    let subtotal = crearInput("subtotal" + ids, "number", true);
    subtotal.value = valor.value * cantidad.value;
    fila.insertCell(5).appendChild(subtotal);

    valor.oninput = cantidad.oninput = () => {
        subtotal.value = valor.value * cantidad.value;
        calcularTotal();
    };

    ids++;
    calcularTotal();
}

/* ===============================
   FILTRO EN INPUT CÓDIGO
================================= */
function filtrarCodigo(input) {
    if (input.value.length === 3) {
        agregarPorCodigo(input.value);
        input.value = "";
    }
}

/* ===============================
   TOTAL GENERAL
================================= */
function calcularTotal() {
    let total = 0;
    for (let i = 0; i < ids; i++) {
        let s = document.getElementById("subtotal" + i);
        if (s) total += Number(s.value);
    }
    document.getElementById("Total").value = total;
}
