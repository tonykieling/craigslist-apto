
// this is a line that will be placed within a <tbody>
export default function basicTableLine(isMobile, status) {
  return (
    <tr>
      <td
        className = { status === "processing" ? "processing" : "tr-empty"}
        colSpan   = { isMobile ? 4  : 7}
      >
        <b>{ (status === "processing") ? "Processing..." : "Empty for now ;)" }</b>
      </td>
    </tr>
  );
} 