// import './App.css';

function AptosList() {
  return (
    <div className="App">
      
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
    </div>
  );
}

export default AptosList;
