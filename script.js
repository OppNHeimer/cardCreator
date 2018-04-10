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
let firstName   = { name: 'First Name',     value: '', previewLocation: '.preview__large-inline' }
let lastName    = { name: 'Last Name',      value: '', previewLocation: '.preview__large-inline' }
let email       = { name: 'Email',          value: '', previewLocation: '.preview__small-block' }
let companyName = { name: 'Company Name',   value: '', previewLocation: '.preview__medium-inline' }
let address1    = { name: 'Address Line 1', value: '', previewLocation: '.preview__small-block' }
let address2    = { name: 'Address Line 2', value: '', previewLocation: '.preview__small-block' }
let website     = { name: 'Website',        value: '', previewLocation: '.preview__small-block' }
let phone       = { name: 'Phone',          value: '', previewLocation: '.preview__small-block' }
let inputs = [firstName, lastName, email, companyName, address1, address2, website, phone]

window.onload = () => {

  let inputsForm = document.querySelector('.edit__form')
  // let preview = document.querySelector('.preview')

  inputs.forEach( input => {
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
    let inputNode = document.createElement('input')
    inputNode.type = 'text'
    inputNode.placeholder = input.name
    inputNode.name = input.name
    inputNode.classList.add('edit__form__input')
    inputNode.oninput = () => {
      inputOninput(inputNode, input)
    }
    return inputNode
  }

  function inputOninput (inputNode, input) {
    let existingNode = document.querySelector('#' + input.name.replace(/ /g,''))
    if (existingNode) {
      existingNode.innerHTML = inputNode.value
    } else {
    let previewLocation = document.querySelector(input.previewLocation)
    let newPreviewHeading = createPreviewHeading(input)
    previewLocation.appendChild(newPreviewHeading)
    newPreviewHeading.innerHTML = inputNode.value
    }
  }
}