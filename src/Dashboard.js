import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      foodsDisplayed: ''
    }
  }

  getFoods = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/food?query=${this.state.searchQuery}`;
      const response = await axios.get(url);
      this.setState({ foodsDisplayed: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  foodSearch = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
    console.log(this.state.searchQuery);
  }

  render() {
    console.log(this.state.searchQuery);
    return (
      <Container>
        <h1>Dashboard</h1>
        <p>this is a dashboard test</p>
        <Form onSubmit={this.getFoods} onChange={this.foodSearch}>
          <Form.Control type='name' placeholder='Search for foods!' />
        </Form>
      </Container>
    )
  }
}

export default Dashboard;
