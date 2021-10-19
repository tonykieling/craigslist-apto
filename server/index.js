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
const data = require("../output.js");
const dataFromDB = require("../data.js");

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
  for (const obj in data) {
    console.log("OBJJJJ", data[obj]);
    // result += data[obj].map(e => addTable(e));
    result += addTable(obj, data[obj]);
  }
  return result;
};

const addTable = (title, item) => {
  console.log("item", item);
  const header = `
    <h2 style="color:${title === 'newItems' 
      ? 'blue'
      : title === 'changed'
        ? 'green'
        : title === 'deleted'
          ? 'red'
          : 'orange'}">
      ${title === "newItems" 
        ? "New postings"
        : title === "changed"
          ? "Posting changed"
          : title === "deleted"
            ? "Posting been deleted by the owner"
            : "Posting been reactived"}
    </h2>
    <div style="display: table">
      <div style="display:table-row; width:100%">
        <span style="display:table-cell; width:1rem"> # </span>
        <span style="display:table-cell; width:80%"> Description </span>
        <span style="display:table-cell; width:2rem"> Price </span>
      </div>
  `;


  const content = item.map((e, i) => {
    // console.log("item::::", item);
    return (`
      <a style="display:table-row" href=${e.url} target="_blank">
        <span style="display:table-cell"> ${i + 1} </span>
        <span style="display:table-cell"> ${e.description} </span>
        <span style="display:table-cell"> ${e.price} </span>
      </a>
    `);
  });

  const footer = `
    <div style="margin-top:2rem">
      Visit <a href="https://twwebdev.ca" target="_blank">https://tkwebdev.ca</a> for more information.
    </div>
  `;
  
  // return `<table> ${header} ${content.join("")} </table>`;
  return `<div>${header} ${content.join("")} </div> ${footer}</div>`;
};




const sendEmail = async (message = "msg") => {
  // it sends an email to the user confirming the procedure
  
  const today = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = (monthNames[today.getMonth()+1])+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  const dateTime = date + ', ' + time;
  const success = await generalSender(`new apartment's info - ${dateTime}`, message);
  return (success ? true : false);
};

const f = async () => {
  try {

    // // it gets data from DB
    // await mongoose.connect(process.env.DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true 
    // });

    // const dataFromDB = await Apto.find();
    // console.log("dataFromDB", dataFromDB.length);


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
      // console.log("newData => ", Object.getOwnPropertyNames(newData).length, Object.getOwnPropertyNames(newData), newData);



      const message = formatEmailMessage(newData);
      console.log("formatEmailMessage==>", message);
      await sendEmail(message);
      // const message = await sendEmail();
      if (1) return;
       console.log("done::", message);

      // any changes happened
      // 1- send email to the admins
      // 2- record on DB
      if (Object.getOwnPropertyNames(newData).length) {
        // 1- email
        // 1.1 format message
        // const message = formatEmailMessage(newData);
        // console.log("formatEmailMessage==>", message);

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
                  price     : item.changed ? item.price : undefined,
                  changed   : item.changed ? true : undefined,
                  reactivated : item.reactivated || undefined,
                  active    : item.reactivated || undefined
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
