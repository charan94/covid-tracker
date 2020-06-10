import React from "react";
import { Header } from "semantic-ui-react";
export default class CovidHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header as="h2" textAlign="center" color="black">
        Covid Tracker
        <Header.Subheader>
         Real time tracking, Made with React.
        </Header.Subheader>
      </Header>
    );
  }
}
