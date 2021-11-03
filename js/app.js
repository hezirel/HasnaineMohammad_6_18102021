const homeFeed = await fetch("../data.json").then(res => res.json());
import {drawFeed} from "./const.js";
drawFeed(homeFeed.photographers);