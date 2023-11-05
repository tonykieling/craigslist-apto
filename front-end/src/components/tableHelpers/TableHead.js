import { useRef, useEffect } from "react";

/*
  It receives props to assembly the table head accordingly.
  props:
    - mobile
    - type: a || rbo || tba
  It returns a line to be inserted into a 
*/ 
const Head = ({mobile = false, type = "a", showTable = true, getDescW}) => {
  
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current)
      getDescW(descriptionRef.current.offsetWidth);

    //eslint-disable-next-line
  }, [descriptionRef]);

  return(
    <>
      <thead id = "color-head">
        <tr 
          className = {`tr-first ${showTable ? "" : "hide"}`}
          key="head"
        >

          <th 
            className = "table-index"
          > 
            # 
          </th>
          <th
            className = "table-description"
            ref = { descriptionRef }
          > 
            Description
          </th>
          <th
            className = "table-price"
            style={{ whiteSpace: "nowrap" }}
          > 
            { mobile ? "$" : "$ Now"}
          </th>
          {mobile && type === "a" &&
            <th
              className = "table-more"
            > </th>
          }

          {!mobile &&
          <>
            <th
              className = "table-price"
              style={{ whiteSpace: "nowrap" }}
            > 
              $ Before
            </th>
            <th 
              className = "table-location"
              // style={{ maxWidth: "5rem" }}
            > Location </th>
            <th
              className = "table-reactivated"
            > Reactived</th>
            {type === "a" &&
              <th
                className = "table-remove"
                style={{ width: "0.5rem" }}
              > </th>
            }
            </>
          }
        </tr>
      </thead>
    </>
  );
}

export default Head;