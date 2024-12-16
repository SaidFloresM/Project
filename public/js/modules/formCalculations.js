export const FormCalculations = {
  init() {
    this.setupCalculations();
    this.setupTotals();
  },

  setupCalculations() {
    document.querySelectorAll('[data-calc]').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.getAttribute('data-calc');
        this.updateTotal(group);
      });
    });
  },

  setupTotals() {
    // Inicializar totales
    ['viaticos', 'gastos'].forEach(group => this.updateTotal(group));
  },

  updateTotal(group) {
    const inputs = document.querySelectorAll(`[data-calc="${group}"]`);
    const total = Array.from(inputs).reduce((sum, input) => {
      return sum + (parseFloat(input.value) || 0);
    }, 0);

    const display = document.querySelector(`[data-calc-total="${group}"]`);
    if (display) {
      display.textContent = this.formatCurrency(total);
    }

    // Actualizar saldo pendiente si es necesario
    if (group === 'gastos') {
      this.updateSaldoPendiente();
    }
  },

  updateSaldoPendiente() {
    const viaticos = parseFloat(document.getElementById('viaticosDepositados')?.value) || 0;
    const gastos = Array.from(document.querySelectorAll('[data-calc="gastos"]'))
      .reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);
    
    const saldoPendiente = viaticos - gastos;
    const display = document.querySelector('[data-calc-total="saldo"]');
    
    if (display) {
      display.textContent = this.formatCurrency(saldoPendiente);
      display.classList.toggle('text-red-500', saldoPendiente < 0);
      display.classList.toggle('text-green-500', saldoPendiente >= 0);
    }
  },

  formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
};