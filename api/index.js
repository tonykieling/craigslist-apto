require('dotenv').config();

const mongoose    = require("mongoose");
const nodemailer  = require("nodemailer");

// Apto schema
const Apto = mongoose.model("Apto", mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    
    postId: {
      type: String
    },
    url: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: String
    },
    location: {
      type: String
    },
    active: {
      type    : Boolean,
      default : true
    },
    changed: {
      type    : Boolean,
      default : false
    },
    reactivated: {
      type    : Boolean,
      default : false
    }
  })
);

const fetch = require("node-fetch");


// it removes new lines and extar spaces in the description field
const removeXspaces = str => {
  str.replace(/\r?\n|\r/g, " ");
  return str.replace(/\s+/g,' ').trim();
}

// it gets the result-info div, extracts and returns the important data
const getDataFromDOM = (item, location) => {
  return (
    {
      postId: item.querySelector("a.result-title").getAttribute("data-id") ,
      url: item.querySelector("a.result-title").getAttribute("href"),
      description: removeXspaces(item.querySelector("a.result-title").textContent),
      price: item.querySelector("span.result-price").textContent,
      location
    }
  );
};


/*
it will check and compare the data from web vs DB
and returns an object with 3 array properties:
result: {
  newItems: [
      {
        postId,
        url,
        description,
        price,
        location
      }
    ],
  changed: [
      {
        postId,
        price,
        reactived,
        location
      }  
    ],
  deleted: [
      {
        postId
      }
    ]
  }
*/
const compareData = (fromDB, fromWeb) => {
  // it adds the item for the right place in the object that will be the return of compareData function
  const checkProperty = (property, item) => {
    return (
      // three ways to check whether a property belongs to an object
      // result[property]
      // (property in result)
      result.hasOwnProperty(property)
        ? [...result[property], item]
        : [item]
    );
  };

  let result = {};  
  // check the data coming from web against db's data 
  // to see whether there are new or changed items
  for(let iWeb = 0; iWeb < fromWeb.length; iWeb++) {
    if (fromDB.length === 0) {
      const newItems = checkProperty("newItems", fromWeb[iWeb]);
      result = {
        ...result,
        newItems
      };
    }

    for (let iDB = 0; iDB < fromDB.length; iDB++) {
      if (fromWeb[iWeb].postId === fromDB[iDB].postId) {
        //it is gonna check only price changing


        let changedTemp = {};
        if  (fromWeb[iWeb].price !== fromDB[iDB].price) {

          changedTemp = {
            ...fromWeb[iWeb],
            // price   : fromWeb[iWeb].price,
            priceNow: fromWeb[iWeb].price,
            priceOld: fromDB[iDB].price,
            changed : true
          };
        }
        
        if (!fromDB[iDB].active) {
          changedTemp = {
            ...(("changed" in changedTemp) ? changedTemp : fromWeb[iWeb]),
            reactivated: true
          };

        }

        if (("changed" in changedTemp) || ("reactivated" in changedTemp)) {
          const changed = checkProperty("changed", changedTemp);
          result = {
            ...result,
            changed
          };
        }


        break;
      }
      
      if ((iDB === fromDB.length - 1) || (fromDB.length === 0)) {
        const newItems = checkProperty("newItems", fromWeb[iWeb]);
        result = {
          ...result,
          newItems
        };
      }
    }
  }

  // it checks the data from db against data from web to see whether there are deleted ones
  for(let iDB = 0; iDB < fromDB.length; iDB++) {
    if (!fromDB[iDB].active) continue;
    for (let iWeb = 0; iWeb < fromWeb.length; iWeb++) {
      if (fromDB[iDB].postId === fromWeb[iWeb].postId)
        break;

      if (iWeb === fromWeb.length - 1) {
        const deleted = checkProperty("deleted", fromDB[iDB]);
        result = {
          ...result,
          deleted
        };
      }
    }
  }

  return result;
}



// functions to send email (5 in total)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.password
  }
});


const generalSender = async (subject, html, siki = false) => {
  try {
    await transporter.sendMail({
      from  : process.env.TK_auto,
      to    : process.env.TK,
      cc    : siki ? process.env.Si : null,
      subject,
      html,
    });

    return true;
  } catch(error) {
    // this error is related to the email part, 
    // console.log(error.message || message);
    return false;
  }
};


