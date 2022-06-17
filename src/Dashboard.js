import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { withAuth0 } from '@auth0/auth0-react';
 

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      foodsDisplayed: '',
      errorMessage: '',
      foods: ''
    }
  }


  async componentDidMount() {
    // new for lab 15
  }


  getFoods = async (event) => {
    event.preventDefault();
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        console.log('token: ', jwt);

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }, // new lab 15
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/food?search=${this.state.searchQuery}`,
        }
        const foodResponse = await axios(config);
        this.setState({ foods: foodResponse.data });
        console.log("Food from API call: ", foodResponse.data);
      }
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

export default withAuth0(Dashboard);
