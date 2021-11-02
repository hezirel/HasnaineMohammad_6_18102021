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
const userNode = (user) => {
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
    user.tags.forEach((tag, index) => {
        tags.appendChild(tagNode(tag, index));
    });

    elt.addEventListener('click', function () {
        sessionStorage.setItem("displayId", user.id);
    });
    return elt;
};

const tagNode = (label, index) => {
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
        (filterSelected.indexOf(label) >= 0) ? filterSelected.splice(filterSelected.indexOf(label), 1) : filterSelected.push(label);
        drawFeed(photographers);
    })
    return elt;
};
//Reuse pattern from homepage to filter user for filtering medias.
//Event loop for this function ? No -> on change event from filter query
function drawFeed(data) {
    let node;
    window.location.pathname.split("/").pop() === "index.html" ? node = userNode : node = mediaNode;
    homeContainer.querySelectorAll(".img-card").forEach(obj => obj.remove())
    menuBar.querySelectorAll("a").forEach(obj => obj.remove())
    data.forEach((photographer, index) => {
        photographer.tags.forEach((string) => {
            !homeTagsList.includes(string) ? homeTagsList.push(string) : false;
        });
        //if filter query is true OR user.tags includes filterquery
        if (filterSelected.some((e => photographer.tags.includes(e)))|| !filterSelected[0]) {
            homeContainer.appendChild(node(photographer));
        }
    })

    homeTagsList.forEach((e, index) => menuBar.appendChild(tagNode(e, index)));
};
drawFeed(photographers);
//Homepage top bar tags display after parsing thru all object response
//#:add event listener with call to filtering function