// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container');

// PhOTOGRAPHERS DATA
let photographerTags = "";
var homeTagsList = [];

//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// DISPLAY PHOTOGRAPHERS 
const photographers = data.photographers;

//User card node constructor
const node = function (user) {
    var elt = document.createElement("article");
    elt.classList.add("user")
    elt.innerHTML += `
    <a href="./photographer-page.html?id=${user.id}">
    <section class="user-view" data-id="${user.id}">
        <img class="profile-pic" src="../images/profiles/${user.portrait}" alt="${user.name}">
        <h1 class="username">${user.name}</h1>
    </section>
</a>
<section class="user-info">
    <p class="user-loc"><span class="city">${user.city}</span>, <span class="country">${user.country}</span></p>
    <p class="user-tagline">${user.tagline}</p>
    <p class="user-price"><span class="price">${user.price}</span>€/jour</p>
    <ul class="links tags"></ul>
</section>
    `
    return elt;
};

photographers.forEach((photographer, index) => {

    photographerTags = photographer.tags;
    photographer.tags.forEach((string) => {
        if (!homeTagsList.includes(string))
            homeTagsList.push(string);
    });

    homeContainer.appendChild(node(photographer));
    //Add tags below user cards
    // Display tags inside photographers
    const tags = document.querySelectorAll('.tags');
    photographerTags.forEach((tag) => {
        tags[index].innerHTML += `
        <a href="">
            <li class="link">#<span class="tag">${tag}</span></li>
        </a>
        `
    });
    //Alternative photographer ID for profile page transmission method
/*
    const currentPhotographer = document.querySelector('.user')
    currentPhotographer.addEventListener('click', function () {
        localStorage.setItem("displayId", currentPhotographer.getAttribute('data-id'));
        })
*/

})

//Homepage top bar tags display after parsing thru all object response
//#:add event listener with call to filtering function
const menuBar = document.querySelector('.links');
homeTagsList.forEach((uniqueTag, index) => {
    var elt = document.createElement("a");
    var list = document.createElement("li");
    var sp = document.createElement("span");
    list.classList.add("link");
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = uniqueTag;
    list.appendChild(sp);
    elt.appendChild(list);
    menuBar.appendChild(elt);
})