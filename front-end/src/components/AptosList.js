import { useState, useEffect } from "react";
import axios from "axios";


const tempDB =  [
  {
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactived: true
  },
  {
    postId: '7380919502',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-1br-with-balcony-in/7380919502.html',
    description: 'Spacious 1br with Balcony in Metrotown area',
    price: '$1,765',
    active: true,
    location: "Patterson"
  },
  {
    postId: '7380919325',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-spacious-studio-with-great-views/7380919325.html',
    description: 'Spacious - STUDIO - WITH GREAT VIEWS',
    price: '$1,650',
    active: false,
    location: "Joyce"
  }
];

const Head = (
  <thead id = "color-head">
    <tr style={{align:"center"}} key="head">
      <th rowSpan="2" className = "num-head"> # </th>
      <th rowSpan="10" className = "name-head" > Description </th>
      <th rowSpan="3" className = "others-head" > $ Now </th>
      <th rowSpan="3" className = "others-head" > $ Old </th>
      <th rowSpan="4" > Location </th>
      <th rowSpan="1" > Reactived</th>
    </tr>
  </thead>
);


function AptosList() {
  // const [allApartments, setAllApartments] = useState(null);
  const [availables, setAvailables] = useState(null);
  const [removedByOwnwer, setRemovedByOwner] = useState(null);
  const [removedByAdmin, setRemovedByAdmin] = useState(null);

  const [tableAvailables, setTableAvailables] = useState(null);
  const [tableRemovedByOwners, setTableRemovedByOwners] = useState(null);
  const [tableRemovedByAdmins, setTableRemovedByAdmins] = useState(null);


  const sortAnswer = aptos => {
    setAvailables([...aptos.filter(e => e.active)]);

    setRemovedByOwner([...aptos.filter(e => !e.active && !e.removedByAdmin)]);

    setRemovedByAdmin([...aptos.filter(e => e.removedByAdmin)]);
  };



  const renderDataTable = (data, flag) => {
    const tableCurrent = data.map((current, index) => {
      const {description, location, price, oldPrice, url, active, reactived} = current;
      const tempTableCurrent = (
        <tr key={index} >
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {index + 1}
                </a>
              : index + 1
            }
          </td>
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {description}
                </a>
              : description
            }
          </td>
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {price}
                </a>
              : price
            }
          </td>
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {(oldPrice || "")}
                </a>
              : oldPrice
            }
          </td>
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {location}
                </a>
              : location
            }
          </td>
          <td>
            {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {reactived ? <span>&#10003;</span> : ""}
                </a>
              : reactived ? <span>&#10003;</span> : ""
            }
          </td>
        </tr>
      );
      return (tempTableCurrent);
    });

    (flag === "av") && (setTableAvailables(tableCurrent));
    (flag === "rbo") && (setTableRemovedByOwners(tableCurrent));
    (flag === "rba") && (setTableRemovedByAdmins(tableCurrent));
  };


  useEffect(() => {

    // const url = "http://localhost:3000/api"
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

        // ///////////////////tempDB
        // let getData = {};
        // getData = {
        //   data: {
        //     apartments: [...tempDB]
        //   }
        // };
        
        if (getData.data.apartments) {
          console.log("answer::::::::::::", getData.data.apartments);
          sortAnswer(getData.data.apartments);

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
  }, []);


  useEffect(() => {
    // console.log("AVAILABLES=", availables);
    (availables) && renderDataTable(availables, "av");

    (removedByOwnwer) && renderDataTable(removedByOwnwer, "rbo");

    (removedByAdmin) && renderDataTable(removedByAdmin, "rba");
    
    return () => {
      // cleanup
    }
    // eslint-disable-next-line
  }, [availables, removedByOwnwer, removedByAdmin])

  return (
    <div className="app-body">
      <h1>List of apartments</h1>

      <h2>Current available</h2>
      <table>
        { Head }
        <tbody>
          { tableAvailables }
        </tbody>
      </table>

      <h2>Removed by Owners</h2>
      <table>
        { Head }
        {/* {console.log("tableRemovedByOWN", tableRemovedByOwners)} */}

        <tbody>
          { tableRemovedByOwners }
        </tbody>
      </table>

      <h2>Removed by Admins</h2>
      <table>
        { Head }
        <tbody>
          { tableRemovedByAdmins && tableRemovedByAdmins.length ? tableRemovedByAdmins : <tr><td>none for NOW</td></tr> }
        </tbody>
      </table>


      <p style={{paddingBottom: "5rem"}}></p>
    </div>
  );
}

export default AptosList;
