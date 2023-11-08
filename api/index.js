require('dotenv').config();

const mongoose    = require("mongoose");
const nodemailer  = require("nodemailer");
const fetch       = require("node-fetch");


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
    oldPrice: {
      type: String,
      default: "0"
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
    },
    removedByAdmin: {
      type    : Boolean,
      default : false,
    },
    reasonRemovedFromAdmin: {
      type    : String
    },
    lastUpdate: {
      type  : String
    }
  })
);

// it removes new lines and extar spaces in the description field
const removeXspaces = str => {
  str.replace(/\r?\n|\r/g, " ");
  return str.replace(/\s+/g,' ').trim();
}

// it gets the result-info div, extracts and returns the important data
const getDataFromDOM = (item) => {
  // it gets only the number (suppose to be the id, from the url)
  const href = item.querySelector("a").getAttribute("href");
  let temp = href.split("/");
  // console.log("temp", temp, temp.at(-1));
  const fileName = temp[temp.length - 1];
  // console.log("fileName: ", fileName)
  temp = fileName.split(".");
  return (
    {
      postId: temp[0],
      url: item.querySelector("a").getAttribute("href"),
      description: removeXspaces(item.querySelector(".title").textContent),
      price: item.querySelector(".price").textContent,
      location: removeXspaces(item.querySelector(".location").textContent)
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
// console.log("data from web:\n", fromWeb.length, "\ndata from DB:\n", fromDB.length);

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
  
  // when DB is empty
  if (fromDB.length === 0) {
    fromWeb.forEach(e => {
      // console.log("item::: ", e.postId, {...e, active: true});
      // const newItems = checkProperty("newItems", {...e, active: true});
      const newItems = checkProperty("newItems", e);
      result = {
        ...result,
        newItems
      };
    });
    
    return result;
  }

  for(let iWeb = 0; iWeb < fromWeb.length; iWeb++) {      
    if(fromDB[fromWeb[iWeb].postId] && fromDB[fromWeb[iWeb].postId].removedByAdmin) continue;

    for (let iDB = 0; iDB < fromDB.length; iDB++) {

      if (fromWeb[iWeb].postId === fromDB[iDB].postId) {
        if (fromDB[iDB].removedByAdmin) break;
        //it is gonna check only price changing

        let changedTemp = {};
        if  (fromWeb[iWeb].price !== fromDB[iDB].price) {

          changedTemp = {
            ...fromWeb[iWeb],
            price   : fromWeb[iWeb].price,
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

      if (iDB === fromDB.length - 1) {
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
    if (fromDB[iDB].removedByAdmin) continue;
    if (!fromDB[iDB].active) continue;
    for (let iWeb = 0; iWeb < fromWeb.length; iWeb++) {
      if (fromDB[iDB].postId === fromWeb[iWeb].postId)
        break;

      if (iWeb === (fromWeb.length - 1)) {
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

  // to get message to the desired flow
  if (data.newItems && data.newItems.length)
    result += addTable("newItems", data["newItems"], (data.newItems.length > 1 && true));


  if (data.changed && data.changed.length) {
    // console.log("data.changed", data.changed);
    const flagPriceChanged = data.changed.filter(e => e.priceOld);
    const flagReactivated = data.changed.filter(e => e.reactivated);

    // console.log("flagReactivated:::", flagReactivated);
    result += addTable("changed", data["changed"], (data.changed.length > 1 && true), flagReactivated.length, flagPriceChanged);
  }

  if (data.deleted && data.deleted.length)
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

        ${ e.priceOld
            ? 
              `<span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
                  ${e.priceOld}
              </span>
              <span style="display:table-cell; border: 1px solid black; text-align: center; vertical-align: middle"> 
                ${e.price}
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


const sendEmail = async (
  title = "",
  message = "<div>it is a default msg</div>",
  siki = false
) => {
  const dateTime = getDateTime();
  
  title = (
          title === "update" 
            ? "Apto's update" 
            : title === "new" 
              ? "New apto" 
              : title
          ) 
            + ` - ${dateTime}`

  // it sends an email to the user confirming the procedure
  const footer = `
    <div style="margin-top:2.5rem">
      Visit <a href="https://home-seeker.tkwebdev.ca" target="_blank">https://home-seeker.tkwebdev.ca</a> for more information.
    </div>
  `;
  const success = await generalSender(title, `<div>${message} ${footer}</div>`, siki);
  return (success ? true : false);
};


// format a string as date and time regarding Vancouver time
const getDateTime = () => {
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Canada/Pacific"}));
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = (monthNames[today.getMonth()]) + ' ' + today.getDate() + ", " + today.getFullYear();
  
  const hour = today.getHours();
  const min = today.getMinutes();
  const time = (hour < 10 ? `0${hour}` : hour) + ":" + (min < 10 ? `0${min}` : min);
  const dateTime = date + ' @' + time;
  return dateTime;
};


// const f = async () => {
module.exports = async(req, res) => {
  try {
    // it gets data from DB
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    const { method } = req;
    let dataFromDB;

    if (method !== "PATCH")
      dataFromDB = await Apto.find().sort({ lastUpdate: -1});
      // sorting by lastUpdate
      // as not all register has it, it will go by _id
      // it seems to be working the sorting by lastUpdate, even though it is a string, for instance "Nov-7, 20:49"

    // const resurts = dataFromDB.map(e => e._id);
    // console.log("dataFromDB", "process.env.app_password");
    // if (1)
    //   return res.json({message: dataFromDB});

    switch(method) {
      // case for receiving request to execute the queries
      case "POST":
        {
          if (process.env.app_password !== req.headers.authorization.split(" ")[1]) 
            break;

          // the code below is meant to cleanup the database because the system is not querying anymore - it already has done its job
          // if the system needs to run, the lines below have to be commented
          // it takes the active records and set them as 
          //    active                  = false
          //    removedByAdmin          = true
          //    reasonRemovedFromAdmin  = automatically removed by the admin

          /* on Postman
            POST /api HTTP/1.1
            Host: localhost:3001
            Content-Type: application/json
            Authorization: Bearer 'this is the real password not typed here'
            Host: localhost:3001
            {
              "cleanup": "yeah"
            }
          */

          /*
          if (req.body.cleanup) {
            // turns out I was not using $set on UpdateOne. It duplicates the records and messed up my mind :/ :D
            console.log("running cleanup");
            
            const onlyActiveRecords = dataFromDB.filter(e => e.active );

            console.log("number of active records", onlyActiveRecords.length);
            // onlyActiveRecords.forEach((e, i) => console.log(`${i} => ${e.postId}`));
            // console.log("onlyActiveRecords", onlyActiveRecords);
            for (const item of onlyActiveRecords) {
              // console.log("  ==***> ", item.postId);
              const update = await Apto
                .updateOne(
                  { 
                    postId: item.postId 
                  },
                  {
                    $set: {
                      active                : false,
                      removedByAdmin        : true,
                      reasonRemovedFromAdmin: "automatically removed by the admin for cleanup purpose"
                    }
                  }
                );
              console.log("update", update);
              // const update = await Apto
              //   .find({ 
              //     postId: item.postId,
              //     lastUpdate: "TO BE REMOVED"
              //   });
              // console.log("update", update);


              // to remove duplicate records
              // const toDelete = await Apto
              //   .remove(
              //     { 
              //       postId: item.postId,
              //       lastUpdate: "TO BE REMOVED"
              //      }
              //   );
              // console.log("toDelete", toDelete);
            }

            return res.json({ message: "that's it! DB cleanedup!"});
          }
          // end of cleanup code
          */

          const queries = require("./queries.js");
          
          let dataFromWeb = [];

          try {
            // it gets data from craigslist and transform it into text
            const jsdom = require("jsdom");
            const { JSDOM } = jsdom;


            for (let i = 0; i < queries.length; i++) {
              let addItem = {};
              const response = await fetch(queries[i]["url"]);
              const html = await response.text();

              const dom = new JSDOM(html);

              const domElements = [...dom.window.document.querySelectorAll(".cl-static-search-result")];
              addItem = domElements.map(e => getDataFromDOM(e, queries[i].location));
              dataFromWeb = [...dataFromWeb, ...addItem];
            }

          } catch(error) {
            console.log("Error:::::::: ", error);
            throw ("###Error on getting data from Cragslist: " + " " + error.message || error);
          }
// dataFromWeb = [
//   {
//     postId: '7684144311',
//     url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-brm-bsmt-3mths-only-pets-okay/7684144311.html',
//     description: '2 brm bsmt - 3mths only - Pets Okay',
//     price: '$2,000',
//     location: 'Hillcrest/ Main St'
//   },
//   {
//     postId: '7684128055',
//     url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-new-cozy-bachelor-suite-for/7684128055.html',
//     description: 'New Cozy Bachelor Suite for one person near Oakridge and Langara',
//     price: '$1,880',
//     location: 'Vancouver'
//   },
//   {
//     postId: '7684092281',
//     url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-bedroom-condo-near-queen/7684092281.html',
//     description: '1 Bedroom Condo near Queen Elizabeth Park',
//     price: '$1,800',
//     location: 'Vancouver'
//   },
//   // {
//   //   postId: '7683900780',
//   //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7683900780.html',
//   //   description: 'Garden Furnished Main Floor suite in a house utilities included',
//   //   price: '$2,000',
//   //   location: 'Main & 29th Avenue'
//   // },
//   // {
//   //   postId: '7681546075',
//   //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7681546075.html',
//   //   description: 'Garden Furnished Main Floor suite in house including utilities',
//   //   price: '$2,000',
//   //   location: 'Main & 29th'
//   // }
// ];
          const newData = compareData(dataFromDB, dataFromWeb);
// console.log("newData- ", newData)
        
          // any changes detected
          // 1- send email to the admins
          // 2- record on DB
          if (Object.getOwnPropertyNames(newData).length) {
            // 1- email
            // 1.1 format message

            const message = formatEmailMessage(newData);
            // 1.2 send email

            const title = ((newData.changed || newData.deleted) ? "update" : "new");
            
            await sendEmail(title, message, true);
            // await sendEmail(title, message);

            const dateTime = getDateTime();
// console.log("dateTime-------- ", dateTime)
            // 2- record on DB
            // it inserts new data coming from web
            if (newData.newItems && newData.newItems.length) {
              for (const item of newData.newItems) {
                const toInsert = new Apto({
                  _id: new mongoose.Types.ObjectId(),
                  postId      : item.postId,
                  url         : item.url,
                  description : item.description,
                  price       : item.price,
                  location    : item.location,
                  lastUpdate  : dateTime,
                  active      : item.active
                });
                
                await toInsert.save();
              }
            }

            // it updates data coming from web about item changed
            if (newData.changed && newData.changed.length) {
              for (const item of newData.changed) {
                await Apto
                  .updateOne(
                    { postId: item.postId },
                    {
                      $set: {
                        price       : item.price,
                        oldPrice    : item.changed ? item.priceOld : undefined,
                        changed     : item.changed ? true : undefined,
                        active      : item.reactivated || undefined,
                        reactivated : item.reactivated || undefined,
                        lastUpdate  : dateTime
                      }

                    }
                  );
              }
            }

            // it updates deleted data
            if (newData.deleted && newData.deleted.length) {
              for (const item of newData.deleted) {
                await Apto
                  .updateOne(
                    { postId: item.postId },
                    {
                      $set: {
                        active    : false,
                        lastUpdate: dateTime
                      }

                    }
                  );
              }
            }
          } else {
            // await sendEmail("Just checking", "Nothing to update or new.\n System is up and running. ;)");
            const temp = getDateTime().split("@");
            const time = temp[1];
            const timeTemp = time.split(":");
            const hour = +timeTemp[0];
            const minute = +timeTemp[1];
            if ((hour === 8) && (minute < 45))
              await sendEmail("Good Morning from Home-Seeker 🌞", `Nothing new to report. System is up and running. \o/ \o/ \o/<br><br><br>- Data from DB: ${dataFromDB.length}<br>- Data from Web: ${dataFromWeb.length}`, true);
            else if ((hour === 11) && ((minute >= 45) && (minute <= 59)))
              await sendEmail("Home-Seeker here - have a good lunch 🍳🍕🍔🥪🥪", `Nothing new to report. System is up and running. \o/ <br><br><br>- Data from DB: ${dataFromDB.length}<br>- Data from Web: ${dataFromWeb.length}`, true);
            else if ((hour === 21) && (minute >= 45))
              await sendEmail("Home-Seeker wishes you a good night 😴💤", `Nothing new to report. System is up and running. ;)<br><br><br>- Data from DB: ${dataFromDB.length}<br>- Data from Web: ${dataFromWeb.length}`, true);

            // disabling email for each checking, instead setting email 3 times a day (^^ just to make sure it's all good)
            // await sendEmail("Just checking", `Nothing to update or new. System is up and running. ;)<br><br>- Data from DB: ${dataFromDB.length}<br>- Data from Web: ${dataFromWeb.length}`);
          }

          return res.json({message: "OK, just checking, all good ;)"});
        }

        
        // it is a function to return the FE query about all apartments, 
        // then the UI will cort into availables, removed by owner or removed by admin
        case "GET": {
          return res.json({ apartments: dataFromDB });
        }


        // it is gonna update data - only when admin is removing a specific record, given specific reason
        // it has to be triggered by the front-end
        // it receives postId, the reason for removing the item and a password
        case "PATCH": {
          const { _id, reason, removePass } = req.body;

          if (process.env.removePass !== removePass)
            return res.json({error: "forbiden"});

          if (!_id || !reason) return res.json({error: "Missing info"});

          try {
            const dateTime = getDateTime();
            await Apto
              .updateOne(
                { _id },
                {
                  $set: {
                    removedByAdmin          : true,
                    reasonRemovedFromAdmin  : reason,
                    active                  : false,
                    lastUpdate              : dateTime 
                  }
                }
              );

            return res.json({message: "OK"});

          } catch(error){
            return res.json("###Error Patching: " + " " + {error: error.message || error});
          }
        }

        default:
          console.log("does not apply");
      }

      return res.json({ message: "no answer"}); // just in case return

    } catch (error) {
      // the code commented below is before we found the apt, since then, do not need it anymore 
      // because the system will be trigged once a day
    // const t = new Date();
    // const nowHours = t.getHours();
    // const nowMinutes = t.getMinutes();
    // // it will send a ping email only at 8 and 19, first half hour
    // if  (
    //           ((nowHours == 15 ) && (nowMinutes <= 30))
    //       ||  ((nowHours == 2) && (nowMinutes <= 30))
    //       // || ((nowHours > 18) && (nowHours < 21))
    //     )
      await sendEmail(error.message || error);
      return res.json({ message: error.message || error });
  } finally {
    mongoose.disconnect();
  }

  return;
}

