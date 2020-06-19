import React from "react";
import Loading from "./components/shared/Loading/Loading";
import CovidContainer from "./components/CovidContainer/CovidContainer";
import CovidFooter from './components/shared/Footer/CovidFooter';
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  renderHtml() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div className="covid-app">
          <CovidContainer />
          <CovidFooter />
        </div>
      );
    }
  }

  render() {
    return this.renderHtml();
  }
}
