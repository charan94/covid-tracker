import React from "react";
import { Dimmer, Loader, Container } from "semantic-ui-react";
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {
    return (
      <Container fluid>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Container>
    );
  }
}
