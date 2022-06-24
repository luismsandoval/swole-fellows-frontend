import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ChangeFoodModal from "./ChangeFoodModal";
import ProfileModal from "./ProfileModal";
import ProfileTable from "./ProfileTable";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Card } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div id="profile">
        <img src={user.picture} alt={user.name} id="profileImg" />
        <h2 id="userName">{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodsDB: "",
      selectedFoodToUpdate: "",
      userInfo: "",
      showModal: false,
      showProfileModal: false,
    };
  }

  handleAmountChange = (event) => this.setState({ title: event.target.value });

  handleHideModal = (event) => {
    this.setState({
      showModal: false,
    });
  };

  handleHideProfileModal = (event) => {
    this.setState({
      showProfileModal: false,
    });
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
        this.setState({ foodsDB: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteFoodFromDB = async (id) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "delete",
          baseURL: process.env.REACT_APP_SERVER,
          url: `foodDB/${id}`,
        };
        await axios(config);
        this.getFoodsFromDB();
      }
    } catch (error) {
      console.error("DeleteFoodFromDB error:", error);
    }
  };

  updateFoodFromDB = async (id, updatedFood) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "put",
          baseURL: process.env.REACT_APP_SERVER,
          url: `foodDB/${id}`,
          data: updatedFood,
        };
        await axios(config);
        this.getFoodsFromDB();
      }
    } catch (error) {
      console.error("updateFoodToDB error:", error);
    }
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
        this.setState(
          {
            userInfo: response.data[response.data.length - 1],
            allUserInfo: response.data,
          },
          this.props.getWeightData(response.data)
        );
      }
    } catch (error) {
      console.error("getUserInfo error: ", error);
    }
  };

  addUserInfo = async (profileinfo) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
          method: "post",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/profile",
          data: profileinfo,
        };
        await axios(config);
        this.getUserInfo();
      }
    } catch (error) {
      console.error("addUserInfo error:", error);
    }
  };

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>Profile</h1>
        <Card body id="profileCard">
          <Container className="profile-test">
            <Profile />
            <ProfileTable
              userInfo={this.state.userInfo}
              getFoodsFromDB={this.getFoodsFromDB}
              getUserInfo={this.getUserInfo}
            />
          </Container>
          <Button
            id="profileButton"
            variant="primary"
            onClick={() => this.setState({ showProfileModal: true })}
          >
            Update Info
          </Button>
        </Card>
        <div>
          <Card body id="profileCard">
            <Container id="tableHead">
              <h1>Diary</h1>
              <Table striped bordered hover id="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Amount Consumed {"g"}</th>
                    <th>Calories</th>
                    <th>Carbs {"g"}</th>
                    <th>Protein {"g"}</th>
                    <th>Fat {"g"}</th>
                    <th>Make Changes</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(this.state.foodsDB).map((obj) => (
                    <>
                      <tr key={obj[1]._id}>
                        <td>{obj[1].name}</td>
                        <td>{obj[1].amountConsumed}</td>
                        <td>{obj[1].calories}</td>
                        <td>{obj[1].carbs}</td>
                        <td>{obj[1].protein}</td>
                        <td>{obj[1].fats}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="Danger"
                              id="dropdown-basic"
                            >
                              Edit
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                id="changeButton"
                                variant="primary"
                                onClick={() =>
                                  this.setState({
                                    selectedFoodToUpdate: obj[1],
                                    showModal: true,
                                  })
                                }
                              >
                                Change
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="deleteButton"
                                variant="danger"
                                onClick={() =>
                                  this.deleteFoodFromDB(obj[1]._id)
                                }
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </Container>
          </Card>

          <ChangeFoodModal
            show={this.state.showModal}
            onHide={this.handleHideModal}
            selectedFoodToUpdate={this.state.selectedFoodToUpdate}
            updateFoodFromDB={this.updateFoodFromDB}
          />
        </div>
        <ProfileModal
          show={this.state.showProfileModal}
          onHide={this.handleHideProfileModal}
          addUserInfo={this.addUserInfo}
          updateUserInfo={this.updateUserInfo}
          getUserInfo={this.getUserInfo}
          userInfo={this.state.userInfo}
        />
      </Container>
    );
  }
}

export default withAuth0(ProfilePage);
