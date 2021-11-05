const homeFeed = async () => fetch("./data.json").then(res => res.json());
const homePageDrawFeed = async () => {
    let res = await homeFeed();
    drawHomeFeed(res.photographers);
}
homePageDrawFeed();