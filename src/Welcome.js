import React from "react";
import { Container } from "react-bootstrap";

class Welcome extends React.Component {
  render() {
    return (
      <Container style={{ textAlign: "center" }}>
        <h1>Welcome back!</h1>
        <h2>Login or create a new account to get started.</h2>
      </Container>
    );
  }
}

export default Welcome;
