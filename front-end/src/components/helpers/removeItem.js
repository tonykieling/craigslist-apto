import axios from "axios";

const removeItem = async (id, removePass, reason) => {
  // console.log("inside remove function: ", id, removePass, reason);

  const url = "/api";
  try {

    // const remove = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         message: "OKkkkkkkkk"
    //       }}
    //     );
    //   }, 300);
    // });

    const remove = await axios
      .patch(
          url,
          {
              removePass,
              reason,
              _id: id
            }
          );
//  console.log("removeeeeeeeeeeeee", remove);
      if (!remove.data.message) {
        throw(remove.data.error);
      }

      return ({message: true});

  } catch(error) {
    return ({error: error.message || error});
  }
}

export default removeItem;