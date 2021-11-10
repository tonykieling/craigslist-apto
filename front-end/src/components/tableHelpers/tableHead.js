
/*
  It receives props to assembly the table head accordingly.
  props:
    - mobile
    - type: a || rbo || tba
  It returns a line to be inserted into a 
*/
export default function head(mobile = false, type = "a") {
  return(
    <>
      <thead id = "color-head">
        <tr 
          className = "tr-first"
          key="head"
        >
          <th 
            className = "table-index"
          > 
            # 
          </th>
          <th
            className = "table-description"
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