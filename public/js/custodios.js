// Modal instance
let custodioModal;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap modal
    custodioModal = new bootstrap.Modal(document.getElementById('custodioModal'));
    
    // Initialize search functionality
    document.getElementById('searchCustodio')?.addEventListener('input', aplicarFiltros);
    document.getElementById('estadoFiltro')?.addEventListener('change', aplicarFiltros);
});

function showAddForm() {
    document.getElementById('modalTitle').textContent = 'Nuevo Custodio';
    document.getElementById('custodioId').value = '';
    document.getElementById('custodioForm').reset();
    custodioModal.show();
}

function editCustodio(id, nombre, numeroEmpleado, estado, telefono) {
    document.getElementById('modalTitle').textContent = 'Editar Custodio';
    document.getElementById('custodioId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('numeroEmpleado').value = numeroEmpleado;
    document.getElementById('estado').value = estado;
    document.getElementById('telefono').value = telefono || '';
    custodioModal.show();
}

async function saveCustodio(event) {
    event.preventDefault();
    
    const id = document.getElementById('custodioId').value;
    const data = {
        nombre: document.getElementById('nombre').value,
        numeroEmpleado: document.getElementById('numeroEmpleado').value,
        estado: document.getElementById('estado').value,
        telefono: document.getElementById('telefono').value
    };

    try {
        const url = id ? `/custodios/${id}` : '/custodios';
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const error = await response.json();
            alert(error.message || 'Error al guardar el custodio');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el custodio');
    }
}

async function deleteCustodio(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este custodio?')) {
        return;
    }

    try {
        const response = await fetch(`/custodios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const error = await response.json();
            alert(error.message || 'Error al eliminar el custodio');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el custodio');
    }
}

function aplicarFiltros() {
    const searchText = document.getElementById('searchCustodio').value.toLowerCase();
    const estadoFiltro = document.getElementById('estadoFiltro').value;
    
    document.querySelectorAll('.custodio-card').forEach(card => {
        const nombre = card.querySelector('.card-title').textContent.toLowerCase();
        const numero = card.querySelector('.text-muted').textContent.toLowerCase();
        const estado = card.querySelector('.badge').textContent;
        
        const matchesSearch = nombre.includes(searchText) || numero.includes(searchText);
        const matchesEstado = !estadoFiltro || estado === estadoFiltro;
        
        card.style.display = (matchesSearch && matchesEstado) ? 'block' : 'none';
    });
}