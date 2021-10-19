// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container')

const data = await fetch("./data.json").then(res => res.json())
//#:Add error handler .then or .catch function => display http error

// PhOTOGRAPHERS DATA
let photographerId = ""
let photographerName = ""
let photographerCity = ""
let photographerCountry = ""
let photographerTagline = ""
let photographerPrice = ""
let photographerPortrait = ""
let tagsList = [];

// DISPLAY PHOTOGRAPHERS 
const photographers = data["photographers"]

photographers.forEach((photographer, index) => {
    photographerId = photographer["id"]
    photographerName = photographer["name"]
    photographerCity = photographer["city"]
    photographerCountry = photographer["country"]
    photographerTagline = photographer["tagline"]
    photographerPrice = photographer["price"]
    photographerPortrait = photographer["portrait"]
    photographer["tags"].forEach((string) => {
        if (!tagsList.includes(string)) 
            tagsList.push(string);
    })
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

    //#:All photographers tags to HTML upper tag menu selection
        //instead of being hardcoded

    // Get photographerId when clicked
    const currentPhotographer = document.querySelector('.user-view')
    currentPhotographer.addEventListener('click', function () {
        currentId = currentPhotographer.getAttribute('data-id')
    })
})
console.log(tagsList);