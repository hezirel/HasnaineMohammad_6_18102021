// elements from document
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')
const userHeader = document.querySelector('.user-header')
var displayId = parseInt(sessionStorage.getItem("displayId"));
// add verification
const data = await fetch("../data.json").then(res => res.json())
const displayUser = data.photographers.filter(obj => obj.id == displayId)[0];
const photographers = data.media.filter((obj => obj.photographerId == displayId));
// display current photographer

const homeContainer = document.querySelector('.content-container')
let filterSelected = [];
let homeTagsList = [];

//#:export module
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
        (filterSelected.indexOf(label) >= 0) ? filterSelected.splice(filterSelected.indexOf(label), 1): filterSelected.push(label);
        drawFeed(photographers);
    })
    return elt;
};

const mediaNode = (media, index) => {
    let elt = document.createElement("article");
    elt.classList.add("img-card");
    var name = displayUser.name.split(" ")[0];
    elt.innerHTML = `
    <img class="feed-img" src="../images/${name}/${media.image}" alt="" tabindex="${index}">
                <div class="card-bottom">
                    <p class="img-title">${media.title}</p>
                    <div class="like">
                        <p class="like-count">${media.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>`
    return elt;
}

userHeader.innerHTML = `
<div class="user-info">
    <h1 class="username">${displayUser.name}</h1>
    <p class="user-loc"><span class="city">${displayUser.city}</span>, <span class="country">${displayUser.country}</span></p>
    <p class="user-tagline">${displayUser.tagline}</p>
    <ul class="links header-links"></ul>
</div>
<button class="btn contact">contactez-moi</button>
<img class="profile-pic mobile" src="../images/profiles/${displayUser.portrait}" alt="">
`
const menuBar = document.querySelector('.header-links');
// contact modal
// Refactor into toggle
const contact = document.querySelector('.contact')
contact.addEventListener('click', function () {
    modalOverlay.classList.add('open-modal')
})

closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal')
})

// display images 
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
const imgTitle = document.querySelector('.slide-img-title')
const imgCard = document.querySelectorAll('.img-card')
const sliderModalContainer = document.querySelector('.modal-slider-container')
const closeSlider = document.querySelector('.close-slider')
const slides = document.querySelectorAll('.slide')

imgCard.forEach(function (card) {
    card.addEventListener('click', function () {
        sliderModalContainer.classList.add('open-slider')
        slides.forEach(function (slide, index) {
            slide.style.left = `${index * 100}%`
        })
    })
})

const nextBtn = document.querySelector('.nextBtn')
const prevBtn = document.querySelector('.prevBtn')


let counter = 0
nextBtn.addEventListener('click', function () {
    counter++
    carousel()
})

prevBtn.addEventListener('click', function () {
    counter--
    carousel()
})

function carousel() {
    if (counter === slides.length) {
        counter = 0
    }
    if (counter < 0) {
        counter = slides.length - 1
    }

    slides.forEach(function (slide) {
        slide.style.transform = `translateX(-${counter * 100}%)`
    })
}


closeSlider.addEventListener('click', function () {
    sliderModalContainer.classList.remove('open-slider')
})