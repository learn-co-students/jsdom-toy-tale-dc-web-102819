let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createBtn = document.getElementById('create-btn')
  createBtn.addEventListener('click', addNewToy)
  getAllToys()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
})

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => {
    json.forEach( toy => renderToy(toy))
  })
}


function renderToy(toy){
  let toyContainer = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.id = `${toy.id}-toy`
  
  let toyHeader = document.createElement('h2')
  let toyImage = document.createElement('img')
  toyImage.classList.add('toy-avatar')
  let toyTag = document.createElement('p')
  toyTag.dataset.id = toy.id
  let toyButton = document.createElement('button')
  toyButton.dataset.id = toy.id
  toyButton.id
  toyButton.addEventListener('click', likeToy)
  toyButton.classList.add('like-btn')                                                                                                                
  toyButton.innerText = 'Like <3'

  toyHeader.innerText = toy.name
  toyImage.src = toy.image
  toyTag.innerText = `${toy.likes} Likes`

  toyContainer.appendChild(toyCard)

  toyCard.appendChild(toyHeader)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(toyTag)
  toyCard.appendChild(toyButton)
}

function addNewToy(event){
  event.preventDefault()
    let form = document.querySelector('.add-toy-form')
   let name = document.getElementById('input-name').value
   let image = document.getElementById('input-type').value

   let formData = {
     name: name,
     image: image,
     likes: 0
   }

   
   let configObj = {
     method: "POST",
     headers: {
       "content-type": "application/json",
       Accept: "application/json"
     },
     body: JSON.stringify(formData)
   }

   fetch("http://localhost:3000/toys", configObj)
   .then(response => response.json())
   .then(json => renderToy(json))

   form.reset()
}

function likeToy(event){
  id = event.target.attributes[0].value
  fetch(`http://localhost:3000/toys/${id}`)
  .then(response => response.json()) 
  .then(json => {
    let likes = json.likes
    let newLikes = likes + 1
    let configObj= {
      method: 'PATCH',
      headers: {
      "Content-Type":"application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
      "likes": newLikes
      })
    }
      fetch(`http://localhost:3000/toys/${id}`, configObj)
      .then(response => response.json())
      .then(json => updateLikes(json))//updateLikes(json))
    }
    )
}

function updateLikes(json) {
  let toy = document.getElementById(`${json.id}-toy`)
  likesTag = toy.querySelector('p')
  likesTag.innerText = `${json.likes} Likes`
}
