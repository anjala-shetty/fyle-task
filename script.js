// Function to calculate tax based on age and income
function calculateTax(age, income, deductions) {
  let taxableIncome = income + deductions - 800000; // Deduct 8 Lakhs from income

  if (taxableIncome <= 0) {
      return 0; // No tax if income after deductions is under 8 Lakhs
  } else {
      let taxRate;
      if (age < 40) {
          taxRate = 0.3; // 30% tax rate for age < 40
      } else if (age >= 40 && age < 60) {
          taxRate = 0.4; // 40% tax rate for age ≥ 40 but < 60
      } else {
          taxRate = 0.1; // 10% tax rate for age ≥ 60
      }
      return taxRate * taxableIncome;
  }
}

// Function to handle form submission
function handleSubmit() {
  // Get values from form fields
  let age = document.getElementById('age').value;
  let income = parseFloat(document.getElementById('income').value);
  let extraIncome = parseFloat(document.getElementById('extra-income').value);
  let deductions = parseFloat(document.getElementById('deductions').value);

  // Validate income field
  if (isNaN(income)) {
      showErrorTooltip('income', 'Income is required');
      return;
  } else {
      hideErrorTooltip('income');
  }

  // Validate extra income field
  if (isNaN(extraIncome)) {
      showErrorTooltip('extra-income', 'Extra income must be a number');
      return;
  } else {
      hideErrorTooltip('extra-income');
  }

  // Validate age field
  if (age === '') {
      showErrorTooltip('age', 'Age group is required');
      return;
  } else {
      hideErrorTooltip('age');
  }

  // Validate deductions field
  if (isNaN(deductions)) {
      showErrorTooltip('deductions', 'Deductions must be a number');
      return;
  } else {
      hideErrorTooltip('deductions');
  }

  // Calculate tax
  let tax = calculateTax(parseInt(age), income + extraIncome, deductions);

  // Show modal with tax information
  showModal(tax);
}

// Function to show error tooltip for a specific field
function showErrorTooltip(fieldId, errorMessage) {
  let field = document.getElementById(fieldId);
  let errorIcon = document.createElement('i');
  errorIcon.classList.add('fa', 'fa-exclamation', 'design-2', 'error-icon');
  errorIcon.title = errorMessage;
  field.parentNode.appendChild(errorIcon);
}

// Function to hide error tooltip for a specific field
function hideErrorTooltip(fieldId) {
  let errorIcon = document.querySelector(`#${fieldId} + .error-icon`);
  if (errorIcon) {
      errorIcon.parentNode.removeChild(errorIcon);
  }
}

// Function to show modal with tax information
function showModal(tax) {
  let modal = document.getElementById('modal');
  let taxInfo = document.getElementById('tax-info');
  taxInfo.textContent = `Tax: ${tax.toFixed(2)} Lakhs`;
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Event listener for form submission
document.getElementById('btn').addEventListener('click', handleSubmit);

// Event listener for modal close button
document.getElementById('close-modal').addEventListener('click', closeModal);
