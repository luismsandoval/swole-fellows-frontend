import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import About from "./About";
import ProfilePage from "./Profile";
import { withAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeight: "",
      targetCalories: "",
      allUserInfo: ""
    };
  }

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
