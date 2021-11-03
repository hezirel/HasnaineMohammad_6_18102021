import * as Fn from './const.js';
// elements from document
const userHeader = document.querySelector('.user-header')
// add verification
// display current photographer
const homeContainer = document.querySelector('.content-container');
userHeader.innerHTML = `
<div class="user-info">
    <h1 class="username">${Fn.displayUser.name}</h1>
    <p class="user-loc"><span class="city">${Fn.displayUser.city}</span>, <span class="country">${Fn.displayUser.country}</span></p>
    <p class="user-tagline">${Fn.displayUser.tagline}</p>
    <ul class="links header-links"></ul>
</div>
<button class="btn contact">contactez-moi</button>
<img class="profile-pic mobile" src="../images/profiles/${Fn.displayUser.portrait}" alt="">
`
// contact modal
// Refactor into toggle
const modalOverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')
const contact = document.querySelector('.contact')
contact.addEventListener('click', function () {
    modalOverlay.classList.add('open-modal')
})

closeBtn.addEventListener('click', function () {
    modalOverlay.classList.remove('open-modal')
})
sessionStorage.getItem('filters') ? sessionStorage.clear('filters') : false;
// display images 
Fn.drawFeed(Fn.feed);
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