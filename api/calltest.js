console.log("calltest.js");

(async() => {
  const data = require("./getHtml.js");
  const html = await data.getHtml();
  console.log("first: ", html);
})();
