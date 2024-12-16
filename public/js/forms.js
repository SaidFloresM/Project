// Importar módulos
import { FormNavigation } from './modules/formNavigation.js';
import { FormValidation } from './modules/formValidation.js';
import { FormCalculations } from './modules/formCalculations.js';

// Inicializar formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-main form');
  if (form) {
    FormNavigation.init();
    FormValidation.init(form);
    FormCalculations.init();
  }
});