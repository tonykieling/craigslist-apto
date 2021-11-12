import { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import AppsModal from "./AppsModal";

import TableAssembler from "./tableHelpers/TableAssembler";


const TableMobile = props => {
  const [ tableHeight, setTableHeight ] = useState(null);

  const [ callAppsModal, setCallAppsModal ] = useState(null);
  const [ dataToModal, setDataToModal ] = useState(null);
  const tableReference = useRef(null);

  const [ tableIsDone, setTableIsDone ] = useState(null);


  // useEffect(() => {
  //   //  props.data can be null, 0, or greater than 0
  //   if (!props.data) { // it is processing
  //     setTableIsDone(tableAssembler(true, props.type, "processing"));
  //   } else if (props.data.length === 0) { // i is empty
  //     setTableIsDone(tableAssembler(true, props.type, "empty"));
  //   } else if (props.data && props.data.length) { // has data
  //     const temp = renderDataTable(props.data);    
  //     const tempTable = tableAssembler(true, props.type, temp);

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

    const newTable = props.data.map((element, i) => {
      const { description, active, 
        // location, 
        // oldPrice, 
        // reasonRemovedFromAdmin, 
        price, url, reactivated, changed } = element;

      const openModal = () => {
        setDataToModal(element);
        setCallAppsModal(true);        
      };

      return (
        <tr
          className = "tr-table"
          key={i}
          onClick = {() => active 
                          ? window.open(url, "_blank") 
                          // : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)}
                          : openModal()
                    }
                            
        >
          <td className = "table-index"> {i + 1} </td>
          <td 
            className = {`table-description ${ reactivated || changed ? "tr-orange" : "asd"}`}
          > 
            { description.length > 20 ? `${description.substring(0, 19)}..` : description} 
          </td>
          <td className = "table-price">{price.substring(1, 8)}</td>

          { props.type === "a" &&
              <td 
                className = "table-remove"
                onClick = {e => {
                  e.stopPropagation();
                  setDataToModal(element)
                  setCallAppsModal(true);
                }}
              >
                <FaEdit 
                  color = "blue" 
                  className="table-trash"
                />
              </td>
          }
        </tr>
      );
    });

    return newTable;
  };



  return(
    <>
      {callAppsModal &&
        <AppsModal
          openModal   = { callAppsModal }
          closeModal  = { () => setCallAppsModal(false) }
          info        = { dataToModal }
          callRemoveItem    = { props.callRemoveItem }
          showRemoveButton  = { props.type === "a" ? true : false }
        />
      }

      {/* { tableIsDone } */}
      { props.data
        ?
          props.data.length
            ? <TableAssembler isMobile = { true } type = { props.type } data = { renderDataTable(props.data) }/>
            : <TableAssembler isMobile = { true } type = { props.type } data = "empty"/>
        : <TableAssembler isMobile = { true } type = { props.type } data = "processing"/>
      }
      {console.log("props.data", props.data)}
    </>
  );
};

export default TableMobile;

// if (!props.data) { // it is processing
//   setTableIsDone(tableAssembler(true, props.type, "processing"));
// } else if (props.data.length === 0) { // i is empty
//   setTableIsDone(tableAssembler(true, props.type, "empty"));
// } else if (props.data && props.data.length) { // has data
//   const temp = renderDataTable(props.data);    
//   const tempTable = tableAssembler(true, props.type, temp);


