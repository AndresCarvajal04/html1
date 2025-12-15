var total=0;
var numProductos=0;
var ids = 1;

function addFila() {
    var tabla = document.getElementById("tblFactura").getElementsByTagName('tbody')[0];
    //console.log(tabla);
    var fila = tabla.insertRow(-1);
    var celda1 = fila.insertCell(0);
    var celda2 = fila.insertCell(1);
    var celda3 = fila.insertCell(2);
    var celda4 = fila.insertCell(3);
    var celda5 = fila.insertCell(4);
    var celda6 = fila.insertCell(5);

    var botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "-";
    botonEliminar.onclick = function() {
        var row = this.parentNode.parentNode;
        row.remove();
        numProductos--;
        var contador = document.getElementById("numProductos");
        contador.innerHTML = "<b>"+numProductos+"</b>";
        calcularTotal();
}
celda1.appendChild(botonEliminar);

var caja1 = addinput("codigo", "text");
celda2.appendChild(caja1);

var caja2 = addinput("producto", "text");
celda3.appendChild(caja2);

var caja3 = addinput("cantidad", "number");
celda4.appendChild(caja3);
caja3.value = 0;
caja3.oninput = function() {
        var cantidad = document.getElementById(this.id).value;
        var valorid = this.id.substring(8);
        if (cantidad=="" || isNaN(cantidad)){
                cantidad=0;
                document.getElementById(this.id).value = 0;
                document.getElementById("SubTotal"+valorid).value = 0;
               } else {
                var ValorUnitario = document.getElementById("ValorUnitario"+valorid).value;
                if (ValorUnitario=="" || isNaN(ValorUnitario)){
                        ValorUnitario=0;
                        document.getElementById("ValorUnitario"+valorid).value = 0;
                        document.getElementById("SubTotal"+valorid).value = 0;
                } else {
                        var SubTotal =parseInt(cantidad) * parseInt(ValorUnitario);
                        document.getElementById("SubTotal"+valorid).value = SubTotal;
                        calcularTotal();
                }
        }
}

var caja4 = addinput("ValorUnitario", "number");
caja4.value = 0;
caja4.oninput = function() {
        var ValorUnitario = document.getElementById(this.id).value;     
        var valorid = this.id.substring(13);
        if (ValorUnitario=="" || isNaN(ValorUnitario)){
                ValorUnitario=0;
                document.getElementById(this.id).value = 0;
                document.getElementById("SubTotal"+valorid).value = 0;
               } else {
                var cantidad = document.getElementById("cantidad"+valorid).value;       
                if (cantidad=="" || isNaN(cantidad)){
                        cantidad=0;
                        document.getElementById("cantidad"+valorid).value = 0;
                        document.getElementById("SubTotal"+valorid).value = 0;
                } else {
                        var SubTotal =parseInt(cantidad) * parseInt(ValorUnitario);
                        document.getElementById("SubTotal"+valorid).value = SubTotal;
                        calcularTotal();
                } 
        }
}
celda5.appendChild(caja4);

var caja5 = addinput("SubTotal", "number", true);
caja5.value = 0;
caja5. onchange = function() {
        alert("El campo SubTotal es de solo lectura.");
}
celda6.appendChild(caja5);




numProductos++;
ids++;
var contador = document.getElementById("numProductos");
        contador.innerHTML = "<b>"+numProductos+"</b>";


}
function addinput(valorid, typepeinput, readonly=false ) {
        var caja = document.createElement("input");
        caja.id = valorid+ids;
        caja.type = typepeinput; 
        if (readonly==true){
                caja.readOnly = true;
        }
        return caja;
}

function calcularTotal() {
    var tabla = document.getElementById("tblFactura").getElementsByTagName('tbody')[0];
    var filas = tabla.getElementsByTagName('tr');
    total=0;
        for (var i = 0; i < filas.length; i++) {
                var celdaSubTotal = filas[i].getElementsByTagName('td')[5];
                var inputSubTotal = celdaSubTotal.getElementsByTagName('input')[0];
                var valorSubTotal = parseInt(inputSubTotal.value) || 0;
                total += valorSubTotal;
        }
        document.getElementById("totalFactura").innerHTML = total.toFixed(2);
}

