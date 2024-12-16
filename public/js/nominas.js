// Funciones para manejar nóminas
function filtrarNominas() {
    const query = document.getElementById('searchNominas').value.toLowerCase();
    const estatus = document.getElementById('estatusFiltro').value;
    const fecha = document.getElementById('fechaFiltro').value;

    document.querySelectorAll('.nomina-card').forEach(card => {
        const custodio = card.dataset.custodio.toLowerCase();
        const cardEstatus = card.dataset.estatus;
        const cardFecha = card.dataset.fecha;
        
        const matchesQuery = custodio.includes(query);
        const matchesEstatus = !estatus || cardEstatus === estatus;
        const matchesFecha = !fecha || cardFecha.includes(fecha);
        
        card.style.display = (matchesQuery && matchesEstatus && matchesFecha) ? 'block' : 'none';
    });
}

async function eliminarNomina(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta nómina? Los vales asociados se resetearán.')) {
        return;
    }

    try {
        const response = await fetch(`/nominas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (data.success) {
            window.location.reload();
        } else {
            alert(data.error || 'Error al eliminar la nómina');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la nómina');
    }
}

async function compartirWhatsApp(id) {
    try {
        const response = await fetch(`/nominas/${id}/share-whatsapp`);
        const data = await response.json();
        if (data.success) {
            window.open(data.url, '_blank');
        } else {
            alert('Error al compartir la nómina');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al compartir la nómina');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar filtros
    document.getElementById('searchNominas')?.addEventListener('input', filtrarNominas);
    document.getElementById('estatusFiltro')?.addEventListener('change', filtrarNominas);
    document.getElementById('fechaFiltro')?.addEventListener('change', filtrarNominas);
});