// display current photographer
let dataFetch = async () => fetch("../data.json").then(res => res.json());
//#:Add error handler .then or .catch function => display http error

let profilePageDrawFeed = async () => {
	let database = await (dataFetch());
	let userId = parseInt(sessionStorage.getItem("displayId"));
	let displayUser = database.photographers.filter((obj => obj.id === userId))[0];
	let userMedias = database.media.filter((obj => obj.photographerId === userId));
	//COnvert user header populating into func ?
	document.querySelector(".username").textContent = displayUser.name;
	document.querySelector(".city").textContent = displayUser.city;
	document.querySelector(".country").textContent = displayUser.country;
	document.querySelector(".user-tagline").textContent = displayUser.tagline;
	document.querySelector(".profile-pic").setAttribute("src", `../images/profiles/${displayUser.portrait}`);
	document.querySelector(".modal-container > h1").textContent += ` ${displayUser.name}`;

	drawUserFeed(userMedias);

	//#:Move to drawUserFeed
	const imgTitle = document.querySelector(".slide-img-title");
	const imgCard = document.querySelectorAll(".img-card");
	const closeSlider = document.querySelector(".close-slider");
	const slides = document.querySelectorAll(".slide");

	closeSlider.addEventListener("click", function () {
		document.querySelector(".modal-slider-container").classList.toggle("open-slider");
	});

	imgCard.forEach(function (card) {
		card.addEventListener("click", function () {
			slides.forEach(function (slide, index) {
				slide.style.left = `${index * 100}%`;
			});
		});
	});

	const nextBtn = document.querySelector(".nextBtn");
	const prevBtn = document.querySelector(".prevBtn");

	let counter = 0;
	nextBtn.addEventListener("click", function () {
		counter++;
		carousel();
	});

	prevBtn.addEventListener("click", function () {
		counter--;
		carousel();
	});

	function carousel() {
		if (counter === slides.length) {
			counter = 0;
		}
		if (counter < 0) {
			counter = slides.length - 1;
		}

		slides.forEach(function (slide) {
			slide.style.transform = `translateX(-${counter * 100}%)`;
		});
	}


};
profilePageDrawFeed();

document.querySelector(".contact").addEventListener("click", function () {
	document.querySelector(".modal-overlay").classList.toggle("open-modal");
});
document.querySelector(".close-btn").addEventListener("click", function () {
	document.querySelector(".modal-overlay").classList.toggle("open-modal");
});