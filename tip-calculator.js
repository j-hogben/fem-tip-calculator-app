const calculatorForm = document.getElementById('tipCalculatorForm');

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CALCULATOR LOGIC ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CUSTOM INPUT RULES ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const customRadio = document.getElementById('customTipRadio');
const customAmount = document.getElementById('customTipAmount');
const otherRadios = document.querySelectorAll('.static-amount-value');

// FOCUS ON CUSTOM AMOUNT WHEN CUSTOM RADIO IS CHECKED
customRadio.addEventListener('change', () => {
  customAmount.focus();
});

// RESET CUSTOM AMOUNT IF OTHER RADIO BUTTON AMOUNT IS CHECKED
otherRadios.forEach((button) => {
  button.addEventListener('change', () => {
    customAmount.value = '';
  });
});

// IF CUSTOM AMOUNT IS EMPTY WHEN NAVIGATED AWAY FROM, HIDE TEXT INPUT
customAmount.addEventListener('blur', () => {
  if (customAmount.value === '') {
    customRadio.checked = false;
  }
});

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ RESET BUTTON ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

const resetButton = document.getElementById('reset-btn');

// RESET FORM FUNCTION
const resetForm = () => calculatorForm.reset();

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORM VALIDATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// CUSTOM VALIDATION FUNCTION
const validateForm = (formSelector) => {
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach((formGroup) => {
    const formGroupInput = formGroup.querySelector('input');

    // FOR INPUT OR BLUR EVENTS ON AN INPUT FIELD, VALIDATE THAT INPUT FIELD
    ['input', 'blur'].forEach((eventType) => {
      formGroupInput.addEventListener(eventType, () => {
        validateSingleFormGroup(formGroup);
      });
    });
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
        input.parentElement.classList.add('error-active');
      } else {
        errorContainer.textContent = '';
        input.parentElement.classList.remove('error-active');
      }
    }
  };
};

// /////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

// DISABLE HTML VALIDATION
calculatorForm.setAttribute('novalidate', '');

// RUN CUSTOM VALIDATION FUNCTION
validateForm(calculatorForm);
