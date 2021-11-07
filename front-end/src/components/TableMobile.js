import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AppsModal from "./AppsModal";

const processingMessage = (
  <tr>
    <td
      className = "processing"
      colSpan = "4"
    >
      ...Processing
    </td>
  </tr>
);

const emptyForNow = (
  <tr>
    <td 
      className = "tr-empty"
      colSpan = "4"
    >
      Empty for now. ;)
    </td>
  </tr>
);

const TableMobile = props => {
  console.log("porps table mobile", props);
  const [ dataTable, setDataTable ] = useState(null);

  const [ callAppsModal, setCallAppsModal ] = useState(null);
  const [ dataToModal, setDataToModal ] = useState(null);

  useEffect(() => {
    props.data && setDataTable(renderDataTable());

    return () => {
      props.data && renderDataTable();
    }

    //eslint-disable-next-line
  }, [props.data]);


  const HeadMobile = () => (
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
        >$</th>
        { props.type === "a" &&
            <th 
              className = "table-more" 
            >  </th>
        }
      </tr>
    </thead>
  );

  useEffect(() => {
    setCallAppsModal(false);
    //eslint-disable-next-line
  }, [props.closeModal]);

  const renderDataTable = () => {
    if (!props.data.length)
      return(emptyForNow);

    const newTable = props.data.map((element, i) => {
      const { description, active, 
        // location, 
        // oldPrice, 
        reasonRemovedFromAdmin, 
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
          {/* <td className = "table-price">{price}</td> */}

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
          callRemoveItem = { props.callRemoveItem }
          showRemoveButton = { props.type === "a" ? true : false }
        />
      }
      <table
      >
        { HeadMobile() }
        <tbody>
          { dataTable
            ? dataTable.length ? dataTable : emptyForNow
            : processingMessage

          }
        </tbody>
      </table>
    </>
  );
};

export default TableMobile;