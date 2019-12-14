let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  getToyForm().addEventListener('submit', createToy)
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


function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  // .then(getAllToys => console.log(getAllToys)) 
  .then(getAllToys => {
    getAllToys.forEach(toy => RenderToys(toy))
  } )
}

// pokemonCard.id = `pokemon-${pokemon.id}`
function RenderToys(toy) {
  let toyContainer = document.getElementById("toy-collection") 
  let newToy = document.createElement("div")
  newToy.classList.add("card") 
  toyContainer.appendChild(newToy)  
  
  let toyNameLabel = document.createElement("h2") 
  toyNameLabel.innerText = toy.name
  
  let displayImage = document.createElement("img")
  displayImage.src = toy.image
  displayImage.classList.add("toy-avatar") 


  let toyLikesLabel = document.createElement("p")
  toyLikesLabel.innerText = `${toy.likes} Likes`
  toyLikesLabel.id = `likelabel-${toy.id}`
  let toyLikeBtn = document.createElement("button")
  toyLikeBtn.classList.add("likeBtn")
  toyLikeBtn.id = `like-${toy.id}`
  toyLikeBtn.innerText = "Like ❤️️"

  newToy.addEventListener("click", increaseLikes)

  
  newToy.appendChild(toyNameLabel)  
  newToy.appendChild(displayImage)
  newToy.appendChild(toyLikesLabel)
  newToy.appendChild(toyLikeBtn) 
  
  
}

function increaseLikes(e){
  let getId = e.target.id.split("-")[1]
  let value =  parseInt(e.currentTarget.getElementsByTagName("p")[0].innerText.split(" ")[0], 10)
  value += 1
  
  
  
  fetch(`http://localhost:3000/toys/${getId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": value}) 
  })

  e.currentTarget.getElementsByTagName("p")[0].innerText = value + " likes"
  
}    




function getToyForm(){
  return document.getElementById("new-toy")
}

function createToy(e){
  e.preventDefault()
  let newToy = {"name": document.getElementById("name-input").value,
  "image": document.getElementById("url-input").value,
  "likes": 0
  }

  json_string = JSON.stringify(newToy)

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json_string
  })
  .then(res => res.json())
  .then(data => RenderToys(data))

  getToyForm().reset()
}

