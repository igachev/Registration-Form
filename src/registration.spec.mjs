import { calculateAge } from "../index.js"

describe('testing index.js file', function() {

  let birthDateElement;
  let ageTextElement;

  beforeEach(function() {
    // Create and append the birthDate input element to the document body
    birthDateElement = document.createElement("input");
    birthDateElement.setAttribute("type", "date");
    birthDateElement.setAttribute("id", "birthDate");
    document.body.appendChild(birthDateElement);

    // Create and append the age text element to the document body
    ageTextElement = document.createElement("p");
    ageTextElement.className = "age";
    document.body.appendChild(ageTextElement);

    // Attach the event listener
   // birthDateElement.addEventListener('input', calculateAge);
  });

  afterEach(function() {
    // Remove the event listener
  //  birthDateElement.removeEventListener('input', calculateAge);

    // Clean up: remove the added elements after each test
    document.body.removeChild(birthDateElement);
    document.body.removeChild(ageTextElement);
  });

  it("calculateAge() should calculate the correct age", function() {
    // Set the value of the birthDate input element
    birthDateElement.value = "2000-01-01";

    // Call the function
    calculateAge();

    // Check if the age text element contains the expected value
    expect(ageTextElement.innerText).toEqual("Age:23"); // Adjust the expected value based on the current year
  });

})