const formatEmailMessage = data => {
  // console.log("==== data", data);
  let result = "";
  // for (const obj in data)
  //   result += addTable(obj, data[obj]);

  // to get message to the desired flow
  if (data.newItems)
    result += addTable("newItems", data["newItems"], (data.newItems.length > 1 && true));
  if (data.changed) {



    // console.log("data.changed", data.changed);
    const flagPriceChanged = data.changed.filter(e => e.priceOld);
    const flagReactivated = data.changed.filter(e => e.reactivated);

    // console.log("flagReactivated:::", flagReactivated);
    result += addTable("changed", data["changed"], (data.changed.length > 1 && true), flagReactivated.length, flagPriceChanged);
  }
  if (data.deleted)
    result += addTable("deleted", data["deleted"], (data.deleted.length > 1 && true));

// console.log("message to be sent:::::", result);
  return result;
};


const addTable = (title, item, multiples = false, hasReactivated = false, priceChanged = false) => {
  const header = `
    <h2 style="${title === "newItems" 
      ? "color: blue"
      : title === "changed"
        ? "color: green; margin-top: 1rem"
        : title === "deleted"
          ? "color: red; margin-top: 1rem"
          : "color: orange; margin-top: 1rem"}; margin-bottom: 0.5rem; margin-top: 2rem">
      ${title === "newItems" 
        ? `New posting${multiples ? "s" : ""}`
        : title === "changed"
          ? `Changed Posting${multiples ? "s" : ""}`
          : multiples ? "Deleted Postings by the owner" : "Deleted Postings by the owner"
        }
    </h2>
    <div style="display: table; border-collapse: collapse; border: 2px solid black; width: 95%">
      <div style="display:table-row; width:100%; border: 1px solid black">
        <span style="display:table-cell; text-align: center; width:1rem; border: 1px solid black"><b> # </b> </span>
        <span style="display:table-cell; text-align: center; width: 75%; border: 1px solid black"><b> Description </b> </span>
        <span style="display:table-cell; text-align: center; width: 2rem; border: 1px solid black"><b> Place </b> </span>

        ${priceChanged
          ? 
            `<span style="display:table-cell; text-align: center; width: 2rem; border: 1px solid black"><b> $ old </b> </span>
            <span style="display:table-cell; text-align: center; width: 2rem; border: 1px solid black"><b> $ now </b> </span>`
          
          : `<span style="display:table-cell; text-align: center; width:2rem; border: 1px solid black"><b> Price </b> </span>`
        }
        ${hasReactivated
          ? `<span style="display:table-cell; text-align: center; width:2rem; border: 1px solid black"><b> Reactv </b> </span>`
          : ""
        }
      </div>
  `;


  const content = item.map((e, i) => {
    return (`
      <a 
        style="display:table-row; border: 1px solid black; text-align: center; text-decoration: none; ${e.reactivated ? "color: orange" : ""}" 
        href=${e.url} 
        target="_blank"
      >
        <span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
          ${i + 1} 
        </span>
        <span style="display:table-cell; border: 1px solid black; vertical-align: middle"> ${e.description} </span>
        <span style="display:table-cell; border: 1px solid black; vertical-align: middle"> ${e.location} </span>

        ${ e.priceNow
            ? 
              `<span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
                  ${e.priceOld}
              </span>
              <span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
                ${e.priceNow}
              </span>`
            :
              `<span style="display:table-cell; border: 1px solid black;"></span>
              <span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
                ${e.price}
              </span>`
        }
        ${hasReactivated
          ? `<span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
              ${e.reactivated
                ? "<b> &#10003; </b>"
                : ""
              }
            </span>`
          : ""
        }
      </a>
    `);
  });


  
  // return `<table> ${header} ${content.join("")} </table>`;
  // return `<div>${header} ${content.join("")} </div> ${footer}</div>`;
  return (`${header} ${content.join("")} </div>`);
};


const sendEmail = async (message = "<div>default msg</div>", updateInfo = false, siki = false) => {
  // it sends an email to the user confirming the procedure
  
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Canada/Pacific"}));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = (monthNames[today.getMonth()]) + '-' + today.getDate();
  
  const hour = today.getHours();
  const min = today.getMinutes();
  const time = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min);
  const dateTime = date + ', ' + time;

  const footer = `
    <div style="margin-top:2.5rem">
      Visit <a href="https://cl-aptos.tkwebdev.ca" target="_blank">https://cl-aptos.tkwebdev.ca</a> for more information.
    </div>
  `;
  const success = await generalSender(`${updateInfo ? "Apto's update" : "New apto"} - ${dateTime}`, `<div>${message} ${footer}</div>`, siki);
  return (success ? true : false);
};



