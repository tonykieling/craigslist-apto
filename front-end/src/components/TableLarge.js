import { useState, useEffect, useRef } from "react";

import AppsModal from "./AppsModal";
import { FaTrash } from "react-icons/fa";

import TableAssembler from "./tableHelpers/TableAssembler";


const TableLarge = props => {
  const [ callAppsModal, setCallAppsModal ] = useState(null);
  const [ dataToModal, setDataToModal ] = useState(null);
  const [ tableIsDone, setTableIsDone ] = useState(null);

  // useEffect(() => {
  //   //  props.data can be null, 0, or greater than 0
  //   if (!props.data) // it is processing
  //     setTableIsDone(tableAssembler(false, props.type, "processing"));

  //   else if (props.data.length === 0) // i is empty
  //     setTableIsDone(tableAssembler(false, props.type, "empty"));

  //   else if (props.data && props.data.length) { // has data
  //     const temp = renderDataTable(props.data);    
  //     const tempTable = tableAssembler(false, props.type, temp);
  //     setTableIsDone(tempTable);
  //   }

  //   return () => {
  //     props.data && renderDataTable();
  //   }

  //   //eslint-disable-next-line
  // }, [props.data]);



  useEffect(() => {
    setCallAppsModal(false);
    //eslint-disable-next-line
  }, [props.closeModal]);



  const renderDataTable = () => {
    
    const newTable = props.data.map((element, index) => {

      const openModal = () => {
        setDataToModal(element);
        setCallAppsModal(true);        
      };

      const {description, location, price, oldPrice, url, active, reactivated, reasonRemovedFromAdmin, changed} = element;
      const tempTableCurrent = (
        <tr 
          key={index} 
          className = { active ? "tr-table tr-hover" : "tr-table" }
          onClick={()=> active 
                          ? window.open(url, "_blank") 
                          // : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)
                          : openModal()
                    }
        >
          <td
            className = "table-index"
          >
            { index + 1 }
          </td>
          <td
            className = {`table-description ${ reactivated || changed ? "tr-orange" : ""}`}
          >
            { description.length > 60 ? `${description.substring(0, 59)}..` : description}
            {/* { description } */}
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
            { reactivated && <b> &#10003; </b> }
          </td>
          {active &&
            <td 
              className = "table-remove"
              onClick = {e => props.callRemoveItem(e, element)}
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
    return(newTable);
  };



  return(
    <>
      {callAppsModal &&
        <AppsModal
          openModal   = { callAppsModal }
          closeModal  = { () => setCallAppsModal(false) }
          info        = { dataToModal }
          callRemoveItem = { props.callRemoveItem }
          showRemoveButton = { props.type === "a" ? true : false }
          isLarge     = { true }
        />
      }

      <TableAssembler 
        isMobile  = { false }
        type      = { props.type }
        data      = { props.data
                        ? props.data.length
                          ? renderDataTable(props.data)
                          : "empty"
                        : "processing"
                    }
      />
    </>
  );
};

export default TableLarge;