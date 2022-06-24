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
import Row from "react-bootstrap/Row";
import "./App.css";

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
      selectedFood: "",
    };
  }

  async componentDidMount() {
    this.getFoodsFromDB();
  }

  foodSearch = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
  };

  handleShowModal = (value) => {
    // console.log("value: ", value);
    this.setState({
      showModal: true,
      selectedFood: value,
    });
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
        // console.log("token: ", jwt);

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
    const protein = this.state.foodsDB.length >= 1 && Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].protein;
      })
      .reduce((a, b) => a + b);

    const carbs = this.state.foodsDB.length >= 1 && Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].carbs;
      })
      .reduce((a, b) => a + b);

    const fats = this.state.foodsDB.length >= 1 && Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].fats;
      })
      .reduce((a, b) => a + b);

    const calories = this.state.foodsDB.length >= 1 && Object.entries(this.state.foodsDB)
      .map((value) => {
        return value[1].calories;
      })
      .reduce((a, b) => a + b);

    this.setState({
      macros: {
        protein: protein,
        carbs: carbs,
        fats: fats,
        calories: calories,
      },
    });
  };

  render() {
    return (
      <Container className="dashboard">
        <h1>Dashboard</h1>

        {this.props.targetCalories && (
          <Charts
            className="chart"
            foodsDB={this.state.foodsDB}
            macros={this.state.macros}
            currentWeight={this.props.currentWeight}
            targetCalories={this.props.targetCalories}
          />
        )}

        <Form onSubmit={this.getFoods} onChange={this.foodSearch} id="searchForm">
          <Form.Control type="name" placeholder="Search for foods!" />
        </Form>
        <Row xs={1} md={2} className="g-4">
          {this.state.foodsAPI &&
            this.state.foodsAPI.map((value) => {
              return (
                <Card id="card">
                  <Card.Img variant="top" src={value.image} />
                  <Card.Body>
                    <Card.Title>{value.foodName}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Calories {Math.round(value.calories)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Carbs {Math.round(value.carbs)} g
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Fats {Math.round(value.fats)} g
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Protein {Math.round(value.protein)} g
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Serving Size {Math.round(value.servingSize)} g
                    </ListGroup.Item>
                    <Button
                      variant="primary"
                      onClick={() => this.handleShowModal(value)}
                      id="selectButton"
                    >
                      Select Food
                    </Button>{" "}
                  </ListGroup>
                </Card>
              );
            })}
        </Row>
        <AddFoodModal
          foodAPI={this.state.foodsAPI}
          show={this.state.showModal}
          onHide={this.handleHideModal}
          addFoodtoDB={this.addFoodtoDB}
          selectedFood={this.state.selectedFood}
        />
      </Container>
    );
  }
}

export default withAuth0(Dashboard);
