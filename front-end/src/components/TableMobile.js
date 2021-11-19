import { useState, useEffect } from "react";
import AppsModal from "./AppsModal";

import TableAssembler from "./tableHelpers/TableAssembler";


const TableMobile = props => {

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
  const BTEdit = (
    `<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="blue"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>`
  );
  

  const renderBodyTable = () => {

    const newBody = props.data.map((element, i) => {
      const { description, active, price, url, reactivated, changed } = element;

      const openModal = () => {
        setDataToModal(element);
        setCallAppsModal(true);        
      };

      return (
        <tr
          className = {`tr-table ${props.showTable ? "" : "hide"}`}
          key={i}
          onClick = {() => active 
                          ? window.open(url, "_blank") 
                          // : reasonRemovedFromAdmin && window.alert(`\nAdmin's Reason for removing is:\n\n${reasonRemovedFromAdmin}`)}
                          : openModal()
                    }
                            
        >
          <td className = "table-index"> {i + 1} </td>
          <td 
            className = {`table-description ${ reactivated || changed ? "tr-orange" : ""}`}

            style = {{
              maxWidth: tdWidth ? `${tdWidth * 0.9}px` : 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          > 
            { description }
          </td>
          <td className = "table-price">{price.substring(1, 8)}</td>


          { props.type === "a" &&
              <td 
                className = "table-more"
                onClick = {e => {
                  e.stopPropagation();
                  setDataToModal(element)
                  setCallAppsModal(true);
                }}
                style = {{ 
                  backgroundImage: `url('data:image/svg+xml;utf8,${BTEdit}`, 
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
        />
      }

      <TableAssembler 
        isMobile  = { true }
        type      = { props.type }
        data      = { props.data
                        ? props.data.length
                          ? renderBodyTable(props.data)
                          : "empty"
                        : "processing"
                    }
        showTable = { props.showTable }
        getDescW = { setTdWidth }
      />
    </>
  );
};

export default TableMobile;
