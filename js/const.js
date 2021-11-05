//#:Add error handler .then or .catch function => display http error
let homeTagsList = [];
let ghPrefix = "/HasnaineMohammad_6_18102021/";
//User card node constructor
const userNode = (user, index, data) => {
    var elt = document.createElement("article");
    elt.classList.add("user");
    elt.innerHTML += `
    <a href="./pages/photographer-page.html">
    <section class="user-view" data-id="${user.id}">
        <img class="profile-pic" src="${ghPrefix}images/profiles/${user.portrait}" alt="${user.name}">
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
        tags.appendChild(tagNode(tag, index, data));
    });

    elt.addEventListener('click', function () {
        sessionStorage.setItem("displayId", user.id);
    });
    return elt;
};

const mediaNode = (media, index, data) => {
    let elt = document.createElement("article");
    elt.classList.add("img-card");
    elt.innerHTML = `
    <img class="feed-img" src="${ghPrefix}images/${media.photographerId}/${media.image}" alt="" tabindex="${index}">
                <div class="card-bottom">
                    <p class="img-title">${media.title}</p>
                    <div class="like">
                        <p class="like-count">${media.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>`
    elt.querySelector(".like").addEventListener("click", () => {
        media.likes += 1;
        drawUserFeed(data);
    })
    return elt;
};

const tagNode = (label, index, data) => {
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
        window.location.pathname.split("/").pop() === "index.html" ? (drawHomeFeed(data)) : (drawUserFeed(data));
    })
    return elt;
};

const displaySettings = () => {
    return (window.location.pathname.split("/").pop() === "index.html" ?
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

//Receive either photographers list or filtered medias list
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
            obj.homeContainer.appendChild(obj.node(item, index, data));
        }
    })
    //Homepage top bar tags display after parsing thru all object response
    homeTagsList.forEach((e, index) => menuBar.appendChild(tagNode(e, index, data)));
}

const likesSorting = (arrayToSort) => {
        arrayToSort.sort((a, b) => {
        let keyA = Number(a.likes)
        let keyB = Number(b.likes)
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    })
    return arrayToSort;
}

const dateSorting = (arrayToSort) => {
        arrayToSort.sort((a, b) => {
        let keyA = new Date(a.date).getTime();
        let keyB = new Date(b.date).getTime();
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    })
    return arrayToSort;
}

const titleSorting = (arrayToSort) => {
        arrayToSort.sort((a, b) => {
        let keyA = String(a.title)
        let keyB = String(b.title)
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    })
    return arrayToSort;
}

//Must receive prefiltered media list for user
const drawMedia = (data, filters) => {
    let arr = [data][0];
    let sortingOption = parseInt(document.getElementById("sortingOption").value);
    arr = sortingOption > 0 ? titleSorting(arr)
        : sortingOption < 0 ? likesSorting(arr)
        : dateSorting(arr);
    displayFeed(data, filters);
}

const drawUserFeed = (mediasList) => {
    //If filter selected includes tags non existing in user media feed
    // remove them from sessionStorage
    let filterSelectedExisting; 
    let userMediasTagsList = [];
    mediasList.forEach(e => {
            e.tags.forEach(tag => {
                if (!userMediasTagsList.includes(tag)) 
                    userMediasTagsList.push(tag);
                })
            })
    sessionStorage.getItem('filters') ? filterSelectedExisting = sessionStorage.getItem('filters').split(",") : filterSelectedExisting = [];
    filterSelectedExisting?.forEach((e) => !userMediasTagsList.includes(e) ? filterSelectedExisting.splice(filterSelectedExisting.indexOf(e), 1) : 0)
    document.querySelector(".dropdown").addEventListener('change', (event) => {drawMedia(mediasList, filterSelectedExisting)});
    drawMedia(mediasList, filterSelectedExisting);
}

const drawHomeFeed = (data) => {
    let filterSelected;
    sessionStorage.getItem('filters') ? filterSelected = sessionStorage.getItem('filters').split(",") : filterSelected = [];
    console.log(data);
    displayFeed(data, filterSelected);
};