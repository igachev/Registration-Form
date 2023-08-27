import { userNameLength,userNameRestrictions,userNameSymbolError, } from "./services/usernameServices.js";
import { checkForDigit,checkForUpper,checkForLength,checkForLower,updateStrengthLevel,validatePassword,validateConfirmPassword,passwordStrengthLevel } from "./services/passwordServices.js"
import { validateEmail } from "./services/emailServices.js";
import { validatePhoneNumber } from "./services/phoneServices.js";
import { updateImage } from "./services/imageServices.js";
import { calculateAge } from "./services/dateServices.js";

const passwordField = document.getElementById('pass');
const usernameField = document.getElementById('username')
const dateField = document.getElementById('birthDate')
const fileInput = document.querySelector('input[type=file]')
const confirmPassword = document.getElementById('confirm-pass')
const submitBtn = document.querySelector('.submit-btn')


document.addEventListener('DOMContentLoaded', () => {
passwordField.addEventListener('keyup',checkPassword)
usernameField.addEventListener('keyup',checkUsername)
dateField.addEventListener('input',calculateAge)
fileInput.addEventListener('change',updateImage)
confirmPassword.addEventListener('input',validatePassword)
submitBtn.addEventListener('click',customValidate)
})

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

function customValidate() {
    validateConfirmPassword()
    validateEmail()
    validatePhoneNumber() 
  }

  

  

 