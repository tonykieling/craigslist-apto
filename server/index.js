const fetch = require("node-fetch");
const data = require("../output.js");
const cheerio = require('cheerio');


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const dom = new JSDOM(text.output());
// console.log("document:::", dom);
// const form = dom.window.document.getElementsByClassName("result-row");
// console.log("form", form.length);
// if (1) return;
/*
// it converts txt valid html to dom structure
const stringToHTML = function (str) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  console.log("HTML XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

  // console.log("------------------------html", str);
	const html = new JSDOM(str);
	return html;
};
*/

const getData = item => {
  // console.log("item", item);
  // const $ = cheerio.load('<h2 class="title" href="asd">Hello world</h2>');
  // console.log("item", $(".title").attr("href"));

  const $ = cheerio.load(item);
  console.log("item", $(".result-heading").attr("href"));
  
  // const tempItem = new JSDOM(item);
  // console.log("tempItem", tempItem);
  // console.log("item", tempItem.window.document.querySelector(".result-heading"));
  return("a");
  // return (
  //   {
  //     postId: ,
  //     url: ,
  //     description: ,
  //     price
  //   }
  // );
};

const f = async () => {
  // it gets data from craigslist and transform it into text
//   const req = await fetch(
//     "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.22828177157375&lon=-123.01000749085641&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.9",
//     {
//       method: "GET"
//     }
//   );
//   const data = await req.text();
// console.log(data, data);

  // // it converts the data into a tex format to a dom structure
  // const dom = new JSDOM(data);

  // // gets only the result to be handled
  // const domElements = dom.window.document.querySelectorAll("li.result-row");

  // console.log("domElements", domElements.length, domElements);
  // //it gets 5 Nodelist items

  const dom = cheerio.load(data);
  const domElements = dom(".result-row");
  console.log(domElements.length);
  
  const items=[];
  for (let i = 0; i < domElements.length; i++) {
    const tempData = getData(domElements[i]);
    items.push(tempData);
  }
return;


  // const items = [];
  domElements.forEach(e => {
    const tempData = getData(e);
    items.push(tempData);
  });
console.log("items==>", items);

  const id = dom.window.document.querySelector("#postid_7380919325").textContent;
  console.log("id", id);
  return;


  // from each item, get:
  // url, price and description
  items.forEach(e => console.log("eee", e));
  for (let i = 0; i < items.length; i++){
    // console.log(Array.from(items[i]));
    // const temp = JSON.serialize(items[i]);
    // console.log("temp", temp);
    const item = new JSDOM(items[i]);
    // return item;
console.log("item", item)
    // console.log(item.window.document.querySelector("span.result-price").innerHTML);
    console.log(item.window.document.getElementById("#postid_7380919325").href);
  }
  // return;
  
  for (let i=0; i < items.length; i++) {
    const li = new JSDOM(items[i].innerHTML);
    // const li = items[i].window.document.querySelector("span.result-price");
    console.log(" ==", li.innerHTML)
    const price = li.window.document.querySelector("span.result-price");
    // const price = li.window.document.getElementsByClassName("result-price").textContent;
    console.log("111111111111", items[i], "22222222222222", price);
  }
if(1) return;

/*
  const data = text;
  // console.log("-----------------data", data.output());
  const dom = stringToHTML(data.output());
  console.log("dom", dom);
  
  // const result = dom.window.document.querySelector("#search-results");
  const result = dom.window.document.querySelector(".result-row");
  // const result = dom.window.document.getElementById("search-results");

  console.log("results===", result.length);
  const lis = result.getElementByClass("result-row");
  console.log("lis", lis.length);
  // const results = result.getElementsByTagName("li");

  // const result = dom.window.document.querySelector("#search-results");
  // const t = stringToHTML(result);
  // cost results = dom.window.document

  // const results = dom.window.document.getElementsByClassName("result-title hdrlnk");
  // console.log("result.length===>", result.length);
  for (let i=0; i < result.length; i++) {
    console.log("   = result[i]", result[i]);
  }
*/

  const arrayOfElements = [...result];
  console.log("arrayOfElements", arrayOfElements[0]);
  // arrayOfElements.forEach((e, i) => console.log(e.outerText));
  // arrayOfElements.forEach((e, i) => console.log(`=>${i + 1} => ${ e.href }`));
  // arrayOfElements.forEach((e, i) => console.log(`=>${i + 1} => ${ e }`));
}

f();
