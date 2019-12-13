let addToy = false

const urlPrefix = 'http://localhost:3000/toys';



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

  
  let newToyForm = document.getElementById('new-toy-form')
  newToyForm.addEventListener('submit', postToy);

  fetch(urlPrefix).then(response => response.json()).then(json => createDiv(json))
})

function createCard(toy, container) {
  let card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.id = 'card-' + toy.id;
  
  let header = document.createElement('h2');
  header.innerText = toy.name;
  let img = document.createElement('img');
  img.src = toy.image;
  img.setAttribute('class', 'toy-avatar');
  let likes = document.createElement('p');
  if (toy.likes > 1) {
    likes.innerText = toy.likes + ' Likes';
  } else if (toy.likes === 1) {
    likes.innerText = toy.likes + ' Like';
  } else {
    likes.innerText = 'Unloved toy';
  }

  let toyBtn = document.createElement('button');
  toyBtn.setAttribute('class', 'like-btn');
  toyBtn.innerText = 'Like <3';
  toyBtn.addEventListener("click", like)
  
  card.appendChild(header);
  card.appendChild(img);
  card.appendChild(likes);
  card.appendChild(toyBtn);
  
  container.appendChild(card);
}

function createDiv(db) {
  let container = document.getElementById('toy-collection');
  
  db.forEach(toy => {
    createCard(toy, container);
  })
}

function postToy(event) {
  event.preventDefault()
  
  let newName = document.getElementById('post-name').value;
  let newImg = document.getElementById('post-image').value;
  
  
  let configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name" : newName,
      "image": newImg,
      "likes": 0
    })
  }

  let container = document.getElementById('toy-collection');

  fetch(urlPrefix, configObj).then(response => response.json()).then(data => createCard(data, container))

  event.currentTarget.reset();
}

function like(event){

  let cardId = event.currentTarget.parentNode.id;
  let toyId = cardId.split('-')[1]
  let newLike = parseInt(event.currentTarget.parentNode.querySelector('p').innerText.split(" ")[0]) + 1
  
  let configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      
      "likes": newLike

    })
  }

  
  let url = urlPrefix + '/' + toyId

  fetch(url, configObj).then(response => response.json()).then(data => updateLike(cardId))


}

function updateLike(toy){

  let card = document.getElementById(toy)
  let newNumber = parseInt(card.querySelector('p').innerText.split(" ")[0]) + 1
  card.querySelector('p').innerText = newNumber + ' likes'
  
}