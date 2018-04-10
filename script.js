//// upload images ////
function addImages() {
  let gallery = document.querySelector('.edit__body__upload-image__gallery')
  let files    = document.querySelector('input[type=file]').files

  function readAndAdd(file) {
    
    var reader  = new FileReader()
    reader.addEventListener("load", function () {
      let image = new Image()
      image.title = file.name
      image.height  = 100;
      image.src = this.result
      image.draggable = true
      image.ondragenter = (e) => {dragenter(e)}
      image.ondragstart = (e) => {dragstart(e)}
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

//// toggle preview image ////
function togglePreview (src) {
  let previewImage = document.querySelector('.preview__img')
  previewImage.src = src
}

//// show/hide edit page ////
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

//// draggable gallery ////
var source 
function isBefore(a, b) {
  if (a.parentNode === b.parentNode) {
    for (var current = a; current; current = current.previousSibling) {
      if (current === b) {
        return true
      }
    }
  }
  return false
}

function dragenter(e) {
  if (isBefore(source, e.target)) {
    e.target.parentNode.insertBefore(source, e.target)
  } else {
    e.target.parentNode.insertBefore(source, e.target.nextSibling)
  }
}

function dragstart(e) {
  console.log('dragsstart')
  source = e.target
  e.dataTransfer.effectAllowed = 'move'
}

//// text inputs ////
let firstName   = { name: 'First Name',     value: '', previewLocation: '.preview__text__large-inline' }
let lastName    = { name: 'Last Name',      value: '', previewLocation: '.preview__text__large-inline' }
let email       = { name: 'Email',          value: '', previewLocation: '.preview__text__small-inline' }
let website     = { name: 'Website',        value: '', previewLocation: '.preview__text__small-inline' }
let phone       = { name: 'Phone',          value: '', previewLocation: '.preview__text__small-inline' }
let companyName = { name: 'Company Name',   value: '', previewLocation: '.preview__text__medium-block' }
let address1    = { name: 'Address Line 1', value: '', previewLocation: '.preview__text__medium-block' }
let address2    = { name: 'Address Line 2', value: '', previewLocation: '.preview__text__medium-block' }

let inputs = [firstName, lastName, email, website, phone, companyName, address1, address2]

window.onload = () => {

  //// insert input fields ////
  let inputsForm = document.querySelector('.edit__body__left__form')
  inputs.forEach( input => {
    let newInput = createInput(input)
    inputsForm.appendChild(newInput)
  })

  function createInput (input) {
    let inputNode = document.createElement('input')
    inputNode.type = 'text'
    inputNode.placeholder = input.name
    inputNode.name = input.name
    inputNode.classList.add('edit__body__left__form__input')
    inputNode.oninput = () => {
      inputOninput(inputNode, input)
    }
    return inputNode
  }

  //// update preview ////
  function inputOninput (inputNode, input) {
    console.log(inputNode.value)
    let existingNode = document.querySelector('#' + input.name.replace(/ /g,''))
    if (!inputNode.value && existingNode) {
      existingNode.parentElement.removeChild(existingNode)
    } else if (existingNode) {
      existingNode.innerHTML = inputNode.value
    } else {
    let previewLocation = document.querySelector(input.previewLocation)
    let newPreviewHeading = createPreviewHeading(input)
    previewLocation.appendChild(newPreviewHeading)
    newPreviewHeading.innerHTML = inputNode.value
    }
  }

  function createPreviewHeading (input) {
    let newPreviewHeading = document.createElement('p')
    newPreviewHeading.id = input.name.replace(/ /g,'')
    newPreviewHeading.classList.add('preview__heading')
    return newPreviewHeading
  }

  //// color picker ////
  let colorPicker = document.querySelector('.edit__body__left__color-picker__input')
  colorPicker.addEventListener('input', changeColor)
  function changeColor (e) {
    let body = document.querySelector('body')
    body.style.setProperty('--secondary-color', e.target.value)
  }
}