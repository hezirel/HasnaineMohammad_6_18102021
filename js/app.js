const homeFeed = async () => await fetch("../data.json").then(res => res.json());
const answer = async () => {
    let res = await homeFeed();
    console.log('answer');
    drawHomeFeed(res.photographers);
}
answer();