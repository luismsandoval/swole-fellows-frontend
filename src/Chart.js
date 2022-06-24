import React from "react";
import { Container } from "react-bootstrap";
import Chart from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { Carousel } from "react-bootstrap";
import "./App.css";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caloricGoal: 2800,
    };
  }

  render() {
    return (
      <Container style={{ width: "40%" }}>
        <Carousel>
          <Carousel.Item>
            <Doughnut
              options={{
                plugins: {
                  legend: {
                    display: true,
                  },
                  title: {
                    text: "Daily Calories",
                    display: true,
                  },
                },
              }}
              data={{
                labels: ["Calories Eaten", "Calories Remaining"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [
                      this.props.macros.calories,
                      this.props.targetCalories - this.props.macros.calories < 0
                        ? 0
                        : this.props.targetCalories -
                          this.props.macros.calories,
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.7)",
                      "rgba(54, 162, 235, 0.7)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Doughnut
              options={{
                plugins: {
                  legend: {
                    display: true,
                  },
                  title: {
                    text: "Daily Macros",
                    display: true,
                  },
                },
              }}
              data={{
                labels: ["Protein", "Fats", "Carbs"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [
                      this.props.macros.protein,
                      this.props.macros.fats,
                      this.props.macros.carbs,
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.7)",
                      "rgba(255, 206, 86, 0.7)",
                      "rgba(54, 162, 235, 0.7)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Weight Diary",
                  },
                },
              }}
              data={{
                labels: this.props.currentWeight.map(
                  (value) => value.timestamp
                ),
                datasets: [
                  {
                    label: "Weight",
                    data: this.props.currentWeight.map((value) => value.weight),
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default Charts;
