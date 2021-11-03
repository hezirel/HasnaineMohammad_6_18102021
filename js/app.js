//#:Add error handler .then or .catch function => display http error
const data = await fetch("../data.json").then(res => res.json());

// FETCH PHOTOGRAPHERS OBJECT
const photographers = data.photographers;

// ELEMENTS FROM DOCUMENT
//User card node constructor
//Define object template and assign user.attr values ?
import * as Fn from './const.js';
Fn.drawFeed(photographers);
//Homepage top bar tags display after parsing thru all object response
//#:add event listener with call to filtering function