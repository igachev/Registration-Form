export function userNameLength(usernameFieldValue) {
    let lengthText = document.querySelector('.username-length')
    if(usernameFieldValue.length < 4) {
        lengthText.style.display = 'block'
    }
    else {
        lengthText.style.display = 'none'
    }
}

export function userNameRestrictions(usernameFieldValue) {
    let restrictions = document.querySelector('.username-restrictions')
    if(usernameFieldValue.match(/[A-Za-z\d]{4,16}/g)) {
        restrictions.style.display = 'none'
    }
    else if(!usernameFieldValue.match(/[A-Za-z\d]{4,16}/g)) {
        restrictions.style.display = 'block'
    }
}

export function userNameSymbolError(usernameFieldValue) {
    let errorMsg = document.querySelector('.symbols')
    if(usernameFieldValue.match(/[!@#\$%\^\&*\)\(+=._-]/g)) {
        errorMsg.style.display = 'block'
    }
    else {
        errorMsg.style.display = 'none'
    }
}