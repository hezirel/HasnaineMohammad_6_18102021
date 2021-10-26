// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container');

// PhOTOGRAPHERS DATA
let photographerTags = "";
var homeTagsList = [];

//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// DISPLAY PHOTOGRAPHERS 
const photographers = data.photographers;

function userNodeConstructor(user) {
    var elt = document.createElement("article");
    elt.classList.add("user")
    var a = document.createElement("a")
    var path = "./photographer-page.html?id=" + user.id;
    a.setAttribute("href", path);
    elt.appendChild(a);
    console.log(elt.innerHTML);
/*     elt.a.classList.setAttribute("tabindex", "10");
    elt.a.appendChild(document.createElement("section"))
    elt.a.section.appendChild(document.createElement("img"))
    elt.a.section.appendChild(document.createElement("h1"))
    elt.appendChild(document.createElement("section"))

  */   return elt;
};

photographers.forEach((photographer, index) => {

    photographerTags = photographer.tags;
    photographer.tags.forEach((string) => {
        if (!homeTagsList.includes(string))
            homeTagsList.push(string);
    });

    //#:change this to a constructor
    var node = userNodeConstructor(photographer);

    homeContainer.appendChild(node);
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

    //Add tags below user cards
    // Display tags inside photographers
/*     const tags = document.querySelectorAll('.tags');
    photographerTags.forEach((tag) => {
        tags[index].innerHTML += `
        <a href="">
            <li class="link">#<span class="tag">${tag}</span></li>
        </a>
        `
    });
 */
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