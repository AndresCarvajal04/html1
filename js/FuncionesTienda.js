document.addEventListener('DOMContentLoaded', () => {
    const selectProductos = document.getElementById('productos');
    const cantidadInput = document.getElementById('cantidad');
    const calcularBtn = document.getElementById('calcular');
    const totalSpan = document.getElementById('total');

    let productosData = [];

    // Cargar productos desde el archivo txt
    function cargarProductos() {
        fetch('Productos.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo encontrar Productos.txt');
                }
                return response.text();
            })
            .then(data => {
                const productos = data.trim().split('\n').filter(line => line.trim() !== '');
                
                // Limpiar select
                selectProductos.innerHTML = '<option value="">-- Seleccione un producto --</option>';

                productosData = productos.map(producto => {
                    const [nombre, precio] = producto.split(',');
                    return { nombre: nombre.trim(), precio: parseFloat(precio.trim()) };
                });

                productosData.forEach((producto, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = producto.nombre;
                    selectProductos.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error cargando productos:', error);
                alert('Hubo un error al cargar los productos. Asegúrese de que el archivo Productos.txt exista.');
            });
    }

    // Calcular el total
    function calcularTotal() {
        const productoIndex = selectProductos.value;
        const cantidad = parseInt(cantidadInput.value, 10);

        if (productoIndex === "" || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, seleccione un producto y ingrese una cantidad válida.');
            return;
        }

        const productoSeleccionado = productosData[productoIndex];
        const total = productoSeleccionado.precio * cantidad;

        totalSpan.textContent = total.toLocaleString('es-CO'); // Formato de moneda para Colombia
    }

    // Asignar eventos
    calcularBtn.addEventListener('click', calcularTotal);

    // Cargar productos al iniciar
    cargarProductos();
});
