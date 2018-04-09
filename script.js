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

window.onload = () => {
  console.log('load')
}