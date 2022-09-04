const result = document.querySelector('.result')

new URLSearchParams(window.location.search).forEach((value,name) => {
    let divElement = document.createElement('div')
    divElement.classList.add('div-element')
    divElement.innerHTML = `
    ${name} : ${value}
    `
    result.append(divElement)
    let br = document.createElement('br')
    result.append(br)
})