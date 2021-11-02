sessionStorage.clear();
//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// FETCH PHOTOGRAPHERS OBJECT
const photographers = data.photographers;

// ELEMENTS FROM DOCUMENT
const homeContainer = document.querySelector('.home-container');
const menuBar = document.querySelector('.links');
let homeTagsList = [];
let filterSelected = [];

//User card node constructor
//Define object template and assign user.attr values ?
const node = (user) => {
    var elt = document.createElement("article");
    elt.classList.add("user");
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
    let tags = elt.querySelector('.tags');
    user.tags.forEach((tag) => {
        tags.appendChild(tagNode(tag));
    });

    elt.addEventListener('click', function () {
        sessionStorage.setItem("displayId", user.id);
    });
    return elt;
};

export const tagNode = (label, index) => {
    let elt = document.createElement("a");
    let list = document.createElement("li");
    let sp = document.createElement("span");
    list.classList.add("link");
    filterSelected.includes(label) ? list.classList.add("active") : list.classList.remove("active");
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = "#" + label;
    list.appendChild(sp);
    elt.appendChild(list);
    elt.addEventListener("click", () => {
        (filterSelected.indexOf(label) >= 0) ? filterSelected.splice(filterSelected.indexOf(label), 1): filterSelected.push(label);
        drawFeed();
    })
    return elt;
}

//Reuse pattern from homepage to filter user for filtering medias.
//Event loop for this function ? No -> on change event from filter query
function drawFeed() {
    homeContainer.querySelectorAll(".user").forEach(obj => obj.remove())
    menuBar.querySelectorAll("a").forEach(obj => obj.remove())

    photographers.forEach((photographer, index) => {

        //#:=> to ternary
        photographer.tags.forEach((string) => {
            if (!homeTagsList.includes(string))
                homeTagsList.push(string);
        });

        //if filter query is true OR user.tags includes filterquery
        if (photographer.tags.some((e) => filterSelected.includes(e)) || !filterSelected[0]) {
            homeContainer.appendChild(node(photographer));
        }
    })
    homeTagsList.forEach((e) => menuBar.appendChild(tagNode(e)));
};

drawFeed();
//Homepage top bar tags display after parsing thru all object response
//#:add event listener with call to filtering function
//Node constructor better innerHTML or individual attr setting ?