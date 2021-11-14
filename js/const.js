let homeTagsList = [];
let ghPrefix = "../";
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
    `;
	//Add tags below user cards
	let tags = elt.querySelector(".tags");
	user.tags.forEach((tag, index) => {
		tags.appendChild(tagNode(tag, index, data));
	});

	elt.addEventListener("click", function () {
		sessionStorage.setItem("displayId", user.id);
	});
	return elt;
};

const mediaNode = (media, index, data) => {
	let elt = document.createElement("article");
	elt.classList.add("img-card");
	let src = media.image ? `${ghPrefix}images/${media.photographerId}/${media.image}` : `${ghPrefix}images/${media.photographerId}/${media.video}`;
	elt.innerHTML = media.image ? `<img class="feed-img" src="${src}" alt="${media.title}">`
		: `<video class="feed-img"><source class="videosource" src="${src}" type="video/mp4"></video>`;
	elt.innerHTML += `
                <div class="card-bottom">
                    <p class="img-title">${media.title}</p>
                    <div class="like">
                        <p class="like-count">${media.likes}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>`;
	elt.querySelector(".like").addEventListener("click", () => {
		media.likes += 1;
		drawUserFeed(data);
	});
	elt.querySelector(".feed-img").addEventListener("click", () => {
		carousel(index);
	});
	return elt;
};

const tagNode = (label, index, data) => {
	let elt = document.createElement("a");
	let list = document.createElement("li");
	let sp = document.createElement("span");
	list.classList.add("link");
	(sessionStorage.getItem("filters")?.split(","))?.includes(label) ? list.classList.add("active") : false;
	sp.classList.add("tag");
	sp.setAttribute("tabindex", 0);
	sp.textContent = "#" + label;
	list.appendChild(sp);
	elt.appendChild(list);
	elt.addEventListener("click", () => {
		let arr = label;
		if (sessionStorage.getItem("filters")) {
			let filterSelected = sessionStorage.getItem("filters");
			arr = filterSelected.split(",");
			arr.includes(label) ? arr.splice(arr.indexOf(label), 1) : arr.push(label);
		}
		sessionStorage.setItem("filters", arr);
		window.location.pathname.split("/").pop() === "index.html" ? (drawHomeFeed(data)) : (drawUserFeed(data));
	});
	return elt;
};

const carousel = (index) => {
	const medias = document.querySelectorAll(".img-card");

	index = index > medias.length - 1 ? index = 0
		: index < 0 ? index = medias.length - 1
			: index;

	const sel = medias[index];
	document.querySelector(".modal-slider-container").classList.add("open-slider");
	document.querySelector(".slide-img-title").textContent = sel.querySelector(".img-title").textContent;
	
	if (sel.querySelector("video")) {
		document.querySelector(".videosource").setAttribute("src", sel.querySelector(".videosource").getAttribute("src"));
		document.querySelector(".slider-container > video").style.display = "";
		document.querySelector(".slider-container > img").style.display = "none";
	} else {
		document.querySelector(".lightbox-img").setAttribute("src", sel.querySelector(".feed-img").getAttribute("src"));
		document.querySelector(".slider-container > video").style.display = "none";
		document.querySelector(".slider-container > img").style.display = "";
	}

	document.querySelector(".nextBtn").addEventListener("click", () => {carousel(index + 1);});
	document.querySelector(".prevBtn").addEventListener("click", () => {carousel(index - 1);});
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
		});
};

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
		});
		if (filters.some((e => item.tags.includes(e))) || !filters[0]) {
			obj.homeContainer.appendChild(obj.node(item, index, data));
		}
	});
	//Homepage top bar tags display after parsing thru all object response
	homeTagsList.forEach((e, index) => menuBar.appendChild(tagNode(e, index, data)));
};

const likesSorting = (arrayToSort) => {
	arrayToSort.sort((a, b) => {
		let keyA = Number(a.likes);
		let keyB = Number(b.likes);
		if (keyA > keyB) return -1;
		if (keyA < keyB) return 1;
		return 0;
	});
	return arrayToSort;
};

const dateSorting = (arrayToSort) => {
	arrayToSort.sort((a, b) => {
		let keyA = new Date(a.date).getTime();
		let keyB = new Date(b.date).getTime();
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});
	return arrayToSort;
};

const titleSorting = (arrayToSort) => {
	arrayToSort.sort((a, b) => {
		let keyA = String(a.title);
		let keyB = String(b.title);
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});
	return arrayToSort;
};

//Must receive prefiltered media list for user
const drawMedia = (data, filters) => {
	let arr = [data][0];
	let sortingOption = parseInt(document.getElementById("sortingOption").value);
	sortingOption > 0 ? titleSorting(arr)
		: sortingOption < 0 ? likesSorting(arr)
			: dateSorting(arr);
	displayFeed(data, filters);
};

const nonExistentTagRemover = (feed) => {
	let filterSelectedExisting; 
	let userMediasTagsList = [];
	feed.forEach(e => {
		e.tags.forEach(tag => {
			if (!userMediasTagsList.includes(tag)) 
				userMediasTagsList.push(tag);
		});
	});
	//#:Add comment to explain below operations
	sessionStorage.getItem("filters") ? filterSelectedExisting = sessionStorage.getItem("filters").split(",") : filterSelectedExisting = [];
	filterSelectedExisting?.forEach((e) => !userMediasTagsList.includes(e) ? filterSelectedExisting.splice(filterSelectedExisting.indexOf(e), 1) : 0);
	return filterSelectedExisting;
};

const drawUserFeed = (mediasList) => {
	//If filter selected includes tags non existing in user media feed
	// remove them from sessionStorage
	let filterSelected = nonExistentTagRemover(mediasList); 
	document.querySelector(".dropdown").addEventListener("change", () => {drawMedia(mediasList, filterSelected);});
	drawMedia(mediasList, filterSelected);
};

const drawHomeFeed = (data) => {
	let filterSelected = nonExistentTagRemover(data);
	displayFeed(data, filterSelected);
};