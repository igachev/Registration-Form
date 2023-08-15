import { calculateAge } from "../index.js"

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

})