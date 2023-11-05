import TableHead from "./TableHead.js";
import basicTableLine from "./basicTableLine";


const TableAssembler = ({ isMobile, type, data, showTable = false, getDescW }) => {

  return(
    <table
      className = { `${data === "processing" ? "table-no-mouse-cursor" : ""} ${showTable ? "" : "collapse-table"}` }
      style={{ tableLayout: "auto" }} //////////////
    >
      <TableHead
        mobile    = { isMobile } 
        type      = { type } 
        showTable = { showTable }
        getDescW  = { getDescW }
      />
      <tbody>
        { data === "processing"
            ? showTable && basicTableLine(isMobile, "processing")
            : (data === "empty")
              ? basicTableLine(isMobile, "emptyfornow")
              : data
        }
      </tbody>
    </table>
  );

}

export default TableAssembler;