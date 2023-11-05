const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'data.html');

const fsReadFileHtml = () => {
  return new Promise((resolve, reject) => {
      fs.readFile(htmlFilePath, 'utf8', (error, htmlString) => {
          if (!error && htmlString) {
              // const t = htmlString.replace(/<[^>]+>/g, '');
              // console.log("htmlString", t)

              resolve(htmlString);
          } else {
              reject(error);
          }
      });
  });
}

const getHtml = async () => {
  const r = await fsReadFileHtml();
  // const txt = r.text();
  // console.log("--------------------------------------------------------------------------- \n");
  // console.log("rrrrrrrrrrrrrrr ", r);
  // console.log("--------------------------------------------------------------------------- \n");
  // console.log("txt::: ", txt);
  // console.log("--------------------------------------------------------------------------- \n");

  return r;
};

module.exports = { getHtml };
