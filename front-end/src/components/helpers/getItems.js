import axios from "axios";

const tempDB =  [
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor',
    price: '$1,780',
    active: true,
    location: "Joyce",
    _id: 1
  },
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactivated: true,
    oldPrice: "$1888",
    _id: 2
  },
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    _id: 3
  },
  {
    postId: '7380919502',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-1br-with-balcony-in/7380919502.html',
    description: 'Spacious 1br with Balcony in Metrotown area',
    price: '$1,765',
    active: true,
    location: "Patterson",
    _id: 4
  },
  {
    postId: '7380919503',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-1br-with-balcony-in/7380919502.html',
    description: 'Spacious 1br with Balcony in Metrotown area',
    price: '$1,765',
    active: false,
    location: "Patterson",
    _id: 5
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 6
  }
];

const getItems = async () => {
  // console.log("inside remove function: ", id, removePass, reason);

  const url = "/api";
  try {

    // const getData = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         apartments: tempDB
    //       }}
    //     );
    //   }, 500);
    // });

    const getData = await axios.get( 
      url,
      {  
        headers: { 
          "Content-Type": "application/json"
        }
    });

//  console.log("getDataaaaaaa", getData);
      if (!getData.data.apartments) {
        throw(getData.data.error);
      }

      return ({ message: getData.data.apartments });

  } catch(error) {
    return ({error: error.message || error});
  }
}

export default getItems;