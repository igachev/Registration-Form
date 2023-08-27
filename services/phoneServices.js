export function validatePhoneNumber() {
    const input = document.getElementById('phone-number');
    const validityState = input.validity;
    console.log(input.value.length);
  
    if (validityState.valueMissing) {
      input.setCustomValidity('You must add your phone number!');
    }
    else if(input.value.length > 13) {
        input.setCustomValidity('Phone Number is too long')
    }
    else if(input.value.length < 13) {
        input.setCustomValidity('Phone Number is too short')
    }
    else if (validityState.patternMismatch) {
      input.setCustomValidity('Only digits are allowed!');
    }
    else {
      input.setCustomValidity('');
    }
  
    input.reportValidity();
  }