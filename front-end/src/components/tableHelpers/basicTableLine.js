
// const st = {
//     display: "flex",
//     flexDirection: "column",
//     color: "red",
//     textWrap: "no-wrap"
// };

// this is a line that will be placed within a <tbody>
export default function basicTableLine(isMobile, status) {
  return (
    <tr>
      <td
        className = { status === "processing" ? "processing" : "tr-empty"}
        colSpan   = { isMobile ? 4  : 7}
      >
        {/* <b>{ (status === "processing") ? "Processing..." : "Empty for now ;)" }</b> */}
        { (status === "processing") 
            ?
                <b>Processing...</b> 
            :
                <div>
                    <p><b>Empty for now ;)</b></p>
                    <p style={{marginTop: "1.5rem"}}>The system is currently not grabbing new data</p>
                    <p>because its job was already completed.</p>
                    <p style={{marginTop: "1.5rem"}}>You can check the old data</p>
                    <p>recorded on DB below.</p>
                </div>
        }
      </td>
    </tr>
  );
} 
