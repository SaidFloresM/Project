document.addEventListener('DOMContentLoaded', function() {
    // Initialize search and filter functionality
    document.getElementById('searchOrder')?.addEventListener('input', aplicarFiltros);
    document.getElementById('estadoFiltro')?.addEventListener('change', aplicarFiltros);
    document.getElementById('fechaInicio')?.addEventListener('change', aplicarFiltros);
    document.getElementById('fechaFin')?.addEventListener('change', aplicarFiltros);
});

function aplicarFiltros() {
    const searchText = document.getElementById('searchOrder').value.toLowerCase();
    const estadoFiltro = document.getElementById('estadoFiltro').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    
    document.querySelectorAll('.order-card').forEach(card => {
        const unidad = card.querySelector('.card-title').textContent.toLowerCase();
        const placas = card.querySelector('.text-muted').textContent.toLowerCase();
        const estado = card.querySelector('.badge').textContent.toLowerCase();
        const fecha = new Date(card.querySelector('.col-6:last-child span').textContent);
        
        const matchesSearch = unidad.includes(searchText) || placas.includes(searchText);
        const matchesEstado = !estadoFiltro || estado.includes(estadoFiltro);
        const matchesFecha = (!fechaInicio || fecha >= new Date(fechaInicio)) && 
                            (!fechaFin || fecha <= new Date(fechaFin));
        
        card.style.display = (matchesSearch && matchesEstado && matchesFecha) ? 'block' : 'none';
    });
}

async function eliminarOrden(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
        return;
    }

    try {
        const response = await fetch(`/workshop-orders/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            window.location.reload();
        } else {
            const error = await response.json();
            alert(error.message || 'Error al eliminar la orden');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la orden');
    }
}