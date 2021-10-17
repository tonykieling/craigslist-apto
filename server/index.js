require('dotenv').config();

const mongoose = require("mongoose");
// product schema
const Item = mongoose.model("Item", mongoose.Schema(
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
      type: Boolean,
      default: true
    },
    changed: {
      type: Boolean,
      default: false
    }
  })
);


// const fetch = require("node-fetch");
const data = require("../output.js");
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
    ];
  changed: [
      {
        postId,
        url,
        description,
        price 
      }  
    ];
  deleted: [
    {
      postId
    }
  ]
}
*/
const compareData = (fromDB, fromWeb) => {
  // it adds the item for the right place in the object that will be the return of compareData function
  const checkProperty = (property, value) => {
    return (
      // three ways to check whether a property belongs to an object
      // result[property]
      // (property in result)
      result.hasOwnProperty(property)
        ? [...result[property], value]
        : [value]
    );
  };

  let result = {};  
  // check the data coming from web against db's data 
  // to see whether there are new or changed items
  for(let iWeb = 0; iWeb < fromWeb.length; iWeb++) {
    if (fromDB.length === 0) {
      // console.log("  first time:::", fromWeb[iWeb]);
      const newItems = checkProperty("newItems", fromWeb[iWeb]);
      result = {
        ...result,
        newItems
      };
    }

    for (let iDB = 0; iDB < fromDB.length; iDB++) {
      if (fromWeb[iWeb].postId === fromDB[iDB].postId) {
        //it is gonna check only price changing
        if  (fromWeb[iWeb].price !== fromDB[iDB].price
            // || fromWeb[iWeb].description !== fromDB[iDB].description
            // || fromWeb[iWeb].url !== fromDB[iDB].url
            ) 
          {
            // const changed = result.hasOwnProperty("changed") 
            // ? [...result["changed"], fromWeb[iWeb]]
            // : [fromWeb[iWeb]];

            const changed = checkProperty("changed", fromWeb[iWeb]);
  
            result = {
              ...result,
              changed
            };
          }
        break;
      }
      
      if ((iDB === fromDB.length - 1) || (fromDB.length === 0)) {
        console.log("   got a new item", fromWeb[iWeb]);
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

const f = async () => {
  try {

    // it gets data from DB
    const db = process.env.DB;
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    const dataFromDB = await Item.find();
    // if (1) return 
    console.log("dataFromDB", dataFromDB.length);

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
      console.log("newData => ", newData);

      // if (1) return;

      // it formats email to be sent to admins
      // it send the email

      // it inserts new data coming from web
      console.log("XXXXXXXXXXXXXXXX newData:", newData);
      if (newData.newItems && (newData.newItems.length > 0)) {
        for (const item of newData.newItems) {
        // newData.newItems.forEach(async e => {
          const toInsert = new Item({
            _id: new mongoose.Types.ObjectId(),
            postId      : item.postId,
            url         : item.url,
            description : item.description,
            price       : item.price
          });
          console.log("   => tobeinsrted:", toInsert);
          
          await toInsert.save();
        }
      }

      // it updates data coming from web about item changed
      if (newData.changed && (newData.changed.length > 0)) {
        for (const item of newData.changed) {
          await Item
            .updateOne(
              { postId: item.postId },
              {
                price   : item.price,
                changed : true
              }
            );
        }
      }

      // it updates deleted data
      if (newData.deleted && (newData.deleted.length > 0)) {
        for (const item of newData.deleted) {
          await Item
            .updateOne(
              { postId: item.postId },
              {
                active : false
              }
            );
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
