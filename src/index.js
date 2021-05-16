let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.querySelector("#toy-collection")
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetch("http://localhost:3000/toys").then(res => res.json()).then(toys => {
    toys.forEach((toy) => {
      const card = document.createElement("div")
      const h2 = document.createElement("h2")
      const p = document.createElement("p")
      const button = document.createElement("button")
      const img = document.createElement("img")
      card.append(h2, img, p, button)
      toyContainer.appendChild(card)
      card.className = "card"
      h2.textContent = toy.name
      img.src = toy.image
      img.className = "toy-avatar"
      p.textContent = `${toy.likes} Likes`
      button.className = "like-btn"
      button.id = toy.id
      button.textContent = "Like <3"
    })
  })

  function submitData(name, image, likes){
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify({name, image, likes})
    }
  
    return fetch("http://localhost:3000/toys", data).then(res => res.json()).then(console.log)

  }

  form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": document.querySelector(".add-toy-form input").value, 
        "image": document.getElementsByName("image")[0].value, 
        "likes": 0
      })
    }
  
    fetch("http://localhost:3000/toys", data).then(res => res.json()).then(toy => {
      console.log(toy)
      const card = document.createElement("div")
      const h2 = document.createElement("h2")
      const p = document.createElement("p")
      const button = document.createElement("button")
      const img = document.createElement("img")
      card.append(h2, img, p, button)
      toyContainer.appendChild(card)
      card.className = "card"
      h2.textContent = toy.name
      img.src = toy.image
      img.className = "toy-avatar"
      p.textContent = `${toy.likes} Likes`
      button.className = "like-btn"
      button.id = toy.id
      button.textContent = "Like <3"

      
      
    })
  })

  document.querySelector("#toy-collection").addEventListener("click", (e) => {
    const data = {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": parseInt(e.target.previousElementSibling.textContent) + 1
      })
    }
  fetch(`http://localhost:3000/toys/${e.target.id}`, data).then(res => res.json()).then((toy) => {
    console.log(toy)
    e.target.previousElementSibling.textContent = `${toy.likes} Likes`

  })
  })

})