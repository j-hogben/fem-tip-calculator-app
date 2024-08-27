const formElement = document.getElementById('tipCalculatorForm');
const textInputs = formElement.querySelectorAll('input[type="text"]');

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORM VALIDATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const validateForm = (formSelector) => {
  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    validateAllFormGroups();
  });

  // VALIDATION OPTIONS
  const validationOptions = [
    {
      attribute: 'required',
      isValid: (input) => input.value.trim() !== '',
      errorMessage: "Can't be zero",
    },
  ];

  // VALIDATE A SINGLE FORM GROUP
  const validateSingleFormGroup = (formGroup) => {
    const input = formGroup.querySelector('input');
    const errorContainer = formGroup.querySelector('.error');

    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage;
      } else {
        errorContainer.textContent = '';
      }
    }
  };

  // VALIDATE ALL THE FORM GROUPS
  const validateAllFormGroups = (formToValidate) => {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };
};

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// DISABLE HTML VALIDATION
formElement.setAttribute('novalidate', '');

validateForm(formElement);
