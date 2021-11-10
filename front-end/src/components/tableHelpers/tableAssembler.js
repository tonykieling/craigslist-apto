import tableHead from "./tableHead.js";
import basicTableLine from "./basicTableLine";

const tableAssembler = (isMobile, type, data) => {
  return (
    <table
      className = { data === "processing" ? "table-no-mouse-cursor" : ""}
    >
      { tableHead(isMobile, type) }
      <tbody>
        { data === "processing"
            ? basicTableLine(isMobile, "processing")
            : (data === "empty")
              ? basicTableLine(isMobile, "emptyfornow")
              : data
        }
      </tbody>
    </table>
  );
}

export default tableAssembler;