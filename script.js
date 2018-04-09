function addImages() {
  let gallery = document.querySelector('.gallery')
  let files    = document.querySelector('input[type=file]').files

  function readAndAdd(file) {
    
    var reader  = new FileReader()
    reader.addEventListener("load", function () {
      let image = new Image()
      image.title = file.name
      image.height  = 100;
      image.src = this.result
      image.onclick = (e) => {togglePreview(e.target.src)}
      gallery.appendChild(image)
      togglePreview(this.result)
    }, false)

    reader.readAsDataURL(file)
  }

  if (files) {
    Array.from(files).forEach( function(file) { readAndAdd(file) })
  }
}

function togglePreview (src) {
  let previewImage = document.querySelector('.preview__img')
  previewImage.src = src
}

function toggleShow () {
  let edit = document.querySelector('.edit')
  let image = document.querySelector('.edit__header__img')
  if (edit.classList.length <= 1) {
    edit.classList.add('edit-hidden')
    image.classList.add('edit__header__img-hidden')
  } else {
    edit.classList.remove('edit-hidden')
    image.classList.remove('edit__header__img-hidden')
  }
}

//// text inputs ////
let fullName    = { name: 'Full Name',      value: '' }
let email       = { name: 'Email',          value: '' }
let companyName = { name: 'Company Name',   value: '' }
let address1    = { name: 'Address Line 1', value: '' }
let address2    = { name: 'Address Line 2', value: '' }
let website     = { name: 'Website',        value: '' }
let phone       = { name: 'Phone',          value: '' }
let inputs = [fullName, email, companyName, address1, address2, website, phone]

window.onload = () => {

  let inputsForm = document.querySelector('.edit__form')
  let preview = document.querySelector('.preview')

  inputs.forEach( input => {
    let newPreviewHeading = createPreviewHeading(input)
    preview.appendChild(newPreviewHeading)
    let newInput = createInput(input)
    inputsForm.appendChild(newInput)

  })
  
  function createPreviewHeading (input) {
    let newPreviewHeading = document.createElement('h4')
    newPreviewHeading.id = input.name.replace(/ /g,'')
    newPreviewHeading.classList.add('preview__heading')
    return newPreviewHeading
  }

  function createInput (input) {
    let newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.placeholder = input.name
    newInput.name = input.name
    newInput.classList.add('edit__form__input')
    newInput.oninput = () => {
      inputOninput(newInput)
    }
    return newInput
  }

  function inputOninput (input) {
    element = document.querySelector('#' + input.name.replace(/ /g,''))
    element.innerHTML = input.value
  }
}