// DATA

// HERE, THE VARIABLES FROM THE PHOTOGRAPHERS DATA ARE NOT DYNAMIC,
// TO DISPLAY THE DATA ON THE PHOTOGRAPHERS PAGE, 
// YOU SHOULD GET THE PHOTOGRAPERSID OF THE ONE CLICKED
// IN THE HOME PAGE (DONE AT THE END OF APP.JS WITH CURRENTID), 
// STORE IT IN LOCAL STORAGE, THEN, THE LINK SEND 
// YOU TO THE NEW PAGE, YOU GET THE ID BACK FROM 
// LOCAL STORAGE AND NOW YOU CAN USE THAT ID TO FILTER THE DATA
// AND DISPLAY THE RESULTING INFO AND PICTURES ON THE NEW PAGE
// AFTER GETTING THE ID BACK FORM LOCAL STORAGE,

// FILTERING SHOULD BE SOMETHING LIKE THAT :

// Get the current photographer, to extract all its data
// Get all the images of this photographer to disply them
// const imgsOfCurrentPhotographer = data["media"].filter(function (obj) {
//     if (obj["photographerId"] === currentId) {
//         return true
//     } else {
//         return false
//     }
// })

// ELEMENTS FROM DOCUMENT
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')
const userHeader = document.querySelector('.user-header')
const params = new URLSearchParams(window.location.search)
var displayId = parseInt(params.get('id'))

// Add verification
const data = await fetch("../data.json").then(res => res.json())
const displayUser = data.photographers.filter(obj => obj.id == displayId)[0];
// DISPLAY CURRENT PHOTOTGRAPHER

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
displayUser.tags.forEach(function (tag) {
    headerLinks.innerHTML += `
    <a href="">
        <li class="link">#<span class="tag">${tag}</span></li>
    </a>
    `
})


// CONTACT MODAL
const contact = document.querySelector('.contact')
contact.addEventListener('click', function () {
    modalOverlay.classList.add('open-modal')
})
closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal')
})

// DISPLAY IMAGES 
const imagesContainer = document.querySelector('.content-container')

const currentPhototgrapher = data.media.filter(obj => {
    if (obj.photographerId == displayUser.id) {
        return true
    } else {
        return false
    }
})

currentPhototgrapher.forEach(item => {
    imagesContainer.innerHTML += `
    <article class="img-card">
                <img class="feed-img" src="../images/Mimi/${item.image}" alt="">
                <div class="card-bottom">
                    <p class="img-title">${item.title}</p>
                    <div class="like">
                        <p class="like-count">${item.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </article>
    `
})


// IMAGES SLIDER
// HERE YOU SHOULD GET THE PICTURE ID WHEN CLICKED,
// AND OPEN THAT PARTICULAR PICTURE WHEN THE SLIDER ARRIVES
// YOU SHOULD USE THAT PICTURE ID TO GET THE TITLE OF THE IMG
// AND APPLY IT TO THE imgTitle.textContent
// PREV AND NEXT BUTTON SHOULD ITERATE THROUGH THE ARRAY
// CONTAINING ALL THE PICTURES
// EASY BUT AS I SAID, TON DOS X)
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