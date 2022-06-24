import { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
class Profile extends Component {
  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>About the developers</h1>
        <Container className="about">
          <Card className="aboutCard">
            <Card.Img src="20220207_200416.jpg" rounded="true" />
            <Card.Header id="name" >Jim Doyle</Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item >Software Developer</ListGroup.Item>
                <ListGroup.Item>Marine Corps Veteran</ListGroup.Item>
                <ListGroup.Item >Former Chemical Engineer</ListGroup.Item>
                <ListGroup.Item >I write code, drink coffee, and cut rug.</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="aboutCard">
            <Card.Img src="IMG-0476.jpg"/>
            <Card.Body>
              <Card.Header id="name">Luis Sandoval</Card.Header>
              <Card.Text>
                Software developer, computer science student, and Marine Corps
                veteran. Studied economics at the University of Kansas before
                enlisting in active duty. Passionate about health and fitness
                and looking for ways to incorporate the newest technologies to
                promote a healthy lifestyle for every individual.
              </Card.Text>
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
