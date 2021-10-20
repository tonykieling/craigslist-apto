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


// const fetch = require("node-fetch");
const data = require("../input.js");
// const dataFromDB = require("../data.js");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// it removes new lines and extar spaces in the description field
const removeXspaces = str => {
  str.replace(/\r?\n|\r/g, " ");
  return str.replace(/\s+/g,' ').trim();
}

// it gets the result-info div, extracts and returns the important data
const getDataFromDOM = item => {
  return (
    {
      postId: item.querySelector("a.result-title").getAttribute("data-id") ,
      url: item.querySelector("a.result-title").getAttribute("href"),
      description: removeXspaces(item.querySelector("a.result-title").textContent),
      price: item.querySelector("span.result-price").textContent
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
        price
      }
    ],
  changed: [
      {
        postId,
        price 
      }  
    ],
  deleted: [
      {
        postId
      }
    ],
  reactivated: [
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
            price   : fromWeb[iWeb].price,
            changed : true
          };
        }
// console.log(" 1111111 changed OBJ:", changedTemp);
        if (!fromDB[iDB].active) {
          // console.log("   got a reactivation!!!!!!!!!!!", changedTemp || fromWeb[iWeb]);
          // const reactivated = checkProperty("reactivated", fromWeb[iWeb]);

          // const k = (changed.hasOwnProperty("changed")) ? changed : fromWeb[iWeb];
          // console.log("kkkkkkkkkkkkkkkkkk", k)
          changedTemp = {
            ...(("changed" in changedTemp) ? changedTemp : fromWeb[iWeb]),
            reactivated: true
          };
// console.log("==================> temp", changedTemp);
          // changed = checkProperty("reactivated", temp);

          // result = {
          //   ...result,
          //   reactivated
          // };
        }
// console.log(" 22 changed OBJ:", changedTemp);

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
        // console.log("   got a new item", fromWeb[iWeb]);
        // const newItems = result.hasOwnProperty("newItems") 
        //   ? [...result["newItems"], fromWeb[iWeb]]
        //   : [fromWeb[iWeb]];

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

        // console.log("    property iDB:::", fromDB[iDB].active, typeof fromDB[iDB].active);
      if (iWeb === fromWeb.length - 1) {
        const deleted = checkProperty("deleted", fromDB[iDB]);
        // const deleted = result["deleted"]
        //   ? [...result["deleted"], fromDB[iDB]]
        //   : [fromDB[iDB]];

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


const generalSender = async (subject, html) => {
  try {
    await transporter.sendMail({
      from  : process.env.TK_auto,
      to   : process.env.TK,
      subject,
      html,
    });

    return true;
  } catch(error) {
    // this error is related to the email part, 
    // console.trace(error.message || message);
    return false;
  }
};


const formatEmailMessage = data => {
  console.log("==== data", data);
  let result = "";
  // for (const obj in data)
  //   result += addTable(obj, data[obj]);

  // to get message to the desired flow
  if (data.newItems)
    result += addTable("newItems", data["newItems"], (data.newItems.length > 1 && true));
  if (data.changed) {



    console.log("data.changed", data.changed);
    const flagReactivated = data.changed.filter(e => e.reactivated);
    console.log("flagReactivated:::", flagReactivated);
    result += addTable("changed", data["changed"], (data.changed.length > 1 && true), flagReactivated.length);
  }
  if (data.deleted)
    result += addTable("deleted", data["deleted"], (data.deleted.length > 1 && true));

// console.log("message to be sent:::::", result);
  return result;
};


const addTable = (title, item, multiples = false, hasReactivated = false) => {
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
        <span style="display:table-cell; text-align: center; width: 80%; border: 1px solid black"><b> Description </b> </span>
        <span style="display:table-cell; text-align: center; width:2rem; border: 1px solid black"><b> Price </b> </span>
        ${hasReactivated
          && `<span style="display:table-cell; text-align: center; width:2rem; border: 1px solid black"><b> Reactv </b> </span>`
        }
      </div>
  `;


  const content = item.map((e, i) => {
    console.log("item::::", e);
    return (`
      <a 
        style="display:table-row; border: 1px solid black; text-align: center; text-decoration: none ${e.reactivated ? "color: orange" : ""}" 
        href=${e.url} 
        target="_blank"
      >
        <span style="display:table-cell; border: 1px solid black; text-align: center; text-decoration: none; vertical-align: middle"> ${i + 1} </span>
        <span style="display:table-cell; border: 1px solid black; text-decoration: none; vertical-align: middle"> ${e.description} </span>
        <span style="display:table-cell; border: 1px solid black; text-align: center; text-decoration: none; vertical-align: middle"> ${e.price} </span>
        ${e.reactivated 
          ? "<b>&#10003; </b>"
          : ""
        }
      </a>
    `);
  });


  
  // return `<table> ${header} ${content.join("")} </table>`;
  // return `<div>${header} ${content.join("")} </div> ${footer}</div>`;
  return (`${header} ${content.join("")} </div>`);
};


const sendEmail = async (message = "msg") => {
  // it sends an email to the user confirming the procedure
  
  const today = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = (monthNames[today.getMonth()+1]) + '-' + today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const time = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min);
  const dateTime = date + ', ' + time;

  const footer = `
    <div style="margin-top:2.5rem">
      Visit <a href="https://twwebdev.ca" target="_blank">https://tkwebdev.ca</a> for more information.
    </div>
  `;
  const success = await generalSender(`new apto's info - ${dateTime}`, `<div>${message} ${footer}</div>`);
  return (success ? true : false);
};



const f = async () => {
  try {

    // it gets data from DB
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    const dataFromDB = await Apto.find();
    console.log("dataFromDB", dataFromDB.length);
    // if (1) return;


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
    
      const dataDOM = domElements.map(e => getDataFromDOM(e.querySelector(".result-info")));
      // console.log("results =>", results);
      // console.log("results.length =>", results.length);
    
    
    // console.log("dataFromDB", dataFromDB);
    // console.log("results", results, results.length);
      const newData = compareData(dataFromDB, dataDOM);
      console.log("newData => ", Object.getOwnPropertyNames(newData).length, Object.getOwnPropertyNames(newData), newData);



      // const message = formatEmailMessage(newData);
      // console.log("formatEmailMessage==>", message);
      // await sendEmail(message);
      // if (1) return;
      //  console.log("done::", message);

      // any changes happened
      // 1- send email to the admins
      // 2- record on DB
      if (Object.getOwnPropertyNames(newData).length) {
        // 1- email
        // 1.1 format message
        const message = formatEmailMessage(newData);
        // console.log("formatEmailMessage==>", message);
        await sendEmail(message);
        if (1) return;

        // 1.2 send email

        // 2- record on DB
        // it inserts new data coming from web
        // if (newData.newItems && (newData.newItems.length > 0)) {
        if (newData.newItems) {
          for (const item of newData.newItems) {
          // newData.newItems.forEach(async e => {
            const toInsert = new Apto({
              _id: new mongoose.Types.ObjectId(),
              postId      : item.postId,
              url         : item.url,
              description : item.description,
              price       : item.price
            });
            // console.log("   => tobeinsrted:", toInsert);
            
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

  } catch (error) {
    console.log("XXXXXX, error", error.message);

  } finally {
    mongoose.disconnect();
  }

  return;
}

f();
