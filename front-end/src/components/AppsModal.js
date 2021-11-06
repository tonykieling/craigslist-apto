import ReactModal from "react-modal";

const customStyle = {
  content : {
    top              : '40%',
    bottom           : 'auto',
    left             : '50%',
    right            : 'auto',
    marginRight      : '-50%',
    transform        : 'translate(-50%, -50%)',
    backgroundColor  : "lightblue",
    height           : "15rem",
    width            : "80%"
  }
};

const AppsModal = props => {
  // console.log("props on modalXXX:", props);
  const { description, location, price, oldPrice, reactivated, changed } = props.info;

  return(
    <ReactModal
      ariaHideApp ={ false }
      isOpen  = { props.openModal }
      style   = { customStyle}
    >
      <h2>Posting details</h2>
      <div> { description }</div>
      <div>
        <spam className = "items-modal">@ <b>{ location }</b> </spam>
      </div>
      <div>
        <spam> <b>{ price }</b></spam>
      </div>
      {changed
        &&
          <>
            <div className = "items-modal">
              <spam> $ before was <b>{ oldPrice } </b></spam>
            </div>
          </>
      }
      {
        reactivated &&
          <>
            <div className = "items-modal">
              <spam> Item <u>reactivated by its owner</u></spam>
            </div>
          </>
      }

      <div className = "buttons-modal">
        {props.showRemoveButton
          ?
            <>
              <button 
                className = "button-close"
                onClick = { () => props.closeModal()}>
                Close
              </button>

              <button
                className = "button-remove"
                onClick = { e => props.callRemoveItem(e, props.info, true) }
              >
                Remove Item
              </button>
            </>
          :
            <button
              className = "button-close-whole"
              onClick = { () => props.closeModal()}>
              Close
            </button>
        }
      </div>
    </ReactModal>
  );
};

export default AppsModal;


// 20.79
// Alexandra
// 2-4% increase each April
// waiving period 
// Giorgina
// 267.42

// I will be waiting for your approval so I can communicate my current employer and negotiate with them the period notice.
// @AcessSignature21