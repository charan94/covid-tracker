import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from 'moment';

export default class CovidTimeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chartOptions: {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Timeline of Corona Cases in '+ this.props.timeSeries['State UT']
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Corona Cases'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Total Cases',
            data: Object.entries(this.props.timeSeries).filter(r => r[0] !== 'State UT').map(r => {
                r[0] = moment(r[0]).valueOf();
                return r;
            })
        }]
    }};
    console.log('data ', Object.entries(this.props.timeSeries).filter(r => r[0] !== 'State UT').map(r => {
        r[0] = moment(r[0]).valueOf();
        return r;
    }));
  }

  buildChart() {}

  render() {
    return <HighchartsReact highcharts={Highcharts} options={this.state.chartOptions} />;
  }
}
