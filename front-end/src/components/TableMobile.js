import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

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
  // console.log("propsssssssss", props);
  const [ dataTable, setDataTable ] = useState(null);

  useEffect(() => {
    // console.log("this props", props);
    // data && data.length && 
    setDataTable(renderDataTable());

    return () => {
      renderDataTable();
    }

    //eslint-disable-next-line
  }, [props]);


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

  const renderDataTable = () => {
    if (!props.data.length)
      return(emptyForNow);

    const newTable = props.data.map((e, i) => {
      const { description, active, location, price, oldPrice, url, reactivated, reasonRemovedFromAdmin } = e;
      let shortDescription = description;
      if (shortDescription.length > 22)
        shortDescription = `${shortDescription.substring(0, 19)}..`;

      return (
        <tr
          className = "tr-table"
          key={i}
          onClick={()=> active 
                          ? window.open(url, "_blank") 
                          : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)}
        >
          <td className = "table-index"> {i + 1} </td>
          <td className = "table-description"> { shortDescription } </td>
          <td className = "table-price"> { price } </td>
          <td 
            className = "table-remove"
            onClick = {e => console.log("test removing")}
          >
            <FaEdit 
              color = "blue" 
              className="table-trash"
            />
          </td>
        </tr>
      );
    });

    // console.log("newTable", newTable);
    return newTable;
  };

  return(
    <table
    >
      { HeadMobile() }
      <tbody>
        {/* { console.log("dataTable", dataTable)} */}
        { dataTable }
      </tbody>
    </table>
  );
};

export default TableMobile;