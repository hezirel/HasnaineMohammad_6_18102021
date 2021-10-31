// elements from document
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')
const userHeader = document.querySelector('.user-header')
var displayId = 243; //parseInt(sessionStorage.getItem("displayId"));
// add verification
const data = await fetch("../data.json").then(res => res.json())
const displayUser = data.photographers.filter(obj => obj.id == displayId)[0];
// display current photographer
let filterSelected = [];
const tagNode = (label, index) => {
    var elt = document.createElement("a");
    var list = document.createElement("li");
    var sp = document.createElement("span");
    list.classList.add("link");
    filterSelected.includes(label) ? list.classList.add("active") : false;
    sp.classList.add("tag");
    sp.setAttribute("tabindex", index);
    sp.textContent = "#" + label;
    list.appendChild(sp);
    elt.appendChild(list);
    elt.addEventListener("click", () => {
        //Toggling filters in filterSelected array;
        let yndex = filterSelected.indexOf(label);
        if (yndex === -1) {
            filterSelected.push(label);
        } else {
            filterSelected.splice(yndex, 1);
        }
        elt.querySelector(".link").classList.toggle("active");
        drawMedia();
    })
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
const headerLinks = document.querySelector('.header-links')
displayUser.tags.forEach((tag) => {
    headerLinks.appendChild(tagNode(tag));
})

// contact modal
const contact = document.querySelector('.contact')
contact.addEventListener('click', function () {
    modalOverlay.classList.add('open-modal')
})

closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal')
})

// display images 
//convert to function => add verif for sort variable here
//popular by defaut. Event listener on menu list. Recall
//clear feed then draw feed (this.function) again
function drawMedia() {
    let imagesContainer = document.querySelector('.content-container')
    imagesContainer.querySelectorAll(".img-card").forEach(obj => obj.remove())
    let currentPhotographer = data.media.filter(obj => ((obj.photographerId == displayUser.id)));
    currentPhotographer.forEach(item => {
        //leave that way, adjust after compromising on new object property for path
        //#:Hacky ask backend to review naming conventions
        var name = displayUser.name.split(" ")[0];
        if (filterSelected.includes(item.tags[0]) || !filterSelected[0]) {
            imagesContainer.innerHTML += `
    <article class="img-card">
                <img class="feed-img" src="../images/${name}/${item.image}" alt="">
                <div class="card-bottom">
                    <p class="img-title">${item.title}</p>
                    <div class="like">
                        <p class="like-count">${item.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </article>
    `
        }
    })
}
drawMedia();

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