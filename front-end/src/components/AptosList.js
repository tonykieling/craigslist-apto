import { useState, useEffect } from "react";
import TableMobile from "./TableMobile.js";
import TableLarge from "./TableLarge.js";
import removeItem from "./helpers/removeItem.js";
import getItems from "./helpers/getItems.js";

import { BiCollapse } from "react-icons/bi";
import { BiExpand } from "react-icons/bi";



const mobile = window.innerWidth < 768 ? true : false;


function AptosList() {
  const [availables, setAvailables] = useState(null);
  const [removedByOwnwer, setRemovedByOwner] = useState(null);
  const [removedByAdmin, setRemovedByAdmin] = useState(null);

  const [ closeModal, setCloseModal ] = useState(false);


  const sortAnswer = (aptos, option = false) => {
    if (!option) {
      setAvailables([...aptos.filter(e => e.active)]);

      setRemovedByOwner([...aptos.filter(e => !e.active && !e.removedByAdmin)]);

      setRemovedByAdmin([...aptos.filter(e => e.removedByAdmin)]);
    } else {
      // it will happen only when admin removes an ad
      setRemovedByAdmin([...aptos.filter(e => e.removedByAdmin)]);
    }
  };



  useEffect(() => {

    const fetchData = async() => {
  
      try {

        const getData = await getItems();
        if (getData.message) {
          sortAnswer(getData.message);

        } else
          throw new Error(getData.error);
          
        } catch (error) {
          console.log("### error post", error.message);
        } finally {
          // setTableNoMouse(false);
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



  const callRemoveItem = async (e, item, receivingFromModal) => {
    e.stopPropagation()
    const removePass = window.prompt("\nPlease confirm remove action with password");

    if (!removePass) return;

    let reason = "";
    while (!reason)
      reason = window.prompt("\n Short reason, please ;)");
    
    try {
      const removeItemByAdmin = await removeItem(item._id, removePass, reason);
                
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

      window.alert("Item removed by Admin successfully. :)");


    } catch(error) {
      window.alert(`\nError: ${error}\n\nTry again ;)`);
    } finally {
      // setTableNoMouse(false);
    }

  };


  const [ showRBOTable, setShowRBOTable ] = useState(false);
  const [ showRBATable, setShowRBATable ] = useState(false);


  return (
    <div className="app-body">
      <h1>List of apartments</h1>



      {/* Availables table title */}
      <div 
        className = "table-section-title av"
      >
        Availables
      </div>
      {/* here's a trick to get no mouse events and be able to set the cursor, 
          which is wrapping the cursor first and after setting the event's mouse */}
        { mobile
          ?
            <TableMobile 
              data            = { availables } 
              type            = "a"
              callRemoveItem  = { callRemoveItem }
              closeModal      = { closeModal }
              showTable       = { true }
            />
          :  
            <TableLarge
              data            = { availables}
              type            = "a"
              callRemoveItem  = { callRemoveItem }
              closeModal      = { closeModal }
              showTable       = { true }
            />
        }



      {/* Removed by Owners table title */}
      <div 
        className = "table-section-title rbo"
      >
        Removed by Owners
        { showRBOTable
          ? <BiCollapse
              className = "table-ExpCol expCol-blue"
              onClick = {() => setShowRBOTable(false)}
            />
          : <BiExpand
              className = "table-ExpCol expCol-green"
              onClick = {() => setShowRBOTable(true)}
            />
        }
      </div>

      { 
        mobile
          ?
            <TableMobile 
              data          = { removedByOwnwer } 
              type          = "rbo"
              closeModal    = { closeModal }
              showTable  = { showRBOTable }
            />
          :  
            <TableLarge
              data        = { removedByOwnwer }
              type        = "rbo"
              closeModal  = { closeModal }
              showTable   = { showRBOTable}
            />
      }



      {/* Removed by Admins table title */}
      <div 
        className = "table-section-title rba"
      >
        Removed by Admins
        { showRBATable
          ? <BiCollapse 
              className = "table-ExpCol expCol-blue"
              onClick = {() => setShowRBATable(false)}
            />
          : <BiExpand 
              className = "table-ExpCol expCol-green" 
              onClick = {() => setShowRBATable(true)}
            />
        }
      </div>

        { 
          mobile
            ?
              <TableMobile 
                data            = { removedByAdmin } 
                type            = "rba"
                closeModal      = { closeModal }
                showTable    = { showRBATable }
              />
            :  
              <TableLarge
                data = { removedByAdmin }
                type = "rba"
                closeModal = { closeModal }
                showTable = { showRBATable }
              />
        }

      <div style={{marginBottom: "2rem"}}></div>
    </div>
  );
}

export default AptosList;
