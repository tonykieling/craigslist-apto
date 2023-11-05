const postId= [
  "https://vancouver.craigslist.org/van/apa/d/vancouver-brm-bsmt-3mths-only-pets-okay/7684144311.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-new-cozy-bachelor-suite-for/7684128055.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-bedroom-condo-near-queen/7684092281.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-bedroom-condo-near-queen/7684092281.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7683900780.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7681546075.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-basement-suite/7683846527.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-one-bedroom-fraser-east-49th/7674868731.html",
  "https://vancouver.craigslist.org/van/apa/d/vancouver-furnished-garden-suite-for/7682882271.html"
]


const getId = () => {
  postId.forEach(e => {
    let temp = e.split("/");
    console.log("temp", temp, temp.at(-1));
    const fileName = temp[temp.length - 1];
    console.log("fileName: ", fileName)
    temp = fileName.split(".");
    console.log("temp", temp, temp[0], "\n\n");
  });
}

getId();