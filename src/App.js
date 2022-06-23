import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Recipes from "./Recipes";
import About from "./About";
import ProfilePage from "./Profile";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeight: [{weight: 0, timestamp: 0}],
      targetCalories: "",
      allUserInfo: ""
    };
  }

  componentDidMount() {
    this.getUserInfo();
    // this.getWeightData();
  }

  getWeightData = () => {
    const weightData = this.state.allUserInfo.map(value => {
      return {weight: value.weight, timestamp: value.timestamp}
    })
    const cal = this.state.allUserInfo[this.state.allUserInfo.length - 1].calories;
    this.getStats(weightData, cal)
  }

  getStats = (weight, calories) => {
    this.setState({
      currentWeight: weight,
      targetCalories: calories,
    });
  };

  getUserInfo = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/profile",
        };
        const response = await axios(config);
        this.setState({ allUserInfo: response.data });
      }
    } catch (error) {
      console.error("getUserInfo error: ", error);
    }
  };

  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              id="route"
              exact
              path="/"
              element={
                <Dashboard
                  currentWeight={this.state.currentWeight}
                  targetCalories={this.state.targetCalories}
                />
              }
            ></Route>
            <Route
              exact
              path="/profile"
              element={<ProfilePage />}
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
