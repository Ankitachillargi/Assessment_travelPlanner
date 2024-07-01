import React, { Component } from "react";
import AddTrip from "../components/AddTrip";
import Container from "@material-ui/core/Container";
import "../styles/registration.css";

export default class Registration extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <div className="Registration">
          <h2 className="Registration-title">Add Trip</h2>
          <hr></hr>
          <AddTrip />
        </div>
      </Container>
    );
  }
}
