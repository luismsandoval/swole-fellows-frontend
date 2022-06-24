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
import { withAuth0 } from "@auth0/auth0-react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeight: "",
      targetCalories: "",
      allUserInfo: ""
    };
  }

  // componentDidMount() {
  //   this.getUserInfo();
  //   this.state.allUserInfo && this.getWeightData();
  // }

  getWeightData = (data) => {
    const weightData = data.map(value => {
      console.log(value);
      return {weight: value.currentWeight, timestamp: value.timestamp};
    })
    const cal = data[data.length - 1].targetCal;
    console.log('All user info: ', data);
    this.setState({
      currentWeight: weightData,
      targetCalories: cal,
    });
  }

  // getStats = (weight, calories) => {
  //   this.setState({
  //     currentWeight: weight,
  //     targetCalories: calories,
  //   });
  // };

  // getUserInfo = async () => {
  //   try {
  //     if (this.props.auth0.isAuthenticated) {
  //       const res = await this.props.auth0.getIdTokenClaims();
  //       const jwt = res.__raw;
  //       const config = {
  //         headers: { Authorization: `Bearer ${jwt}` },
  //         method: "get",
  //         baseURL: process.env.REACT_APP_SERVER,
  //         url: "/profile",
  //       };
  //       const response = await axios(config);
  //       this.setState({ allUserInfo: response.data }, this.getWeightData(response.data));
  //     }
  //   } catch (error) {
  //     console.error("getUserInfo error: ", error);
  //   }
  // };

  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              id="route"
              exact
              path="/dashboard"
              element={
                <Dashboard
                  currentWeight={this.state.currentWeight}
                  targetCalories={this.state.targetCalories}
                />
              }
            ></Route>
            <Route
              exact
              path="/"
              element={<ProfilePage 
                getWeightData={this.getWeightData}
              />}
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
