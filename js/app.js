// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container');

// PhOTOGRAPHERS DATA
var homeTagsList = [];
const filterQuery = ["Sports"];

//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// FETCH PHOTOGRAPHERS OBJECT
const photographers = data.photographers;

//User card node constructor
//Define object template and assign user.attr values ?
const node = (user) => {
    var elt = document.createElement("article");
    elt.classList.add("user")
    elt.innerHTML += `
    <a href="./photographer-page.html">
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
    //Add tags below user cards
    // Display tags inside photographers
    const tags = elt.querySelector('.tags');
    user.tags.forEach((tag) => {
        tags.innerHTML += `
            <a href="">
                <li class="link">#<span class="tag">${tag}</span></li>
            </a>`
    });
    elt.addEventListener('click', function () {
        sessionStorage.setItem("displayId", user.id);
    })
    return elt;
};

//Reuse pattern from homepage to filter user for filtering medias.
//Event loop for this function ? No -> on change event from filter query
photographers.forEach((photographer, index) => {

    photographer.tags.forEach((string) => {
        if (!homeTagsList.includes(string))
            homeTagsList.push(string);
    });

    //if filter query is true OR user.tags includes filterquery
    if ((true)) {
        homeContainer.appendChild(node(photographer));
    }
    //Alternative photographer ID for profile page transmission method
})

//Homepage top bar tags display after parsing thru all object response
//#:add event listener with call to filtering function
//Node constructor better innerHTML or individual attr setting ?
const menuBar = document.querySelector('.links');
homeTagsList.forEach((uniqueTag, index) => {
    var elt = document.createElement("a");
    var list = document.createElement("li");
    var sp = document.createElement("span");
    list.classList.add("link");
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = "#" + uniqueTag;
    list.appendChild(sp);
    elt.appendChild(list);
    menuBar.appendChild(elt);
})