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
  console.log("props on tablemobile", props);
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


  const HeadMobile = props => (
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
        > $ Price </th>
        <th 
          className = "table-more" 
        > More </th>
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
        price, url, reactivated, reasonRemovedFromAdmin, changed } = element;

      return (
        <tr
          className = "tr-table"
          key={i}
          onClick = {() => active 
                          ? window.open(url, "_blank") 
                          : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)}
        >
          <td className = "table-index"> {i + 1} </td>
          <td 
            className = {`table-description ${ reactivated || changed ? "tr-orange" : "asd"}`}
          > 
            { description.length > 20 ? `${description.substring(0, 19)}..` : description} 
          </td>
          <td className = "table-price"> { price } </td>
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