import axios from "axios";

const getItems = async () => {
  // console.log("inside remove function: ", id, removePass, reason);

  const url = "/api";
  try {

    // const getData = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         message: "OKkkkkkkkk"
    //       }}
    //     );
    //   }, 300);
    // });

    const getData = await axios.get( 
      url,
      {  
        headers: { 
          "Content-Type": "application/json"
        }
    });

 console.log("getDataaaaaaa", getData);
      if (!getData.data.apartments) {
        throw(getData.data.error);
      }

      return ({ message: getData.data.apartments });

  } catch(error) {
    return ({error: error.message || error});
  }
}

export default getItems;