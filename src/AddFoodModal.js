import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddFoodModal extends React.Component {

  handleSubmit = (event) => {

    event.preventDefault();
    const newFood = {
      name: this.props.foodAPI.foodName,
      calories: Math.round((this.props.foodAPI.calories * event.target.formServing.value) / this.props.foodAPI.servingSize ),
      servingSize: Math.round(this.props.foodAPI.servingSize),
      fats: Math.round((this.props.foodAPI.fats * event.target.formServing.value) / this.props.foodAPI.servingSize),
      carbs: Math.round((this.props.foodAPI.carbs * event.target.formServing.value) / this.props.foodAPI.servingSize),
      protein: Math.round((this.props.foodAPI.protein * event.target.formServing.value) / this.props.foodAPI.servingSize),
      image: this.props.foodAPI.image,
      amountConsumed: event.target.formServing.value
    }
    console.log(newFood);
    this.props.addFoodtoDB(newFood);
    this.props.onHide();
  }

  render() {
    return (

      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} >
            <Form.Group className="mb-3" controlId="formServing">
              <Form.Label>Enter the mass of food you are eating</Form.Label>
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

export default AddFoodModal;
