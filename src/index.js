let addToy = false
const TOYS_URL = 'http://localhost:3000/toys'


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  getToys()
  getToyForm().addEventListener('submit', createToy)
})


function getToys() {
  fetch(TOYS_URL)
  .then(res => res.json())
  .then(toys => toys.forEach(
    toy => renderToys(toy)
  ))
  // .then(toys => console.log(toys))
  .catch(err => console.log(err.message))
}

function getDivToyCollection() {
  return document.querySelector('#toy-collection')
}

function getToyForm() {
  return document.querySelector('form')
}

function renderToys(toy) {
  // console.log(toy.image);
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
  let divCard = document.createElement('div')
  divCard.classList.add('card')
  divCard.dataset.toyId = toy.id
// h2 tag with the toy's name
  let h2Tag = document.createElement('h2')
  h2Tag.innerText = toy.name
  divCard.append(h2Tag)

// img tag with the src of the toy's image attribute and the class name "toy-avatar"
  let imgTag = document.createElement('img')
  imgTag.src = toy.image
  imgTag.classList.add('toy-avatar')
  divCard.append(imgTag)

// p tag with how many likes that toy has
  let pTag = document.createElement('p')
  pTag.innerText = toy.likes + " Like(s)"
  divCard.append(pTag)

// button tag with a class "like-btn"
  let btnTag = document.createElement('button')
  btnTag.classList.add('like-btn')
  btnTag.innerText = 'Like <3'
  btnTag.dataset.id = toy.id
  divCard.append(btnTag)
  btnTag.addEventListener('click', () => {increaseLikes(toy.id, pTag)})

  let btnDelete = document.createElement('button')
  btnDelete.classList.add('like-btn')
  btnDelete.innerText = 'Delete'
  divCard.append(btnDelete)
  btnDelete.addEventListener('click', () => {
    let confiObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    // console.log(TOYS_URL + `/${toy.id}`, confiObj)
    fetch(TOYS_URL + `/${toy.id}`, confiObj)
    .then(res => {
      if (res.ok){
        const splitArray = res.url.split('/')
        const getToyId = splitArray[splitArray.length - 1]
        // console.log('remove toy card with id: ' + getToyId)
        let cardDiv = document.querySelector(`[data-toy-id="${getToyId}"]`)
        cardDiv.remove()
      } else{
        alert('Something happened we couldnt delete it.');
      }
    })
    .catch(error => console.log(error.message))
  })

  getDivToyCollection().append(divCard)
}

function createToy(e) {
  e.preventDefault()

  // console.log(e.target.image.value);
  let toyName = e.target.name.value
  let toyURL = e.target.image.value
  let likes = 0
  if (toyName !== '' && toyURL !== '') {
    let confiObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({name: toyName, image: toyURL, likes: likes})
    }
    fetch(TOYS_URL, confiObj)
    .then(res => res.json())
    .then(toy => renderToys(toy))
    .catch(err => console.log(err.message))
    // debugger
    // e.target.reset()
    getToyForm().reset()

  } else {
    alert('You must fill the fields.')
    e.target.name.focus()
  }

}

function increaseLikes(toyId, toyLikes) {
  // debugger
  // console.log('Im going to increase the likes:' + e.target.dataset.id);
  // let toyId = e.target.dataset.id
  // console.log(toyLikes);
  // debugger
  let likes = parseInt(toyLikes.innerHTML)
  likes += 1
  // debugger
  let confiObj = {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: likes})
  }

  fetch(TOYS_URL+`/${toyId}`, confiObj)
  .then(res => res.json())
  .then(toy => updatePTagLikes(toy, toyLikes))
  .catch(err => console.log(err.message))
}

function updatePTagLikes(toy, toyLikes) {
  // console.log(toyLikes);
  toyLikes.innerText = toy.likes + " Like(s)"
}
