const digitText = document.querySelector('.digit')
const upperText = document.querySelector('.upper')
const lengthText = document.querySelector('.length')
const lowerText = document.querySelector('.lower')
const progressBar = document.querySelector('.progress-bar')

let alreadyIncreasedDigit = false;
let alreadyIncreasedUpper = false;
let alreadyIncreasedLength = false;
let alreadyIncreasedLower = false;
export let passwordStrengthLevel = 0;

export function checkForDigit(passwordValue) {

    if(passwordValue.match(/\d/g)) {
        if(!alreadyIncreasedDigit) {
        alreadyIncreasedDigit = true;
        digitText.style.display = 'none';
        const computedStyle = getComputedStyle(progressBar)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
        progressBar.style.setProperty('--width',width+20)
        passwordStrengthLevel++
    }
   
}

  else if(!passwordValue.match(/\d/g)) {
     if(alreadyIncreasedDigit) {
    alreadyIncreasedDigit = false;
    digitText.style.display = 'block';
    const computedStyle = getComputedStyle(progressBar)
    const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
    progressBar.style.setProperty('--width',width-20)
    passwordStrengthLevel--
   }
}

}

export function checkForUpper(passwordValue) {
   
        if(passwordValue.match(/[A-Z]/g)) {
            if(!alreadyIncreasedUpper) {
            alreadyIncreasedUpper = true;
            upperText.style.display = 'none'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width+20)
            passwordStrengthLevel++
        }
    }

       else if(!passwordValue.match(/[A-Z]/g)) {
             if(alreadyIncreasedUpper) {
            alreadyIncreasedUpper = false;
            upperText.style.display = 'block'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width-20)
            passwordStrengthLevel--
        }
    }
}

export function checkForLength(passwordValue) {
    
        if(passwordValue.match(/.{8}/g)) {
            if(!alreadyIncreasedLength) {
            alreadyIncreasedLength = true;
           lengthText.style.display = 'none'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width+20)
            passwordStrengthLevel++
        }
    }

   
       else if(!passwordValue.match(/\.{8}/g)) {
           if(alreadyIncreasedLength) {
            alreadyIncreasedLength = false;
            lengthText.style.display = 'block'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width-20)
            passwordStrengthLevel--
        }
    }
}

export function checkForLower(passwordValue) {
    
        if(passwordValue.match(/[a-z]/g)) {
            if(!alreadyIncreasedLower) {
            alreadyIncreasedLower = true;
            lowerText.style.display = 'none'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width+20)
            passwordStrengthLevel++
        }
    }

       else if(!passwordValue.match(/[a-z]/g)) {
            if(alreadyIncreasedLower) {
            alreadyIncreasedLower = false;
            lowerText.style.display = 'block'
            const computedStyle = getComputedStyle(progressBar)
            const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
            progressBar.style.setProperty('--width',width-20)
            passwordStrengthLevel--
        }
    }
}

export function updateStrengthLevel(passwordStrengthLevel) {
    let currentPasswordLevel = document.querySelector('[data-label]')
    if(passwordStrengthLevel < 2) {
        currentPasswordLevel.dataset.label = 'Low'
        document.querySelector('[data-label]').style.color = 'white'
    }
    else if(passwordStrengthLevel >= 2 && passwordStrengthLevel < 4) {
        currentPasswordLevel.dataset.label = 'Medium'
        document.querySelector('[data-label]').style.color = 'yellow'
    }
    else if(passwordStrengthLevel === 4) {
        currentPasswordLevel.dataset.label = 'High'
        document.querySelector('[data-label]').style.color = 'orange'
    }
}

export function validatePassword() {
    let passwordPattern = document.getElementById('confirm-pass');
    let getPasswordValue = document.getElementById('pass').value;
    //console.log(getPasswordValue);
    
    passwordPattern.setAttribute("pattern",`${getPasswordValue}`)
    //console.log(passwordPattern);
}

export function validateConfirmPassword() {
    const input = document.getElementById('confirm-pass');
    const validityState = input.validity;
  
    if (validityState.valueMissing) {
      input.setCustomValidity('You must confirm your password!');
    } else if (validityState.patternMismatch) {
      input.setCustomValidity('Confirm password must be the same as password!');
    }  else {
      input.setCustomValidity('');
    }
  
    input.reportValidity();
  }