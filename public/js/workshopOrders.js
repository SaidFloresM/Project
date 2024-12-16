// Funciones de UI
function toggleServicios(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  content.classList.toggle('hidden');
  icon.classList.toggle('rotate-90');
}

// Funciones de API
async function eliminarOrden(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
    return;
  }

  try {
    const response = await fetch(`/workshop-orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (data.success) {
      window.location.reload();
    } else {
      alert(data.error || 'Error al eliminar la orden');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar la orden');
  }
}

// Funciones de validación
function validateForm() {
  const unidad = document.getElementById('unidad').value;
  const placas = document.getElementById('placas').value;
  const kilometraje = document.getElementById('kilometraje').value;
  const solicitante = document.getElementById('solicitante').value;

  const errors = [];

  if (!unidad) errors.push('La unidad es requerida');
  if (!placas) errors.push('Las placas son requeridas');
  if (!kilometraje || kilometraje <= 0) errors.push('El kilometraje debe ser mayor a 0');
  if (!solicitante) errors.push('El solicitante es requerido');

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return false;
  }

  return true;
}