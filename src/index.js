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
  .then(response => response.json())
  // .then(getAllToys => console.log(getAllToys)) 
  .then(getAllToys => {
    getAllToys.forEach(toy => RenderToys(toy))
  } )
}

function RenderToys(toy) {
  // debugger
  let toyContainer = document.getElementById("toy-collection") 

  let newToy = document.createElement("div")
  newToy.classList.add("card") 
  toyContainer.appendChild(newToy)  

  let toyNameLabel = document.createElement("h2") 
  toyNameLabel.innerText = toy.name
  let displayImage = document.createElement("img")
  displayImage.src = toy.image
  
  
  
  newToy.appendChild(toyNameLabel)  
  newToy.appendChild(displayImage)
}



{/* <div class="card">
<h2>Woody</h2>
<img src=toy_image_url class="toy-avatar" />
<p>4 Likes </p>
<button class="like-btn">Like <3</button>
</div>
  */}