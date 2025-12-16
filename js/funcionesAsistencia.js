// Object to store loaded apprentices
const fichasData = {};

// Cargar fichas al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarFichas();
});

// Función para cargar las fichas en el select
function cargarFichas() {
    const selectFichas = document.getElementById('fichas');
    
    // Limpiar opciones existentes
    selectFichas.innerHTML = '<option value="">-- Seleccione una ficha --</option>';
    
    // Cargar fichas desde archivo de texto
    fetch('fichas.txt')
        .then(response => response.text())
        .then(data => {
            // Dividir por líneas y filtrar vacías
            const fichas = data.trim().split('\n').filter(line => line.trim() !== '');
            
            fichas.forEach(line => {
                const parts = line.split(' ');
                const fichaNumber = parts[0];
                const option = document.createElement('option');
                option.value = fichaNumber;
                option.textContent = line;
                selectFichas.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error cargando archivo de fichas:', error);
            alert('Error al cargar la lista de fichas');
        });
}

// Función para cargar aprendices según la ficha seleccionada
function cargarAprendices() {
    const fichaSeleccionada = document.getElementById('fichas').value;
    const listaAprendices = document.getElementById('ListaAprendices');
    
    // Limpiar tabla
    listaAprendices.innerHTML = '';
    
    if (!fichaSeleccionada) {
        return;
    }
    
    // Cargar aprendices desde archivo de texto
    const nombreArchivo = 'fichas' + fichaSeleccionada + '.txt';
    
    fetch(nombreArchivo)
        .then(response => response.text())
        .then(data => {
            // Dividir por líneas y filtrar vacías
            const aprendices = data.trim().split('\n').filter(line => line.trim() !== '');
            
            // Guardar en el objeto fichasData para usar en guardarAsistencia()
            fichasData[fichaSeleccionada] = aprendices;
            
            // Crear filas en la tabla
            aprendices.forEach((aprendiz, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${aprendiz.trim()}</td>
                    <td style="text-align: center;">
                        <input type="checkbox" id="asistencia_${index}" class="asistencia-checkbox">
                    </td>
                `;
                listaAprendices.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error cargando archivo:', error);
            alert('Error al cargar la lista de aprendices');
        });
}

// Función para guardar asistencia
function guardarAsistencia() {
    const fichaSeleccionada = document.getElementById('fichas').value;
    
    if (!fichaSeleccionada) {
        alert('Por favor seleccione una ficha');
        return;
    }
    
    const checkboxes = document.querySelectorAll('.asistencia-checkbox');
    const asistencia = [];
    const aprendices = fichasData[fichaSeleccionada];
    
    if (!aprendices) {
        alert('Por favor cargue los aprendices primero');
        return;
    }
    
    checkboxes.forEach((checkbox, index) => {
        asistencia.push({
            aprendiz: aprendices[index],
            presente: checkbox.checked
        });
    });
    
    // Aquí puedes enviar los datos al servidor
    console.log('Asistencia guardada:', asistencia);
    alert('Asistencia guardada correctamente');
    
    // Opcional: Enviar al servidor
    // enviarAsistenciaAlServidor(fichaSeleccionada, asistencia);
}

// Función opcional para enviar al servidor
function enviarAsistenciaAlServidor(ficha, asistencia) {
    fetch('guardar_asistencia.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ficha: ficha,
            asistencia: asistencia,
            fecha: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => console.error('Error:', error));
}
