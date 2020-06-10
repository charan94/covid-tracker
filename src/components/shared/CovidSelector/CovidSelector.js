import React from "react";
import { Dropdown } from "semantic-ui-react";

export default class CovidSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states: props.states, value: props.selectedState };
  }

  build() {}

  searchChange = (event, data) => {
    if (data.value) {
      this.setState({ value: data.value });
    }
  };

  triggerSearch = async (event, data) => {
    await new Promise((r) => setTimeout(r, 500));
    if (this.state.value !== "") {
      this.props.cStateChange({ state: this.state.value });
    }
  };

  render() {
    return (
      <Dropdown
        placeholder="Select State"
        search
        selection
        options={this.state.states}
        onChange={this.searchChange}
        onClose={this.triggerSearch}
        value={this.state.value}
        searchQuery={this.state.searchQuery}
      />
    );
  }
}
