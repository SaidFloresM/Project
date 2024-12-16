// Funciones de búsqueda y filtrado
const searchVales = (query) => {
  const vales = document.querySelectorAll('.vale-card');
  
  vales.forEach(vale => {
    const text = vale.textContent.toLowerCase();
    vale.style.display = text.includes(query) ? 'block' : 'none';
  });
};

const filterByStatus = (status) => {
  const vales = document.querySelectorAll('.vale-card');
  
  vales.forEach(vale => {
    if (status === 'all') {
      vale.style.display = 'block';
      return;
    }
    
    const valeStatus = vale.dataset.status;
    vale.style.display = valeStatus === status ? 'block' : 'none';
  });
};

// Función para eliminar vale
const eliminarVale = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este vale?')) {
    return;
  }

  try {
    const response = await fetch(`/vales/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      window.location.reload();
    } else {
      alert('Error al eliminar el vale');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar el vale');
  }
};