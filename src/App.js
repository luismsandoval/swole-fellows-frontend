import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Recipes from './Recipes';
import About from './About';
import ProfilePage from './Profile';

class App extends React.Component {

  render() {
    return (
      <>

        <Router>
          <Header />
          <Routes >
            <Route
              id="route"
              exact path="/"
              element={<Dashboard />}
            >
            </Route>
            <Route
              exact path="/recipes"
              element={<Recipes />}
            >
            </Route>
            <Route
              exact path='/profile'
              element={<ProfilePage />}
            >
            </Route>
            <Route
              exact path='/about'
              element={<About />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}


export default App;
