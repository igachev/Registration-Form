
import { calculateAge } from "../services/dateServices.js";
import {userNameLength,userNameRestrictions,userNameSymbolError,} from "../services/usernameServices.js";
import {validatePassword,validateConfirmPassword,} from "../services/passwordServices.js"
import { validateEmail } from "../services/emailServices.js";
import { validatePhoneNumber } from "../services/phoneServices.js";

describe('testing index.js file', function() {

  let birthDateElement;
  let ageTextElement;

  beforeEach(function() {
    // BirthDate
    birthDateElement = document.createElement("input");
    birthDateElement.setAttribute("type", "date");
    birthDateElement.setAttribute("id", "birthDate");
    birthDateElement.setAttribute("max","2008-12-31")
    birthDateElement.setAttribute("min","1908-12-31")
    birthDateElement.setAttribute("required",true)
    document.body.appendChild(birthDateElement);
    ageTextElement = document.createElement("p");
    ageTextElement.className = "age";
    document.body.appendChild(ageTextElement);

    
  });

  afterEach(function() {
   
    document.body.removeChild(birthDateElement);
    document.body.removeChild(ageTextElement);
  });

  it("calculateAge() should calculate the correct age", function() {
    birthDateElement.value = "2000-01-01";
    calculateAge();
    expect(ageTextElement.innerText).toEqual("Age:23");
  });

  it('calculateAge() should validate maximum birth date',() => {
    birthDateElement.value = '2010-01-01'
    calculateAge()
    expect(birthDateElement.validity.valid).toBe(false);
    expect(birthDateElement.validationMessage).toBe('Value must be 12/31/2008 or earlier.')
  })

  it("calculateAge() should validate minimum birth date",() => {
    birthDateElement.value = '1900-01-01'
    calculateAge()
    expect(birthDateElement.validity.valid).toBe(false);
    expect(birthDateElement.validationMessage).toBe('Value must be 12/31/1908 or later.')
  })

  it('calculateAge() should be required',() => {
    birthDateElement.value = "2000-01-01";
    calculateAge();
    expect(ageTextElement.innerText).toEqual("Age:23");
    expect(birthDateElement.validity.valueMissing).toBe(false)
  })

  it('validatePassword() should set pattern attribute of #confirm-pass input to match #pass input',() => {
    let passwordInput = document.createElement('input')
    passwordInput.setAttribute("type","password")
    passwordInput.setAttribute("id", "pass");
    passwordInput.value = 'test'

    let confirmPasswordInput = document.createElement('input')
    confirmPasswordInput.setAttribute("type","password")
    confirmPasswordInput.setAttribute("id", "confirm-pass");

    document.body.appendChild(passwordInput);
    document.body.appendChild(confirmPasswordInput);

    validatePassword()

    expect(confirmPasswordInput.pattern).toBe('test')

    document.body.removeChild(passwordInput);
    document.body.removeChild(confirmPasswordInput);
  })

  it('validateConfirmPassword() should display validation message if confirm password is invalid',() => {
    let passwordInput = document.createElement('input')
    passwordInput.setAttribute("type","password")
    passwordInput.setAttribute("id", "pass");
    passwordInput.value = 'test'

    let confirmPasswordInput = document.createElement('input')
    confirmPasswordInput.setAttribute("type","password")
    confirmPasswordInput.setAttribute("id", "confirm-pass");
    confirmPasswordInput.setAttribute("required",true)
    confirmPasswordInput.setAttribute("pattern",passwordInput.value)
    confirmPasswordInput.value = 't'

    document.body.appendChild(passwordInput);
    document.body.appendChild(confirmPasswordInput);

    validateConfirmPassword()

    expect(confirmPasswordInput.validationMessage).toBe('Confirm password must be the same as password!')

    confirmPasswordInput.value = ''
    validateConfirmPassword()
    expect(confirmPasswordInput.validationMessage).toBe('You must confirm your password!')

    document.body.removeChild(passwordInput);
    document.body.removeChild(confirmPasswordInput);
  })

  it('usernameLength() should show message when username length is less than 4 and more than 16', () => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = 'ivo'

    let p = document.createElement('p')
    p.setAttribute('class','username-length')
    p.value = 'Username length must be longer than 3 and less than 17'

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameLength(usernameInput.value)

    expect(p.style.display).toBe('block')
    expect(usernameInput.validationMessage).toBe('Please match the requested format.')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('usernameLength() should hide message when username length is between 4 and 16',() => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = 'ivan'

    let p = document.createElement('p')
    p.setAttribute('class','username-length')
    p.value = 'Username length must be longer than 3 and less than 17'

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameLength(usernameInput.value)

    expect(p.style.display).toBe('none')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('usernameRestrictions() should show message when there are no lowercase letters,uppercase letters or digits',() => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = '!@#$'

    let p = document.createElement('p')
    p.value = 'Username must consist of lowercase letters,uppercase letters or digits'
    p.setAttribute('class','username-restrictions')

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameRestrictions(usernameInput.value)

    expect(p.style.display).toBe('block')
    expect(p.value).toBe('Username must consist of lowercase letters,uppercase letters or digits')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('usernameRestrictions() should hide message when there are lowercase letters,uppercase letters or digits',() => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = 'ivan'

    let p = document.createElement('p')
    p.value = 'Username must consist of lowercase letters,uppercase letters or digits'
    p.setAttribute('class','username-restrictions')

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameRestrictions(usernameInput.value)

    expect(p.style.display).toBe('none')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('userNameSymbolError() should show message when there are symbols',() => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = 'ivan@!#'

    let p = document.createElement('p')
    p.setAttribute('class','symbols')
    p.textContent = 'Do not use symbols!'

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameSymbolError(usernameInput.value)

    expect(p.style.display).toBe('block')
    expect(document.querySelector('.symbols').textContent).toBe('Do not use symbols!')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('userNameSymbolError() should hide message when there are no symbols',() => {
    let usernameInput = document.createElement('input')
    usernameInput.setAttribute('type','text')
    usernameInput.setAttribute('required',true)
    usernameInput.setAttribute('pattern',/[a-zA-Z\d]{4,16}/)
    usernameInput.setAttribute('min',4)
    usernameInput.setAttribute('max',16)
    usernameInput.value = 'ivan'

    let p = document.createElement('p')
    p.setAttribute('class','symbols')
    p.textContent = 'Do not use symbols!'

    document.body.appendChild(usernameInput)
    document.body.appendChild(p)

    userNameSymbolError(usernameInput.value)

    expect(p.style.display).toBe('none')

    document.body.removeChild(usernameInput)
    document.body.removeChild(p)
  })

  it('phone number is required',() => {
    let phoneInput = document.createElement('input')
    phoneInput.setAttribute('type','tel')
    phoneInput.setAttribute('required',true)
    phoneInput.setAttribute('pattern',/([+])?[0-9]{12}/)
    phoneInput.setAttribute('id','phone-number')
    phoneInput.value = ''

    document.body.appendChild(phoneInput)

    validatePhoneNumber()
    expect(phoneInput.validationMessage).toBe('You must add your phone number!')

    document.body.removeChild(phoneInput)
  })

  it('validatePhoneNumber() should display message if phone number length is less than 13',() => {
    let phoneInput = document.createElement('input')
    phoneInput.setAttribute('type','tel')
    phoneInput.setAttribute('required',true)
    phoneInput.setAttribute('pattern',/([+])?[0-9]{12}/)
    phoneInput.setAttribute('id','phone-number')
    phoneInput.value = '123'

    document.body.appendChild(phoneInput)

    validatePhoneNumber()
    expect(phoneInput.validationMessage).toBe('Phone Number is too short')

    document.body.removeChild(phoneInput)
  })

  it('validatePhoneNumber() should display message if phone number length is more than 13',() => {
    let phoneInput = document.createElement('input')
    phoneInput.setAttribute('type','tel')
    phoneInput.setAttribute('required',true)
    phoneInput.setAttribute('pattern',/([+])?[0-9]{12}/)
    phoneInput.setAttribute('id','phone-number')
    phoneInput.value = '123456789012345'

    document.body.appendChild(phoneInput)

    validatePhoneNumber()
    expect(phoneInput.validationMessage).toBe('Phone Number is too long')

    document.body.removeChild(phoneInput)
  })

  it('validatePhoneNumber() should display message if phone number consist of characters',() => {
    let phoneInput = document.createElement('input')
    phoneInput.setAttribute('type','tel')
    phoneInput.setAttribute('required',true)
    phoneInput.setAttribute('pattern',/([+])?[0-9]{12}/)
    phoneInput.setAttribute('id','phone-number')
    phoneInput.value = '+35987634689!'

    document.body.appendChild(phoneInput)

    validatePhoneNumber()
    expect(phoneInput.validationMessage).toBe('Only digits are allowed!')

    document.body.removeChild(phoneInput)
  })

  it('validateEmail() should display message if there is no email provided',() => {
    let emailInput = document.createElement('input')
    emailInput.setAttribute('type','email')
    emailInput.setAttribute('id','e-mail')
    emailInput.setAttribute('pattern',/^[a-z][a-z0-9_.]*@(gmail).com$/)
    emailInput.setAttribute('required',true)
    emailInput.value = '';

    document.body.appendChild(emailInput)

    validateEmail()

    expect(emailInput.validationMessage).toBe('You must add your gmail!')

    document.body.removeChild(emailInput)
  })

  it('required email should be gmail or it will display a message',() => {
    let emailInput = document.createElement('input')
    emailInput.setAttribute('type','email')
    emailInput.setAttribute('id','e-mail')
    emailInput.setAttribute('pattern',/^[a-z][a-z0-9_.]*@(gmail).com$/)
    emailInput.setAttribute('required',true)
    emailInput.value = 'ivo@abv.bg';

    document.body.appendChild(emailInput)

    validateEmail()

    expect(emailInput.value).not.toMatch(/^[a-z][a-z0-9_.]*@(gmail).com$/)
    expect(emailInput.validationMessage).toBe('Error!Gmail required!')

    document.body.removeChild(emailInput)
  })
})