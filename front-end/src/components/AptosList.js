import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import TableMobile from "./TableMobile.js";
import removeItem from "./helpers/removeItem.js";
import getItems from "./helpers/getItems.js";

const tempDB =  [
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactived: true,
    _id: 1
  },
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactived: true,
    _id: 2
  },
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactived: true,
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
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce",
    removedByAdmin: true,
    reasonRemovedFromAdmin: "test",
    _id: 5
  }
];


const mobile = window.innerWidth < 768 ? true : false;

const Head = showRemoveButton => (
  <thead id = "color-head">
    <tr 
      className = "tr-first"
      key="head"
    >
      <th 
        className = "table-index"
      > # </th>
      <th
        className = "table-description"
      > Description </th>
      <th 
        className = "table-price" 
      > $ Now </th>
      <th 
        className = "table-price" 
      > $ Old </th>
      <th 
        className = "table-location"
      > Location </th>
      <th
        className = "table-reactivated"
      > Reactived</th>
      {showRemoveButton &&
        <th
          className = "table-remove"
        ></th>
      }
    </tr>
  </thead>
);


function AptosList() {
  const [availables, setAvailables] = useState(null);
  const [removedByOwnwer, setRemovedByOwner] = useState(null);
  const [removedByAdmin, setRemovedByAdmin] = useState(null);

  const [tableAvailables, setTableAvailables] = useState(null);
  const [tableRemovedByOwners, setTableRemovedByOwners] = useState(null);
  const [tableRemovedByAdmins, setTableRemovedByAdmins] = useState(null);
  const [tableNoMouse, setTableNoMouse] = useState(true);

  const [ closeModal, setCloseModal ] = useState(false);


  const sortAnswer = aptos => {
    setAvailables([...aptos.filter(e => e.active)]);

    setRemovedByOwner([...aptos.filter(e => !e.active && !e.removedByAdmin)]);

    setRemovedByAdmin([...aptos.filter(e => e.removedByAdmin)]);
  };


  const renderDataTable = (data, flag) => {
    const tableCurrent = data.map((current, index) => {
      const {description, location, price, oldPrice, url, active, reactived, reasonRemovedFromAdmin} = current;
      const tempTableCurrent = (
        <tr 
          key={index} 
          className = { active ? "tr-table tr-hover" : "tr-table" }
          onClick={()=> active 
                          ? window.open(url, "_blank") 
                          : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)}
        >
          <td
            className = "table-index"
          >
            { index + 1 }
          </td>
          <td
          >
            { description.length > 60 ? description.substring(0, 59) : description}
          </td>
          <td
            className = "table-price"
          >
            { price }
          </td>
          <td
            className = "table-price"
          >
            { oldPrice }
          </td>
          <td
            className = "table-location"
          >
            { location }
          </td>
          <td
            className = "table-reactivated"
          >
            { reactived && <b> &#10003; </b> }
          </td>
          {active &&
            <td 
              className = "table-remove"
              onClick = {e => callRemoveItem(e, current)}
            >
              <FaTrash 
                color = "red" 
                className="table-trash"
              />
            </td>
          }
        </tr>
      );
      return (tempTableCurrent);
    });

    (flag === "av") && (setTableAvailables(tableCurrent));
    (flag === "rbo") && (setTableRemovedByOwners(tableCurrent));
    (flag === "rba") && (setTableRemovedByAdmins(tableCurrent));
  };


  useEffect(() => {

    const fetchData = async() => {
  
      try {
        setTableNoMouse(true);

        const getData = await getItems();
        console.log("getDataaaaaaaaaa", getData);
        if (getData.message) {
          sortAnswer(getData.message);

        } else
          throw new Error(getData.error);
          
        } catch (error) {
          console.log("### error post", error.message);
        } finally {
          setTableNoMouse(false);
        }
    }

    fetchData();
    // return () => {
    //   setProducts({});
    //   setDataTable({});
    //   setMessage("");
    //   setCallEditModal("");
    //   setProductToEdit("");
    // };
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    (availables) && renderDataTable(availables, "av");

    (removedByOwnwer) && renderDataTable(removedByOwnwer, "rbo");

    (removedByAdmin) && renderDataTable(removedByAdmin, "rba");
    
    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [availables, removedByOwnwer, removedByAdmin])

  const processingMessage = (
    <tr>
      <td
        className = "processing"
        colSpan = "6"
      >
        ...Processing
      </td>
    </tr>
  );

  const emptyForNow = (
    <tr>
      <td 
        className = "tr-empty"
        colSpan = "6"
      >
        Empty for now. ;)
      </td>
    </tr>
  );


  const callRemoveItem = async (e, item, receivingFromModal) => {
    console.log("YEAHHHHHH")
    e.stopPropagation()
    const removePass = window.prompt("\nPlease confirm remove action with password");

    if (!removePass) return;

    let reason = "";
    while (!reason)
      reason = window.prompt("\n Short reason, please ;)");
    
      
    const url = "/api";
    try {
      setTableNoMouse(true);
      const removeItemByAdmin = await removeItem(item._id, removePass, reason);
          // const remove = await axios
          //   .patch(
          //       url,
          //       {
          //           removePass,
          //            reason,
          //           _id: item._id
          //         }
          //       );
                
      if (removeItemByAdmin.error) {
        throw(removeItemByAdmin.error);
      }
          
      // updateAvailables
      setAvailables([...availables.filter(e => item._id !== e._id)]);
          
      // updateRemovedByAdmins
      const newItemToRemovedByAdmin = {
        postId    : item.postId,
        url       : item.url,
        price     : item.price,
        oldPrice  : item.oldPrice,
        active    : false,
        description : item.description,
        location    : item.location,
        reasonRemovedFromAdmin: reason
      }
      setRemovedByAdmin([...removedByAdmin, newItemToRemovedByAdmin]);

      if (receivingFromModal)
        setCloseModal(true);


    } catch(error) {
      window.alert(`\nError: ${error}\n\nTry again ;)`);
    } finally {
      setTableNoMouse(false);
    }

  };



  return (
    <div className="app-body">
      <h1>List of apartments</h1>

      <h2
       className = "table-section-title av"

      >Current available</h2>
      {/* here's a trick to get no mouse events and be able to set the cursor, 
          which is wrapping the cursor first and after setting the event's mouse */}
        { mobile
          ?
            <TableMobile 
              data = { availables } type = "a"
              callRemoveItem = { callRemoveItem }
              closeModal = { closeModal }
            />
          :  
            <table
              className = { tableNoMouse ? "table-no-mouse-cursor" : ""}
            >
              { Head(true) }
              <tbody
                className = { tableNoMouse ? "table-no-mouse-events" : ""}
              >
              {tableAvailables
                  ? tableAvailables.length ? tableAvailables : emptyForNow
                  : processingMessage
                }
              </tbody>
            </table>
        }

      <h2 className = "table-section-title rbo">Removed by Owners</h2>
      { mobile
          ?
            removedByOwnwer && <TableMobile data = { removedByOwnwer } type = "rbo" />
          :  
            <table
              className = { tableNoMouse ? "table-no-mouse-cursor" : ""}
            >
              { Head() }
              <tbody
                className = { tableNoMouse ? "table-no-mouse-events" : ""}
              >
              {tableRemovedByOwners
                  ? tableRemovedByOwners.length ? tableRemovedByOwners : emptyForNow
                  : processingMessage
                }
              </tbody>
            </table>
      }

      <h2 className = "table-section-title rba">Removed by Admins</h2>
      { mobile
          ?
            removedByAdmin && removedByAdmin.length && <TableMobile data = { removedByAdmin } type = "rba" />
          :  
            <table
              className = { tableNoMouse ? "table-no-mouse-cursor" : ""}
            >
              { Head() }
              <tbody
                className = { tableNoMouse ? "table-no-mouse-events" : ""}
              >
                {tableRemovedByAdmins
                  ? tableRemovedByAdmins.length ? tableRemovedByAdmins : emptyForNow
                  : processingMessage
                }
              </tbody>
            </table>
        }

      <p style={{paddingBottom: "2rem"}}></p>
    </div>
  );
}

export default AptosList;
