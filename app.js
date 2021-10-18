// I FAILED TO GET THE DATA FROM THE JSON OBJECT SO 
// I PASTED IT DIRECTLY IN HERE, OBVIOUSLY YOU SHOULD 
// NOT DO THIS BUT THAT'S TON DOS !

// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container')
const data = await fetch("./data.json").then(res => res.json())

// PhOTOGRAPHERS DATA
let photographerId = ""
let photographerName = ""
let photographerCity = ""
let photographerCountry = ""
let photographerTagline = ""
let photographerPrice = ""
let photographerPortrait = ""
let photographerTags = ""

// DISPLAY PHOTOGRAPHERS 
const photographers = data["photographers"]
photographers.forEach(function (photographer, index) {
    photographerId = photographer["id"]
    photographerName = photographer["name"]
    photographerCity = photographer["city"]
    photographerCountry = photographer["country"]
    photographerTagline = photographer["tagline"]
    photographerPrice = photographer["price"]
    photographerPortrait = photographer["portrait"]
    photographerTags = photographer["tags"]
    homeContainer.innerHTML += `
    <article class="user">
    <a href="">
        <section class="user-view" data-id="${photographerId}" tabindex="10">
            <img class="profile-pic" src="./images/Photographers ID Photos/${photographerPortrait}" alt="${photographerName}">
            <h1 class="username">${photographerName}</h1>
        </section>
    </a>
    <section class="user-info">
        <p class="user-loc"><span class="city">${photographerCity}</span>, <span class="country">${photographerCountry}</span></p>
        <p class="user-tagline">${photographerTagline}</p>
        <p class="user-price"><span class="price">${photographerPrice}</span>€/jour</p>
        <ul class="links tags"></ul>
    </section>
</article>
    `
    // Display tags inside photographers
    const tags = document.querySelectorAll('.tags')

    photographerTags.forEach(function (tag) {
        tags[index].innerHTML += `
        <a href="">
            <li class="link">#<span class="tag">${tag}</span></li>
        </a>
        `
    })

    // Get photographerId when clicked
    const currentPhotographer = document.querySelector('.user-view')
    currentPhotographer.addEventListener('click', function () {
        currentId = currentPhotographer.getAttribute('data-id')
    })
    // I would store that currentId in local storage here
    // but I'm a lazy son of a bitch :)
})