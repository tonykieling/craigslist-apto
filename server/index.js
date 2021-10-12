
const fetch = require("node-fetch");
const text = require("../output.js");


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

// const getData = item => {
//   return (
//     {
//       id: ,
//       description
//     }
//   )
// };

const f = async () => {
  // const req = await fetch(
  //   "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.22828177157375&lon=-123.01000749085641&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.9",
  //   {
  //     method: "GET"
  //   }
  // );
  // const data = await req.text();


  const dom = new JSDOM(text.output());
  // console.log("document:::", dom);
  // const items = dom.window.document.getElementsByClassName("result-row");
  const items = dom.window.document.querySelectorAll("li.result-row");

  console.log("items", items.length, items);
  //it gets two Nodelist items
  console.log(Array.from(items));

  // from each item, get:
  // url, price and description
  
  items.forEach(e => console.log("eee", e));
  for (let i = 0; i < items.length; i++){
    // const item = new JSDOM(items[i]);

    // console.log(items[i].window.document.querySelector("span.result-price").textContent);
  }
  return;
  
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