// const f = async () => {
module.exports = async(req, res) => {
  try {
    // it gets data from DB
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    const dataFromDB = await Apto.find();

    const { method } = req;

    switch(method) {

      // case for receiving request to execute the queries
      case "POST":
        {
          /*
          if (process.env.app_password !== req.headers.authorization.split(" ")[1]) 
            break;
*/


          const queries = [
            {
              location: "Patterson",
              url: "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.22789608809298&lon=-123.01077174761237&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.7"
            },
            {
              location: "Joyce",
              url: "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.237509680216846&lon=-123.02994489669801&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.4"
            },
            {
              location: "29th",
              url: "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.24460894085901&lon=-123.04670348335357&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.3"
            },
            {
              location: "Nanaimo",
              url: "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.24855720299385&lon=-123.0563888765191&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.2"
            }
          ];
          
          let dataFromWeb = [];
          try {
            // it gets data from craigslist and transform it into text
            /*
            const req = await fetch(
              "https://vancouver.craigslist.org/search/apa?availabilityMode=0&lat=49.22789608809298&lon=-123.01077174761237&max_price=1850&min_price=1100&sale_date=all%20dates&search_distance=0.7",
              {
                method: "GET"
              }
            );
            data = await req.text();
          */



            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;


            for (let i = 0; i < queries.length; i++) {
              let addItem = {};
              const response = await fetch(queries[i]["url"]);
              const html = await response.text();
// console.log("******************************************************************html", html);
              const dom = new JSDOM(html);
              const domElements = [...dom.window.document.querySelectorAll("li.result-row")];
              
              addItem = domElements.map(e => getDataFromDOM(e.querySelector(".result-info"), queries[i].location));

              dataFromWeb = [...dataFromWeb, ...addItem];
            }

          } catch(error) {
            throw (error.message || error);
          }

// const dataFromDB = [];
const newData = compareData(dataFromDB, dataFromWeb);
// console.log("newData--------------", newData);

// if (1) return res.json({message: newData});
          






//           // using jsdom
//           /*
//           const jsdom = require("jsdom");
//           const { JSDOM } = jsdom;
//           */
//           // it converts the data into a tex format to a dom structure
//           const dom = new JSDOM(data);
          
//           // gets only the result to be handled
//           const domElements = [...dom.window.document.querySelectorAll("li.result-row")];
          
//           const dataDOM = domElements.map(e => getDataFromDOM(e.querySelector(".result-info")));
// console.log("dataDOM", dataDOM);
// // const dataFromDB = [];
//           // const newData = compareData(dataFromDB, dataDOM);
// if (1) return res.json({newData});







        
          // any changes detected
          // 1- send email to the admins
          // 2- record on DB
          if (Object.getOwnPropertyNames(newData).length) {
            // 1- email
            // 1.1 format message
            const message = formatEmailMessage(newData);
            // 1.2 send email
            await sendEmail(message, updateInfo = ((newData.changed || newData.deleted) && true), siki = true);

            // 2- record on DB
            // it inserts new data coming from web
            if (newData.newItems) {
              for (const item of newData.newItems) {
                const toInsert = new Apto({
                  _id: new mongoose.Types.ObjectId(),
                  postId      : item.postId,
                  url         : item.url,
                  description : item.description,
                  price       : item.price,
                  location    : item.location
                });
                
                await toInsert.save();
              }
            }

            // it updates data coming from web about item changed
            if (newData.changed) {
              for (const item of newData.changed) {
                await Apto
                  .updateOne(
                    { postId: item.postId },
                    {
                      price       : item.changed ? item.price : undefined,
                      changed     : item.changed ? true : undefined,
                      active      : item.reactivated || undefined,
                      reactivated : item.reactivated || undefined
                    }
                  );
              }
            }

            // it updates deleted data
            if (newData.deleted) {
              for (const item of newData.deleted) {
                await Apto
                  .updateOne(
                    { postId: item.postId },
                    {
                      active : false
                    }
                  );
              }
            }
          }

          throw({message: "OK, just checking, all good ;)"});
        }


        case "GET": {
          console.log("dataFromDB:::", dataFromDB.length);
          return res.json({apartments: dataFromDB});
        }

        // it is gonna update data regarding a specific record
        case "PATCH": {

        }

        default:
          console.log("does not apply");
      }
  } catch (error) {
    // it is temporary until understand how github actions works
    await sendEmail(`<div>${error.message || error}</div>`);

    res.json({message: error.message || error});


  } finally {
    mongoose.disconnect();
  }

  return;
}

