import ReactModal from "react-modal";
import { useState } from "react";

const customStyle = {
  content : {
    top              : '40%',
    bottom           : 'auto',
    left             : '50%',
    right            : 'auto',
    marginRight      : '-50%',
    transform        : 'translate(-50%, -50%)',
    backgroundColor  : "indianred",
    height           : "20rem",
    width            : "80%"
  }
};

const RemoveModal = props => {
  // console.log("props on REMOVE modal:", props);
  // const [ btAvailable, setBtAvailable ] = useState(true);
  // const [ btLabel, setBtLabel ] = useState("Cancel");
  const [ state, setState ] = useState({
    removePass  : "",
    reason      : ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
      })
    );
  }


  return(
    <ReactModal
      ariaHideApp ={ false }
      isOpen  = { props.openModal }
      style   = { customStyle}
    >
      <h2>Remove item</h2>
      <p>Please provide:</p>
      <h3>Secret</h3>
      <input
        autoFocus
        id        = "removePass"
        // className = "text-form" 
        type      = "password"
        name      = "removePass"
        value     = { state.removePass }
        onChange  = { handleChange }
        disabled = { props.message && true }
      />
      <h3>Reason</h3>
      <input
        id        = "reason"
        // className = "text-form" 
        type      = "text"
        name      = "reason"
        value     = { state.reason }
        onChange  = { handleChange }
        // disabled = { props.isProcessing && true}
        disabled = { props.message && true }
      />

      <button 
        onClick = { () => props.closeModal()}
        disabled = { props.isProcessing && true}
        >
        { props.message ? "Close" : "Cancel" }
      </button>

      <button 
        onClick = { () => props.action("111", "222")}
        disabled = { props.message && true}
      >
        Remove item
      </button>

      { props.message }

    </ReactModal>
  );
};

export default RemoveModal;
