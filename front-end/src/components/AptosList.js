import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


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
    postId: '7388747820',
    url: 'https://vancouver.craigslist.org/bnc/apa/d/burnaby-bedroom-on-26th-floor-in/7388747820.html',
    description: '1 Bedroom on 26th floor in Station Square',
    price: '$1,780',
    active: true,
    location: "Joyce",
    reactived: true
  },
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
    <tr 
      className = "tr-first"
      key="head"
    >
      <th 
        // style = {{width: "1.5rem"}}
        className = "table-index"
        // className = "num-head"
      > # </th>
      <th 
        style = {{}}
        className = "name-head" > Description </th>
      <th 
        style = {{}}
        className = "others-head" > $ Now </th>
      <th 
        style = {{}}
        className = "others-head" > $ Old </th>
      <th 
        style = {{}}
        > Location </th>
      <th rowSpan="1" > Reactived</th>
    </tr>
  </thead>
);


function AptosList() {
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


  // const LinkTo = () => {
  //   console.log("linkkkkkkkkkkkkkkkkkkkkkkkkkk");
  //   return <Redirect to = "https://tkwebdev.ca" target = "_blank" />
  // }

  const renderDataTable = (data, flag) => {
    const tableCurrent = data.map((current, index) => {
      const {description, location, price, oldPrice, url, active, reactived} = current;
      const tempTableCurrent = (
        <tr 
          key={index} 
          className = { active ? "tr-table tr-hover" : "tr-table" }
          onClick={()=> active && window.open(url, "_blank")}
        >
          <td
            className = "table-index"
          >
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {index + 1}
                </a>
              : index + 1
            } */}
            { index + 1 }
          </td>
          <td>
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {description}
                </a>
              : description
            } */}
            { description }
          </td>
          <td
            className = "table-price"
          >
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {price}
                </a>
              : price
            } */}
            { price }
          </td>
          <td
            className = "table-price"
          >
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {(oldPrice || "")}
                </a>
              : oldPrice
            } */}
            { oldPrice }
          </td>
          <td
            className = "table-location"
          >
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {location}
                </a>
              : location
            } */}
            { location }
          </td>
          <td
            className = "table-reactivated"
          >
            {/* {active
              ?
                <a href = {url} target="_blank" rel = "noreferrer">
                  {reactived ? <span>&#10003;</span> : ""}
                </a>
              : reactived ? <span>&#10003;</span> : ""
            } */}
            { reactived }
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

    const fetchData = async() => {
  
      try {
        // temp commented for dev purposes
        // const getData = await axios.get( 
        //   url,
        //   {  
        //     headers: { 
        //       "Content-Type": "application/json"
        //     }
        // });

        ///////////////////tempDB with delay
        // console.log("querying getData...")
        const getData = await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              data: {
                apartments: [...tempDB]
              }}
            );
          }, 2300);
        });
        // console.log("getData", getData);

        if (getData.data.apartments) {
          // console.log("answer::::::::::::", getData.data.apartments);
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

  const processingMessage = (
    <tr>
      <td
        className = "processing"
        colSpan = "6"
      >
        ...Processing
      </td>
    </tr>
  );

  const emptyForNow = (
    <tr>
      <td 
        // style={{textAlign: "center", backgroundColor: ""}}
        className = "tr-empty"
        colSpan = "6"
      >
        Empty for now. ;)
      </td>
    </tr>
  );


  return (
    <div className="app-body">
      <h1>List of apartments</h1>

      <h2 className = "table-section-title av">Current available</h2>
      <table
        // style = { tableStyle }
      >
        { Head }
        <tbody>
        {tableAvailables
            ? tableAvailables.length ? tableAvailables : emptyForNow
            : processingMessage
          }
        </tbody>
      </table>

      <h2 className = "table-section-title rbo">Removed by Owners</h2>
      <table
        // style = { tableStyle }
      >
        { Head }
        <tbody>
        {tableRemovedByOwners
            ? tableRemovedByOwners.length ? tableRemovedByOwners : emptyForNow
            : processingMessage
          }
        </tbody>
      </table>

      <h2 className = "table-section-title rba">Removed by Admins</h2>
      <table
        // style = { tableStyle }
      >
        { Head }
        <tbody>
          {tableRemovedByAdmins
            ? tableRemovedByAdmins.length ? tableRemovedByAdmins : emptyForNow
            : processingMessage
          }
        </tbody>
      </table>


      <p style={{paddingBottom: "5rem"}}></p>
    </div>
  );
}

export default AptosList;
