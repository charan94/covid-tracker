import React from "react";
// import CovidMap from '../Map/CovidMap';
import CovidHeader from "../shared/Header/CovidHeader";
import { Container, Divider, Grid, Header, Segment } from "semantic-ui-react";
import service from "../../services/covid.service";
import Loading from "../shared/Loading/Loading";
import CovidTable from "../CovidTable/CovidTable";
import CovidSelector from "../shared/CovidSelector/CovidSelector";
import CovidTimeChart from "../CovidTimeChart/CovidTimeChart";
import moment from "moment";

export default class CovidContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      states: [],
      selectedState: "",
      timeSeries: null,
      loadChart: false,
      loadCovidTable: false,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("resultState")) {
      this.getCovidData();
    } else {
      if (localStorage.getItem("lastUpdatedTime")) {
        if (
          moment().diff(
            moment(localStorage.getItem("lastUpdatedTime")),
            "minutes"
          ) > 15
        ) {
          localStorage.clear();
          this.getCovidData();
        } else this.setState(JSON.parse(localStorage.getItem("resultState")));
      } else {
        this.setState(JSON.parse(localStorage.getItem("resultState")));
      }
    }
  }

  getCovidData() {
    service
      .getCasesByState()
      .then((res) => {
        const resultState = {
          data: res.data.sort((a, b) =>
            a.noOfCases - b.noOfCases > 0 ? -1 : 1
          ),
          states: res.data.map((r) => {
            return {
              key: r.state.split(" ")[0],
              value: r.state,
              text: r.state,
            };
          }),
        };
        this.setState(resultState);
        localStorage.setItem("resultState", JSON.stringify(resultState));
        localStorage.setItem("lastUpdatedTime", moment().toISOString());
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }

  buildCovidDataTable() {
    if (!this.state.loadCovidTable) {
      return <CovidTable data={this.state.data} color="red" />;
    } else {
      return (
        <Segment textAlign="center" loading style={{ height: "400px" }}>
          <Header as="h4" textAlign="center" color="black">
            Loading...
          </Header>
        </Segment>
      );
    }
  }

  buildCovidTimeSeriesChart() {
    if (
      (!this.state.selectedState || !this.state.timeSeries) &&
      !this.state.loadChart
    ) {
      return (
        <Segment textAlign="center" style={{ height: "400px" }}>
          <Header as="h4" textAlign="center" color="black">
            Please select a state to view its Timeline Chart.
          </Header>
        </Segment>
      );
    } else if (this.state.loadChart) {
      return (
        <Segment textAlign="center" loading style={{ height: "400px" }}>
          <Header as="h4" textAlign="center" color="black">
            Loading...
          </Header>
        </Segment>
      );
    } else if (this.state.selectedState && this.state.timeSeries) {
      return (
        <Segment raised>
          <CovidTimeChart timeSeries={this.state.timeSeries} />
        </Segment>
      );
    }
  }

  buildMain() {
    if (this.state.data.length && this.state.states.length) {
      return (
        <div>
          <Grid columns={1}>
            <Grid.Column textAlign="center">
              <CovidSelector
                states={this.state.states}
                cStateChange={this.searchChange}
                selectedState={this.state.selectedState}
              />
            </Grid.Column>
          </Grid>
          <Grid columns={2} divided style={{ margin: "5px", padding: "5px" }}>
            <Grid.Column style={{ overflowY: "scroll", height: "400px" }}>
              {this.buildCovidDataTable()}
            </Grid.Column>
            <Grid.Column>{this.buildCovidTimeSeriesChart()}</Grid.Column>
          </Grid>
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  searchChange = async (event) => {
    this.setState({ loadCovidTable: true, loadChart: true });
    this.getTimeData(event.state);
    let data = this.state.data.sort((a, b) =>
      a.noOfCases - b.noOfCases > 0 ? -1 : 1
    );
    let filteredStates = data.filter((r) => r.state !== event.state);
    await new Promise((r) => setTimeout(r, 100));
    filteredStates.unshift(data.filter((r) => r.state === event.state)[0]);
    await new Promise((r) => setTimeout(r, 100));
    this.setState({
      data: filteredStates,
      selectedState: event.state,
      loadCovidTable: false,
    });
  };

  getTimeData(covidState) {
    service
      .getTimelineByState()
      .then((res) => {
        console.log(
          "data ",
          res.data.filter((r) => r["State UT"] === covidState)[0]
        );
        this.setState({
          timeSeries: res.data.filter((r) => r["State UT"] === covidState)[0],
          loadChart: false,
        });
      })
      .catch((err) => {
        console.log("err ", err);
        this.setState({ timeSeries: null, loadChart: false });
      });
  }

  render() {
    return (
      <Container fluid style={{ marginTop: "20px" }}>
        <CovidHeader />
        <Divider />
        {this.buildMain()}
      </Container>
    );
  }
}
