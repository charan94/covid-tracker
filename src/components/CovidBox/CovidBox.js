import React from "react";
import { Card, Header } from "semantic-ui-react";

export default class CovidBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buildTotal() {
    return (
      <Card color="orange">
        <Card.Content>
          <Card.Header>Cases</Card.Header>
          <Card.Description>
            <Header as="h3" color="orange">
              {this.props.totalCases}
            </Header>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  buildRecovered() {
    return (
        <Card color="green">
          <Card.Content>
            <Card.Header>Recovered</Card.Header>
            <Card.Description>
              <Header as="h3" color="green">
                {this.props.totalRecovered}
              </Header>
            </Card.Description>
          </Card.Content>
        </Card>
      );
  }

  buildDeaths() {
    return (
        <Card color="red">
          <Card.Content>
            <Card.Header>Deaths</Card.Header>
            <Card.Description>
              <Header as="h3" color="red">
                {this.props.totalDeaths}
              </Header>
            </Card.Description>
          </Card.Content>
        </Card>
      );
  }

  render() {
    return (
      <Card.Group centered stackable>
        {this.buildTotal()}
        {this.buildRecovered()}
        {this.buildDeaths()}
      </Card.Group>
    );
  }
}
