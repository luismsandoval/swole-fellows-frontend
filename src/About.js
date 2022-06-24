import { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

class Profile extends Component {
  render() {
    return (
      <Container>
        <h1 style={{textAlign: 'center'}}>About the developers</h1>
        <Container className="about">
          <Card className="aboutCard">
            <Card.Img src="" />
            <Card.Body>
              <Card.Header id="name">Jim Doyle</Card.Header>
              <Card.Text>I really like to code</Card.Text>
            </Card.Body>
          </Card>
          <Card className="aboutCard">
            <Card.Img src="" />
            <Card.Body>
              <Card.Header id="name">Luis Sandoval</Card.Header>
              <Card.Text>I like to code.</Card.Text>
            </Card.Body>
          </Card>
          <Card className="aboutCard">
            <Card.Img src="" />
            <Card.Body>
              <Card.Header id="name">Justin Mathieu</Card.Header>
              <Card.Text>I like to code.</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    );
  }
}

export default Profile;
