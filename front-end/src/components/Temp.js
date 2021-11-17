
import { useState, useEffect, useRef } from "react";
// import getItems from "./helpers/getItems";

const y = {
  width: "5rem"
};
const n = {
  width: "1rem"
};
const st = { 
  borderCollapse: "collapse", 
  border: "1px solid red"
};
const st1 = {border: "1px solid black"}

const Temp = props => {
  const descriptionField = useRef(null);
  const [ rbaData, setRbaData ] = useState(null);
  const [ flag, setFlag ] = useState(null);


  const table = (
    <table style = {st}>
      <colgroup>
        <col></col>
        <col
          ref = { descriptionField }
          style = { flag ? y : n}
        >
        </col>
        <col></col>
      </colgroup>
      <thead>
        <tr className = { flag ? "hide" : ""}>
          <th style = {st1}>#</th>
          <th style = {st1}>Name</th>
          <th style = {st1}>***</th>
        </tr>
      </thead>
      <tbody>
        <tr className = { flag ? "hide" : ""}>
          <td style = {st1}>
            1
          </td>
          <td style = {st1}>
            Peter
          </td>
          <td style = {st1}>
            asd
          </td>
        </tr>
        <tr className = { flag ? "hide" : ""}>
          <td style = {st1}>2</td>
          <td style = {st1}>Bob</td>
          <td style = {st1}>qweasd</td>
        </tr>
        <tr className = { flag ? "hide" : ""}>
          <td style = {st1}>3</td>
          <td style = {st1}>Sam</td>
          <td style = {st1}>something else</td>
        </tr>
      </tbody>
    </table>
  );

  useEffect(() => {
    console.log("descr", descriptionField.current.offsetWidth);
  // }, [descriptionField.current && descriptionField.current.offsetWidth]);
  }, []);


  const getData = async () => {
    // const data = await getItems();
    // console.log("data", data);
    setRbaData(!rbaData);
    setFlag(!flag);
  };

  return(
    <>
      <div className="transiti">
        {/* { rbaData && table } */}
        { table }
      </div>
      <button
        onClick = { getData }
      >
        Click me
      </button>
    </>
  );
};

export default Temp;