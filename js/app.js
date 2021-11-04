const homeFeed = await fetch("../data.json").then(res => res.json());
drawHomeFeed(homeFeed.photographers);