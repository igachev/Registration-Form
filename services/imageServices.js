const preview = document.querySelector('.preview')

export function updateImage() {
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild)
    }

    const fileInput = document.querySelector('input[type=file]')
    const currentFile = fileInput.files;
    let fileSize = fileInput.files[0].size;
    let fileSizeData = calculateFileSize(fileSize);

    let image = document.createElement('img')
    let fileSizeInfo = document.createElement('p')
    fileSizeInfo.classList.add('img-info')
    fileSizeInfo.textContent = 'File Size:' + fileSizeData
    image.src = URL.createObjectURL(currentFile[0]);
    image.width = 300
    preview.appendChild(image)
    preview.appendChild(fileSizeInfo)
    
}

 function calculateFileSize(number) {
    if(number < 1024) {
        return `${number} bytes`
    }
    else if(number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`
    }
    else if(number > 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`
    }
}