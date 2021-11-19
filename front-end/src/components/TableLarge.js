import { useState, useEffect } from "react";

import AppsModal from "./AppsModal";

import TableAssembler from "./tableHelpers/TableAssembler";


const TableLarge = props => {
  const [ callAppsModal, setCallAppsModal ] = useState(null);
  const [ dataToModal, setDataToModal ] = useState(null);

  const [ tdWidth, setTdWidth ] = useState(null);


  useEffect(() => {
    setCallAppsModal(false);
    //eslint-disable-next-line
  }, [props.closeModal]);


  // https://heroicons.com/
  // https://www.freecodecamp.org/news/how-to-use-svg-icons-in-react-with-react-icons-and-font-awesome/
  // https://css-tricks.com/lodge/svg/09-svg-data-uris/
  const BTTrash = (`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`);


  const renderDataTable = () => {
    
    const newBody = props.data.map((element, index) => {

      const openModal = () => {
        setDataToModal(element);
        setCallAppsModal(true);        
      };

      const {description, location, price, oldPrice, url, active, reactivated, changed} = element;
      return (
        <tr 
          key={index} 
          className = { `${active ? "tr-table tr-hover" : "tr-table"} ${props.showTable ? "" : "hide"}` }
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

            style = {{
              maxWidth: tdWidth ? `${tdWidth * 0.9}px` : 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {/* { description.length > 60 ? `${description.substring(0, 59)}..` : description} */}
            { description }
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

          {/* {active &&
            <td 
              className = "table-remove"
              onClick = {e => props.callRemoveItem(e, element)}
            >
              <FaTrash 
                color = "red" 
                className="table-trash"
              />
            </td>
          } */}

          { props.type === "a" &&
              <td 
                className = "table-more"
                onClick = {e => {
                  e.stopPropagation();
                  setDataToModal(element)
                  setCallAppsModal(true);
                }}
                style = {{ 
                  backgroundImage: `url('data:image/svg+xml;utf8,${BTTrash}`, 
                  backgroundSize: "22px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              >
              </td>
          }
        </tr>
      );
    });

    return newBody;
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
          isLarge           = { true }
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
        showTable = { props.showTable }
        getDescW = { setTdWidth }
      />
    </>
  );
};

export default TableLarge;