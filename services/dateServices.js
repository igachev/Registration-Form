export function calculateAge() {
    let date = new Date(document.getElementById('birthDate').value)
   
    let year = date.getFullYear()
    let currentYear = new Date().getFullYear();
    let age = Number(currentYear) - Number(year)
    let ageText = document.querySelector('.age')
    ageText.innerText = 'Age:'+ age;
   // console.log(year);

}