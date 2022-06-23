import axios from "axios";
import React from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import AddFoodModal from "./AddFoodModal";
import Charts from "./Chart";
import './App.css';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      foodsDB: "",
      errorMessage: "",
      foodsAPI: "",
      showModal: false,
      macros: "",
    };
  }

  async componentDidMount() {
    this.getFoodsFromDB();
  }

  foodSearch = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
  };

  handleShowModal = (event) => {
    this.setState({ showModal: true });
  };

  handleHideModal = (event) => {
    this.setState({ showModal: false });
  };

  getFoods = async (event) => {
    event.preventDefault();
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log("token: ", jwt);

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
          url: `/food?search=${this.state.searchQuery}`,
        };
        const foodResponse = await axios(config);
        this.setState({ foodsAPI: foodResponse.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  getFoodsFromDB = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/foodDB",
        };
        const response = await axios(config);
        this.setState({ foodsDB: response.data }, () => this.addMacros());
      }
    } catch (error) {
      console.error(error);
    }
  };

  addFoodtoDB = async (food) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "post",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/foodDB",
          data: food,
        };
        await axios(config);
        this.getFoodsFromDB();
      }
    } catch (error) {
      console.error("addFoodtoDB error:", error);
    }
  };

  addMacros = () => {
    console.log(this.state.foodsDB);
    const protein = Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].protein;
      })
      .reduce((a, b) => a + b);

    const carbs = Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].carbs;
      })
      .reduce((a, b) => a + b);

    const fats = Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].fats;
      })
      .reduce((a, b) => a + b);

    const calories = Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].calories;
      })
      .reduce((a, b) => a + b);

    this.setState({
      macros: {
        protein: protein,
        carbs: carbs,
        fats: fats,
        calories: calories
      },
    });
  };

  // deleteFoodFromDB = async (id) => {
  //   try {
  //     if (this.props.auth0.isAuthenticated) {
  //       const res = await this.props.auth0.getIdTokenClaims();
  //       const jwt = res.__raw;

  //       const config = {
  //         headers: { "Authorization": `Bearer ${jwt}` },
  //         method: 'delete',
  //         baseURL: process.env.REACT_APP_SERVER,
  //         url: `foodDB/${id}`
  //       }
  //       await axios(config);
  //       this.getFoodsFromDB();
  //     }
  //   } catch (error) {
  //     console.error('DeleteFoodFromDB error:', error)
  //   }
  // }

  // updateFoodFromDB = async (id) => {
  //   try {
  //     if (this.props.auth0.isAuthenticated) {
  //       const res = await this.props.auth0.getIdTokenClaims();
  //       const jwt = res.__raw;

  //       const config = {
  //         headers: { "Authorization": `Bearer ${jwt}` },
  //         method: 'put',
  //         baseURL: process.env.REACT_APP_SERVER,
  //         url: `foodDB/${id}`,

  //       }
  //       await axios(config);
  //       this.getFoodsFromDB();
  //     }
  //   } catch (error) {
  //     console.error('updateFoodToDB error:', error)
  //   }
  // }

  render() {
    return (
      <Container className="dashboard">
        <h1>Dashboard</h1>

        <Form onSubmit={this.getFoods} onChange={this.foodSearch}>
          <Form.Control type="name" placeholder="Search for foods!" />
        </Form>
        {this.state.foodsAPI && (
          <Card id="card" >
            <Card.Img variant="top" src={this.state.foodsAPI.image} />
            <Card.Body>
              <Card.Title>{this.state.foodsAPI.foodName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Calories {Math.round(this.state.foodsAPI.calories)}
              </ListGroup.Item>
              <ListGroup.Item>
                Carbs {Math.round(this.state.foodsAPI.carbs)}
              </ListGroup.Item>
              <ListGroup.Item>
                Fats {Math.round(this.state.foodsAPI.fats)}
              </ListGroup.Item>
              <ListGroup.Item>
                Protein {Math.round(this.state.foodsAPI.protein)}
              </ListGroup.Item>
              <ListGroup.Item>
                Serving Size {Math.round(this.state.foodsAPI.servingSize)}
              </ListGroup.Item>
              <Button variant="primary" onClick={this.handleShowModal} id="selectButton">
                Select Food
              </Button>{" "}
            </ListGroup>
          </Card>
        )}
        <AddFoodModal
          foodAPI={this.state.foodsAPI}
          show={this.state.showModal}
          onHide={this.handleHideModal}
          addFoodtoDB={this.addFoodtoDB}
        />
        <Charts className="chart" foodsDB={this.state.foodsDB} macros={this.state.macros} />
      </Container>
    );
  }
}

export default withAuth0(Dashboard);
