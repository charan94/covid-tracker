import React from "react";
import { Table } from "semantic-ui-react";

export default class CovidTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {header: false, body: false};
    this.data = [];
    this.tblHeaders = ['State', 'Total Cases', 'Total Cured', 'Total Deaths'];
    this.headers = [];
    this.buildTblHeader();
    this.buildTblBody();
  }

  componentDidMount() {}

  buildTblHeader() {
    if (this.tblHeaders) {
      for (let h = 0; h < this.tblHeaders.length; h ++) {
        this.headers.push(<Table.HeaderCell key={h}>{ this.tblHeaders[h] }</Table.HeaderCell>);
      }
    }
  }

  buildTblBody() {
    if (this.props.data) {
      for (let d = 0; d < this.props.data.length; d++) {
        this.data.push(
        <Table.Row key={d}>
            <Table.Cell>{this.props.data[d].state}</Table.Cell>
            <Table.Cell>{this.props.data[d].noOfCases}</Table.Cell>
            <Table.Cell>{this.props.data[d].cured}</Table.Cell>
            <Table.Cell>{this.props.data[d].deaths}</Table.Cell>
        </Table.Row>);
      }
    }
  }

  render() {
    return (
      <Table color={this.props.color} fixed striped>
        <Table.Header>{this.headers}</Table.Header>
        <Table.Body>
            {this.data}
        </Table.Body>
      </Table>
    );
  }
}
