import { useRef, useEffect } from "react";

/*
  It receives props to assembly the table head accordingly.
  props:
    - mobile
    - type: a || rbo || tba
  It returns a line to be inserted into a 
*/ 
const Head = ({mobile = false, type = "a", showTable = false, getDescW}) => {
  
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
            > 
              $ Before
            </th>
            <th 
              className = "table-location"
            > Location </th>
            <th
              className = "table-reactivated"
            > Reactived</th>
            {type === "a" &&
              <th
                className = "table-remove"
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