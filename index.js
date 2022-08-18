const digitText = document.querySelector('.digit')
const upperText = document.querySelector('.upper')
const lengthText = document.querySelector('.length')
const lowerText = document.querySelector('.lower')
const progressBar = document.querySelector('.progress-bar')
const passwordField = document.getElementById('pass');

let alreadyIncreasedDigit = false;
let alreadyIncreasedUpper = false;
let alreadyIncreasedLength = false;
let alreadyIncreasedLower = false;
let passwordStrengthLevel = 0;



passwordField.addEventListener('keyup',checkPassword)

function checkPassword() {
    const passwordFieldValue = document.getElementById('pass').value;
    checkForDigit(passwordFieldValue)
    checkForUpper(passwordFieldValue)
    checkForLength(passwordFieldValue)
    checkForLower(passwordFieldValue)
    updateStrengthLevel(passwordStrengthLevel)
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