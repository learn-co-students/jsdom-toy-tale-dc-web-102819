let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
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
   .then(respomse =>  respomse.json())
   .then(data =>  {
       data.forEach(toy => renderToys(toy))
   })
}  


function renderToys(toy) {

      let toyContainer = document.getElementById('toy-collection')
      let toyCard = document.createElement("div")
      let toyheader = document.createElement("h2")
      let toyImage = document.createElement("img")
      let toyLikesLabel = document.createElement("p")
      let toyLikesButton = document.createElement("button")
      let toyDelete = document.createElement("button")

      toyCard.classList.add("card")
      toyDelete.classList.add("button")
      toyLikesButton.classList.add("like-btn")
      toyImage.classList.add("toy-avatar") 
      toyCard.id = `toy-${toy.id}` 
      
      toyheader.innerText = toy.name 
      toyDelete.innerText = "Delete"
      toyLikesLabel.innerText = `${toy.likes} Likes`
      toyLikesButton.innerText = "Like ❤️️"
      toyImage.src = toy.image
 
      toyCard.appendChild(toyheader)
      toyCard.appendChild(toyImage)
      toyCard.appendChild(toyLikesButton)
      toyCard.appendChild(toyLikesLabel)
      toyCard.appendChild(toyDelete)
      toyContainer.appendChild(toyCard) 

      toyCard.addEventListener("click" , deleteToy)
      toyLikesButton.addEventListener("click", LikeToy) 

} 


function deleteToy(event) {
  event.preventDefault()
  let card = event.currentTarget
  let cardId = card.id.split("-")[1]
  fetch(`http://localhost:3000/toys/${cardId}` , {
     method: "DELETE"
  }).then(res => card.remove()) 
  .catch(error => alert(error))
  console.log("did it come here !! ")

} 


function LikeToy(event) {
  console.log("i am glad you like me ")
} 


function deletePokemon(event) {
  let card = event.currentTarget
  let id = card.id.split("-")[1]
  fetch(`http://localhost:3000/pokemon/${id}`, {
      method: "DELETE"
  }).then(res => card.remove())
  .catch(error => alert(error))
}


