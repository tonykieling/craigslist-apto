import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Head = (
  <thead id = "color-head">
    <tr style={{align:"center"}} >
      <th rowSpan="2" className = "num-head"> # </th>
      <th rowSpan="10" className = "name-head" > Description </th>
      <th rowSpan="3" className = "others-head" > $ Now </th>
      <th rowSpan="3" className = "others-head" > $ Old </th>
      <th rowSpan="4" > Location </th>
      <th rowSpan="1" > Reactived</th>
    </tr>
  </thead>
);

// const currentAvailableBody = (

// );

function AptosList() {
  const [allApartments, setAllApartments] = useState(null);
  const [available, setAvailable] = useState(null);
  const [deleted, setDeleted] = useState(null);

  const [tableAvailables, setTableAvailables] = useState(null);
  const [tableDeleteds, setDeleteds] = useState(null);

  const chargeData = (aptos) => {
    const tempAvailables = aptos.filter(e => e.active);
    // console.log("tempAvailables", tempAvailables);
    setAvailable(tempAvailables);
    const tempNotAvailables = aptos.filter(e => !e.active);
    // console.log("tempNotAvailables:", tempNotAvailables);
    setDeleted(tempNotAvailables);
    renderDataTable(tempAvailables, tempNotAvailables);
  };


  const renderDataTable = (currents, deleteds) => {
    const tableCurrent = currents.map((current, index) => {
      const {description, location, price, url, reactived} = current;
      const tempTableCurrent = (
        <tr key={index} >
          <td>{index + 1}</td>
          <td
            onClick = {() => <Redirect to = {url} />}
          >{description}</td>
          <td>{location}</td>
          <td>{price}</td>
          <td>{reactived}</td>
          <td>{"Old$"}</td>
        </tr>
      );
      return tempTableCurrent;
    });

    setTableAvailables(tableCurrent);
  };


  useEffect(() => {
    const url = "/api";
    // setDataTable(processing);

    const fetchData = async() => {
  
      try {
        const getData = await axios.get( 
          url,
          {  
            headers: { 
              "Content-Type": "application/json"
            }
        });
console.log(getData)
        if (getData.data.apartments) {
          console.log("answer:::", getData.data.apartments);
          setAllApartments(getData.data.apartments);
          chargeData(getData.data.apartments);

        } else
          throw new Error();
          
        } catch (error) {
          console.log("### error post", error.message);
          // setDataTable(null);
        }
    }

    fetchData();
    // return () => {
    //   setProducts({});
    //   setDataTable({});
    //   setMessage("");
    //   setCallEditModal("");
    //   setProductToEdit("");
    // };
    //eslint-disable-next-line
  }, [])

  return (
    <div className="app-body">
      <h1>List of apartments</h1>

      <h2>Current available</h2>
      <table>
        { Head }
        { tableAvailables }
      </table>

      <h2>Removed ones</h2>

      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <h1>asd</h1>
      <table>
        <thead>
          <tr>
            <th style={{width: "3rem"}}>#</th>
            <th>Description</th>
            <th>Price</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nice apartment test text</td>
            <td>$1500</td>
            <td>Joyce</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Description number 2</td>
            <td>$1400</td>
            <td>Patterson</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Nice apartment test text apartment 3</td>
            <td>$1300</td>
            <td>Joyce</td>
          </tr>
        </tbody>
      </table>

      <p style={{paddingBottom: "5rem"}}>qwe</p>
    </div>
  );
}

export default AptosList;
