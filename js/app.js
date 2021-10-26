// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container');

// PhOTOGRAPHERS DATA
let photographerTags = "";
var homeTagsList = [];

//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// DISPLAY PHOTOGRAPHERS 
const photographers = data.photographers;

const node = function (user) {
    var elt = document.createElement("article");
    elt.classList.add("user")
    var a = document.createElement("a")
    var path = "./photographer-page.html?id=" + user.id;
    a.setAttribute("href", path)
    var sec = document.createElement("section")
    sec.classList.add("user-view")
    sec.setAttribute("data-id", user.id)
    var pic = document.createElement("img");
    pic.setAttribute("src", ("../images/profiles/" + user.portrait))
    pic.setAttribute("alt", user.name);
    pic.classList.add("profile-pic");
    var title = document.createElement("h1")
    title.classList.add("username")
    title.textContent = user.name;
    sec.appendChild(pic);
    sec.appendChild(title);
    a.appendChild(sec);
    elt.appendChild(a);
    var info = document.createElement("section");
    info.classList.add("user-info");
    var loc = document.createElement("p")
    loc.classList.add("user-loc")

/*  
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
*/
    return elt;
};

photographers.forEach((photographer, index) => {

    photographerTags = photographer.tags;
    photographer.tags.forEach((string) => {
        if (!homeTagsList.includes(string))
            homeTagsList.push(string);
    });

    homeContainer.appendChild(node(photographer));
/*     `
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
  */

    // Send html data to another function with if condition depending
    //third parameter passed to foreach ?
    //Then if photographer["tags"].has filters[*]
    //append child

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
    menuBar.innerHTML += `
                <a href="">
                    <li class="link">#<span class="tag" tabindex="${index}">${uniqueTag}</span></li>
                </a>
    `
})