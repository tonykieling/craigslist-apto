// const fetch = require("node-fetch");
const data = require("../output.js");


const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// it removes new lines and extar spaces in the description field
const removeXspaces = str => {
  str.replace(/\r?\n|\r/g, " ");
  return str.replace(/\s+/g,' ').trim();
}

// it gets the result-info div, extracts and returns the important data
const getData = item => {
  return (
    {
      postId: item.querySelector("a.result-title").getAttribute("data-id") ,
      url: item.querySelector("a.result-title").getAttribute("href"),
      description: removeXspaces(item.querySelector("a.result-title").textContent),
      price: item.querySelector("span.result-price").textContent
    }
  );
};

const f = async () => {
//   // it gets data from craigslist and transform it into text
//   const req = await fetch(
//     "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.22828177157375&lon=-123.01000749085641&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.9",
//     {
//       method: "GET"
//     }
//   );
//   const data = await req.text();
// // console.log(data, data);


  // using jsdom
  // it converts the data into a tex format to a dom structure
  const dom = new JSDOM(data);

  // gets only the result to be handled
  const domElements = [...dom.window.document.querySelectorAll("li.result-row")];

  const results = domElements.map(e => getData(e.querySelector(".result-info")));
  console.log("results =>", results);
  console.log("results.length =>", results.length);

  return;
}

f();
