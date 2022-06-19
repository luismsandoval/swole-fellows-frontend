import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ChangeFoodModal extends React.Component {

  handleSubmit = (event) => {

    event.preventDefault();
    const updatedFood = {
      calories: Math.round((this.props.selectedFoodToUpdate.calories * event.target.formServing.value) / this.props.selectedFoodToUpdate.servingSize ),
      fats: Math.round((this.props.selectedFoodToUpdate.fats * event.target.formServing.value) / this.props.selectedFoodToUpdate.servingSize),
      carbs: Math.round((this.props.selectedFoodToUpdate.carbs * event.target.formServing.value) / this.props.selectedFoodToUpdate.servingSize),
      protein: Math.round((this.props.selectedFoodToUpdate.protein * event.target.formServing.value) / this.props.selectedFoodToUpdate.servingSize),
      amountConsumed: event.target.formServing.value
    }
    this.props.updateFoodFromDB(this.props.selectedFoodToUpdate._id, updatedFood);
    this.props.onHide();
  }

  render() {
    return (

      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Change the mass of food you are eating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} >
            <Form.Group className="mb-3" controlId="formServing">
              <Form.Label>Update your serving size in Grams!</Form.Label>
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

export default ChangeFoodModal;
