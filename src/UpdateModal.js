import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateModal extends React.Component {

  handleSubmitUpdate = (event) => {

    event.preventDefault();
    const updatedFood = {
      name: this.props.foodAPI.foodName,
      calories: event.target.formServing.value,
      servingSize: this.props.foodAPI.servingSize,
      fats: event.target.formServing.value,
      carbs: Math.round((this.props.foodAPI.carbs * event.target.formServing.value) / this.props.foodAPI.servingSize),
      protein: Math.round((this.props.foodAPI.protein * event.target.formServing.value) / this.props.foodAPI.servingSize),
      image: this.props.foodAPI.image,
      amountConsumed: event.target.formServing.value
    }
    console.log(updatedFood);
    this.props.addFoodtoDB(updatedFood);
    this.props.onHide();
  }

  render() {
    return (

      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmitUpdate} >
            <Form.Group className="mb-3" controlId="formServing">
              <Form.Label>Calories</Form.Label>
              <Form.Control value="calories" placeholder="How many Calories" />
              <Form.Label>Protein</Form.Label>
              <Form.Control value="protein" placeholder="Enter Protein" />
              <Form.Label>Fats</Form.Label>
              <Form.Control value="fats" placeholder="Fats" />
              <Form.Label>Carbs</Form.Label>
              <Form.Control value="carbs" placeholder="Carbs" />
              <Form.Label>Serving Size</Form.Label>
              <Form.Control value="servingSize" placeholder="serving size" />
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

export default UpdateModal;
