const dataFromWeb = [
  {
    postId: '7684144311',
    url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-brm-bsmt-3mths-only-pets-okay/7684144311.html',
    description: '2 brm bsmt - 3mths only - Pets Okay',
    price: '$2,000',
    location: 'Hillcrest/ Main St'
  },
  // {
  //   postId: '7684128055',
  //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-new-cozy-bachelor-suite-for/7684128055.html',
  //   description: 'New Cozy Bachelor Suite for one person near Oakridge and Langara',
  //   price: '$1,8800',
  //   location: 'Vancouver'
  // },
  // {
  //   postId: '7684092281',
  //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-bedroom-condo-near-queen/7684092281.html',
  //   description: '1 Bedroom Condo near Queen Elizabeth Park',
  //   price: '$1,800',
  //   location: 'Vancouver'
  // },
  // {
  //   postId: '7683900780',
  //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7683900780.html',
  //   description: 'Garden Furnished Main Floor suite in a house utilities included',
  //   price: '$2,000',
  //   location: 'Main & 29th Avenue'
  // },
  // {
  //   postId: '7681546075',
  //   url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7681546075.html',
  //   description: 'Garden Furnished Main Floor suite in house including utilities',
  //   price: '$2,000',
  //   location: 'Main & 29th'
  // }
];

const dataFromDB = [
    {
      postId: '7684128055',
      url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-new-cozy-bachelor-suite-for/7684128055.html',
      description: 'New Cozy Bachelor Suite for one person near Oakridge and Langara',
      price: '$1,880',
      location: 'Vancouver',
      active: true
    },
    {
      postId: '7681546075',
      url: 'https://vancouver.craigslist.org/van/apa/d/vancouver-garden-furnished-main-floor/7681546075.html',
      description: 'Garden Furnished Main Floor suite in house including utilities',
      price: '$2,000',
      location: 'Main & 29th',
      active: false
    }
];

const compareData = (fromDB, fromWeb) => {
  console.log("DataDB===> ", dataFromDB);
  console.log("dataFromWeb = ", dataFromWeb);
  
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
      dataFromWeb.forEach(e => {
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

  console.log(compareData(dataFromDB, dataFromWeb));