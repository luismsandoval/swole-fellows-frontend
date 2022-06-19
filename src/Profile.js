import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ChangeFoodModal from "./ChangeFoodModal";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
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
      showModal: false,
    };
  }

  componentDidMount() {
    this.getFoodsFromDB();
  }

  handleAmountChange = (event) => this.setState({ title: event.target.value });

  handleShowModal = (event) => {
    this.setState({ showModal: true });
  };

  handleHideModal = (event) => {
    this.setState({ showModal: false });
  };

  getFoodsFromDB = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log("Token: ", jwt);

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
          data: updatedFood
        };
        await axios(config);
        this.getFoodsFromDB();
      }
    } catch (error) {
      console.error("updateFoodToDB error:", error);
    }
  };

  render() {
    return (
      <>
        <Profile />
        <h1> this is your diary</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount Consumed {"g"}</th>
              <th>Calories {"g"}</th>
              <th>Carbs {"g"}</th>
              <th>Protein {"g"}</th>
              <th>Fat {"g"}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.foodsDB).map((obj) => (
              <>
                <tr>
                  <td>{obj[1].name}</td>
                  <td>{obj[1].amountConsumed}</td>
                  <td>{obj[1].calories}</td>
                  <td>{obj[1].carbs}</td>
                  <td>{obj[1].protein}</td>
                  <td>{obj[1].fats}</td>
                </tr>
                <Button
                  variant="primary"
                  onClick={
                    (() => this.setState({ selectedFoodToUpdate: obj[1], showModal: true }))
                  }
                >
                  Change
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.deleteFoodFromDB(obj[1]._id)}
                >
                  Delete
                </Button>
              </>
            ))}
          </tbody>
        </Table>
        <ChangeFoodModal 
        show = {this.state.showModal}
        onHide = {this.handleHideModal}
        selectedFoodToUpdate = {this.state.selectedFoodToUpdate}
        updateFoodFromDB = {this.updateFoodFromDB}
        />
      </>
    );
  }
}

export default withAuth0(ProfilePage);
