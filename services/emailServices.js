export function validateEmail() {
    const input = document.getElementById('e-mail');
    const validityState = input.validity;
  
    if (validityState.valueMissing) {
      input.setCustomValidity('You must add your gmail!');
    } else if (validityState.patternMismatch) {
      input.setCustomValidity('Error!Gmail required!');
    }  else {
      input.setCustomValidity('');
    }
  
    input.reportValidity();
  }