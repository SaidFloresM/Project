export const FormValidation = {
  init(form) {
    this.form = form;
    this.setupValidation();
    this.setupAutoComplete();
  },

  setupValidation() {
    this.form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
      }
    });

    this.form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  },

  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Este campo es requerido';
    } else if (input.type === 'number' && value) {
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) {
        isValid = false;
        errorMessage = 'Ingrese un número válido';
      }
    }

    this.toggleError(input, errorMessage);
    return isValid;
  },

  toggleError(input, message) {
    const container = input.closest('.form-group');
    let errorDiv = container.querySelector('.error-message');

    if (message) {
      input.classList.add('error');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        container.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
    } else {
      input.classList.remove('error');
      errorDiv?.remove();
    }
  },

  setupAutoComplete() {
    const custodioInputs = document.querySelectorAll('[data-autocomplete="custodio"]');
    custodioInputs.forEach(input => {
      input.addEventListener('input', async () => {
        const query = input.value.trim();
        if (query.length < 2) return;

        try {
          const response = await fetch(`/custodios/buscar?query=${encodeURIComponent(query)}`);
          const custodios = await response.json();
          
          const datalist = document.getElementById('custodiosList');
          datalist.innerHTML = '';
          
          custodios.forEach(custodio => {
            const option = document.createElement('option');
            option.value = custodio.nombre;
            datalist.appendChild(option);
          });
        } catch (error) {
          console.error('Error en autocompletado:', error);
        }
      });
    });
  }
};