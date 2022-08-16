const result = document.querySelector('.result')

new URLSearchParams(window.location.search).forEach((value,name) => {
    result.append(`${name} : ${value}`)
    let br = document.createElement('br')
    result.append(br)
})