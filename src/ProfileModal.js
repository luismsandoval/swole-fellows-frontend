import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';



class ProfileModal extends React.Component {

    handleProfileSubmit = (event)=>{
        const newProfile ={
            targetCal: event.target.targetCalories.value,
            currentWeight: event.target.currentWeight.value,
            age: event.target.age.value,
            sex: event.target.sex.value,
            height: event.target.height.value

        }
        this.props.addUserInfo(newProfile);
        this.props.onHide();

    }

render() {
    return (

      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleprofileSubmit} >

            <Form.Group className="mb-3" controlId="targetCalories">
              <Form.Label>Target Calories: </Form.Label>
              <Form.Control type="name" placeholder="Enter caloric goal" />
              </Form.Group>

                <Form.Group className="mb-3" controlId="currentWeight">
              <Form.Label>Current Weight: </Form.Label>
              <Form.Control type="name" placeholder="Enter serving size" />
              </Form.Group>
             
             
              <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age: </Form.Label>
              <Form.Control type="name" placeholder="Enter serving size" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="sex">
              <Form.Label>Sex: </Form.Label>
              <Form.Control type="name" placeholder="Enter serving size" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="height">
              <Form.Label>Height: </Form.Label>
              <Form.Control type="name" placeholder="Enter serving size" />
              </Form.Group>
             
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

}

export default withAuth0(ProfileModal);