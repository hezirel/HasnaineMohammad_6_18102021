const homeFeed = await fetch("../data.json").then(res => res.json());
import {drawHomeFeed} from "./const.js";
drawHomeFeed(homeFeed.photographers);