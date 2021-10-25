// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container')

const data = await fetch("../data.json").then(res => res.json())
//#:Add error handler .then or .catch function => display http error

// PhOTOGRAPHERS DATA
let photographerTags = ""
var tagsList = [];

// DISPLAY PHOTOGRAPHERS 
const photographers = data["photographers"]

photographers.forEach((photographer, index) => {
    photographerTags = photographer["tags"]
    photographer["tags"].forEach((string) => {
        if (!tagsList.includes(string))
            tagsList.push(string);
    })
    //#:change this to a appendchild later
    homeContainer.innerHTML += `
    <article class="user">
    <a href="./photographer-page.html?id=${photographer.id}">
        <section class="user-view" data-id="${photographer.id}" tabindex="10">
            <img class="profile-pic" src="../images/profiles/${photographer.portrait}" alt="${photographer.name}">
            <h1 class="username">${photographer.name}</h1>
        </section>
    </a>
    <section class="user-info">
        <p class="user-loc"><span class="city">${photographer.city}</span>, <span class="country">${photographer.country}</span></p>
        <p class="user-tagline">${photographer.tagline}</p>
        <p class="user-price"><span class="price">${photographer.price}</span>€/jour</p>
        <ul class="links tags"></ul>
    </section>
</article>
    `
    // Send html data to another function with if condition depending
    //third parameter passed to foreach ?
    //Then if photographer["tags"].has filters[*]
    //append child
    // Display tags inside photographers
    const tags = document.querySelectorAll('.tags')

    photographerTags.forEach((tag) => {
        tags[index].innerHTML += `
        <a href="">
            <li class="link">#<span class="tag">${tag}</span></li>
        </a>
        `
    })

        // Get photographerId when clicked
    const currentPhotographer = document.querySelector('.user-view')
    currentPhotographer.addEventListener('click', function () {
        localStorage.setItem("displayId", currentPhotographer.getAttribute('data-id'));
    })
})

const menuBar = document.querySelector('.links');
tagsList.forEach((uniqueTag, index) => {
    menuBar.innerHTML += `
                <a href="">
                    <li class="link">#<span class="tag" tabindex="${index}">${uniqueTag}</span></li>
                </a>
    `
})