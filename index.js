const digitText = document.querySelector('.digit')
const upperText = document.querySelector('.upper')
const lengthText = document.querySelector('.length')
const lowerText = document.querySelector('.lower')
const progressBar = document.querySelector('.progress-bar')
const passwordField = document.getElementById('pass');
const usernameField = document.getElementById('username')
const dateField = document.getElementById('birthDate')
const fileInput = document.querySelector('input[type=file]')
const preview = document.querySelector('.preview')
const confirmPassword = document.getElementById('confirm-pass')
const submitBtn = document.querySelector('.submit-btn')

let alreadyIncreasedDigit = false;
let alreadyIncreasedUpper = false;
let alreadyIncreasedLength = false;
let alreadyIncreasedLower = false;
let passwordStrengthLevel = 0;



passwordField.addEventListener('keyup',checkPassword)
usernameField.addEventListener('keyup',checkUsername)
dateField.addEventListener('input',calculateAge)
fileInput.addEventListener('change',updateImage)
confirmPassword.addEventListener('input',validatePassword)
submitBtn.addEventListener('click',customValidate)

function checkPassword() {
    const passwordFieldValue = document.getElementById('pass').value;
    checkForDigit(passwordFieldValue)
    checkForUpper(passwordFieldValue)
    checkForLength(passwordFieldValue)
    checkForLower(passwordFieldValue)
    updateStrengthLevel(passwordStrengthLevel)
}

function checkUsername() {
    const usernameFieldValue = document.getElementById('username').value;
    userNameLength(usernameFieldValue)
    userNameRestrictions(usernameFieldValue)
    userNameSymbolError(usernameFieldValue)
}

function checkForDigit(passwordValue) {

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

function checkForUpper(passwordValue) {
   
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

function checkForLength(passwordValue) {
    
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

function checkForLower(passwordValue) {
    
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

function updateStrengthLevel(passwordStrengthLevel) {
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

function userNameLength(usernameFieldValue) {
    let lengthText = document.querySelector('.username-length')
    if(usernameFieldValue.length < 4) {
        lengthText.style.display = 'block'
    }
    else {
        lengthText.style.display = 'none'
    }
}

function userNameRestrictions(usernameFieldValue) {
    let restrictions = document.querySelector('.username-restrictions')
    if(usernameFieldValue.match(/[A-Za-z\d]{4,16}/g)) {
        restrictions.style.display = 'none'
    }
    else if(!usernameFieldValue.match(/[A-Za-z\d]{4,16}/g)) {
        restrictions.style.display = 'block'
    }
}

function userNameSymbolError(usernameFieldValue) {
    let errorMsg = document.querySelector('.symbols')
    if(usernameFieldValue.match(/[!@#\$%\^\&*\)\(+=._-]/g)) {
        errorMsg.style.display = 'block'
    }
    else {
        errorMsg.style.display = 'none'
    }
}

function calculateAge() {
    let date = new Date(document.getElementById('birthDate').value)
   
    let year = date.getFullYear()
    let currentYear = new Date().getFullYear();
    let age = Number(currentYear) - Number(year)
    let ageText = document.querySelector('.age')
    ageText.innerText = 'Age:'+ age;
   // console.log(year);

}

function updateImage() {
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild)
    }

    const currentFile = fileInput.files;

    let image = document.createElement('img')
    let text = document.createElement('p')
    image.src = URL.createObjectURL(currentFile[0]);
    image.width = 200
    console.log(image);
    preview.appendChild(image)
}

function validatePassword() {
    let passwordPattern = document.getElementById('confirm-pass');
    let getPasswordValue = document.getElementById('pass').value;
    //console.log(getPasswordValue);
    
    passwordPattern.setAttribute("pattern",`${getPasswordValue}`)
    //console.log(passwordPattern);
}

function customValidate() {
    validateConfirmPassword()
    validateEmail()
    validatePhoneNumber()
  }

  function validateConfirmPassword() {
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

  function validateEmail() {
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

  function validatePhoneNumber() {
    const input = document.getElementById('phone-number');
    const validityState = input.validity;
  
    if (validityState.valueMissing) {
      input.setCustomValidity('You must add your phone number!');
    } else if (validityState.patternMismatch) {
      input.setCustomValidity('Only digits are allowed!');
    }  else {
      input.setCustomValidity('');
    }
  
    input.reportValidity();
  }