import {Modal,Button} from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Hasibul Hasan Shanto
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <h5 className='modal-text'>BSC in CSE</h5>
           <h5 className='modal-text'>Eastern University,Bangladesh</h5>
           <h6 className='modal-text'>Mobile : 01402367792</h6>
           <h6 className='modal-text-email'>Email : mernstack23@gmail.com</h6>
           <h6 className='modal-text'>Quotes from our Founder :</h6>
          <p style={{fontStyle:'italic'}}>
          The two important things that I did learn were that you are as powerful and strong as you allow yourself to be, and that the most difficult part of any endeavour is taking the first step, making the first decision.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant='danger' style={{borderRadius:'5px'}}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal
  