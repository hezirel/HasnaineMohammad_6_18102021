export const userNode = (user) => {
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
    let tags = elt.querySelector('.tags');
    user.tags.forEach((tag, index) => {
        tags.appendChild(tagNode(tag, index));
    });

    elt.addEventListener('click', function () {
        sessionStorage.setItem("displayId", user.id);
    });
    return elt;
};

export const mediaNode = (media, index) => {
    let elt = document.createElement("article");
    let displayId = parseInt(sessionStorage.getItem("displayId"));
    elt.classList.add("img-card");
    elt.innerHTML = `
    <img class="feed-img" src="../images/${displayId}/${media.image}" alt="" tabindex="${index}">
                <div class="card-bottom">
                    <p class="img-title">${media.title}</p>
                    <div class="like">
                        <p class="like-count">${media.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>`
    return elt;
};

export const tagNode = (label, index) => {
    let elt = document.createElement("a");
    let list = document.createElement("li");
    let sp = document.createElement("span");
    let filterSelected;
    sessionStorage.getItem('filters') ? filterSelected = sessionStorage.getItem('filters') : filterSelected = [];
    list.classList.add("link");
    filterSelected.includes(label) ? list.classList.add("active") : list.classList.remove("active");
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = "#" + label;
    list.appendChild(sp);
    elt.appendChild(list);
    elt.addEventListener("click", () => {
        (filterSelected.indexOf(label) >= 0) ? filterSelected.splice(filterSelected.indexOf(label), 1) : filterSelected.push(label);
        filterSelected = sessionStorage.setItem('filters', filterSelected);
    })
    return elt;
};

//Reuse pattern from homepage to filter user for filtering medias.
//Event loop for this function ? No -> on change event from filter query
export const drawFeed = (data) => {
    let node;
    let card;
    let homeTagsList = [];
    let filterSelected;
    sessionStorage.getItem('filters') ? filterSelected = sessionStorage.getItem('filters') : filterSelected = [];
    const menuBar = document.querySelector('.header-links');
    window.location.pathname.split("/").pop() === "index.html" ? (node = userNode, card = ".user") : (node = mediaNode, card = ".img-card");
    let homeContainer = window.location.pathname.split("/").pop() === "index.html" ? (document.querySelector(".home-container")) : (document.querySelector(".content-container"));
    homeContainer.querySelectorAll(card).forEach(obj => obj.remove())
    menuBar.querySelectorAll("a").forEach(obj => obj.remove())
    data.forEach((item, index) => {
        item.tags.forEach((string) => {
            !homeTagsList.includes(string) ? homeTagsList.push(string) : false;
        });
        //if filter query is true OR item.tags includes filterquery
        if (filterSelected.some((e => item.tags.includes(e))) || !filterSelected[0]) {
            homeContainer.appendChild(node(item));
        }
    })

    homeTagsList.forEach((e, index) => menuBar.appendChild(tagNode(e, index)));
};