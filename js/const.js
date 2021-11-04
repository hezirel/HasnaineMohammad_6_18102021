//#:Add error handler .then or .catch function => display http error
const db = await fetch("../data.json").then(res => res.json());
let homeTagsList = [];
//User card node constructor
const userNode = (user) => {
    var elt = document.createElement("article");
    elt.classList.add("user");
    elt.innerHTML += `
    <a href="./pages/photographer-page.html">
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

const mediaNode = (media, index) => {
    let elt = document.createElement("article");
    elt.classList.add("img-card");
    elt.innerHTML = `
    <img class="feed-img" src="../images/${media.photographerId}/${media.image}" alt="" tabindex="${index}">
                <div class="card-bottom">
                    <p class="img-title">${media.title}</p>
                    <div class="like">
                        <p class="like-count">${media.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>`
    return elt;
};

const tagNode = (label, index, id) => {
    let elt = document.createElement("a");
    let list = document.createElement("li");
    let sp = document.createElement("span");
    list.classList.add("link");
    (sessionStorage.getItem('filters')?.split(","))?.includes(label) ? list.classList.add("active") : false;
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = "#" + label;
    list.appendChild(sp);
    elt.appendChild(list);
    elt.addEventListener("click", () => {
        let arr = label;
        if (sessionStorage.getItem('filters')) {
            let filterSelected = sessionStorage.getItem('filters');
            arr = filterSelected.split(",");
            arr.includes(label) ? arr.splice(arr.indexOf(label), 1) : arr.push(label);
        }
        sessionStorage.setItem('filters', arr);
        window.location.pathname.split("/").pop() === "index.html" ? (drawHomeFeed(db.photographers)) : (drawUserFeed(db.media.filter((obj => obj.photographerId === id))));
    })
    return elt;
};

const displaySettings = () => {
    return (window.location.pathname.split("/").pop() == "index.html" ?
    {
        node: userNode,
        card: ".user",
        homeContainer: document.querySelector(".home-container"),
    } : {
        node: mediaNode,
        card: ".img-card",
        homeContainer: document.querySelector(".content-container"),
    })
}

const displayFeed = (data, filters) => {
    let obj = displaySettings();
    let menuBar = document.querySelector(".header-links");
    obj.homeContainer.querySelectorAll(obj.card)?.forEach(obj => obj.remove());
    menuBar.querySelectorAll("a")?.forEach(obj => obj.remove());
    data.forEach((item, index) => {
        item.tags.forEach((string) => {
            if (!homeTagsList.includes(string)) 
                homeTagsList.push(string);
        })
        if (filters.some((e => item.tags.includes(e))) || !filters[0]) {
            obj.homeContainer.appendChild(obj.node(item));
        }
    })
    //Homepage top bar tags display after parsing thru all object response
    homeTagsList.forEach((e, index) => menuBar.appendChild(tagNode(e, index, data[0].photographerId)));
}

const drawMedia = (data, filters) => {
    // add sorting
    displayFeed(data, filters);
}

export const drawUserFeed = (mediasList) => {
    let filterSelectedExisting; 
    sessionStorage.getItem('filters') ? filterSelectedExisting = sessionStorage.getItem('filters').split(",") : filterSelectedExisting = [];
    filterSelectedExisting ? mediasList.forEach((e) => {
        if (!e.tags.includes())
    })
    //if filters selected contains tag that are not found in user media list, remove it
    drawMedia(mediasList, filterSelectedExisting);
}
//Reuse pattern from homepage to filter user for filtering medias.
//Event loop for this function ? No -> on change event from filter query
export const drawHomeFeed = (data) => {
    let filterSelected;
    sessionStorage.getItem('filters') ? filterSelected = sessionStorage.getItem('filters').split(",") : filterSelected = [];
    //make this function specific to index.html
    // call another function than drawFeed on profile ?
    displayFeed(data, filterSelected);
};