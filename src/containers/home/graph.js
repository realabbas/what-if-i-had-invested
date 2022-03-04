/* App.js */
import axios from 'axios';
import React from "react";
import CanvasJSReact from './canvas/canvasjs.stock.react';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const Graph = ({ asset }) => {

  const [dataPoints, setDataPoints] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    axios.get(`/coins/${asset.id}/ohlc?vs_currency=usd&days=365`)
      .then(
        (result) => {
          const data = result.data;
          var dps = [];
          for (var i = 0; i < data.length; i++) {
            dps.push({
              x: new Date(data[i][0]),
              y: data[i][4]
            });
          }
          setIsLoaded(true);
          setDataPoints(dps)
        }
      )
  }, [asset])

  console.log("dp", dataPoints)

  const options = {
    title: {
      text: "Price Variation"
    },
    theme: "light2",
    subtitles: [{
      text: `${asset.symbol.toUpperCase()}/USD`
    }],
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM DD YYYY"
        }
      },
      axisY: {
        title: `${asset.name.toUpperCase()} Price`,
        prefix: "$",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "$#,###.##"
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (in USD)",
        type: "splineArea",
        color: "#3576a8",
        yValueFormatString: "$#",
        xValueFormatString: "MMM DD YYYY",
        dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date("2017-05-01"),
        maximum: new Date("2018-05-01")
      }
    }
  };
  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto"
  };

  return (
    <div>
      <div>
        {
          isLoaded &&
          <CanvasJSStockChart containerProps={containerProps} options={options}
          />
        }
      </div>
    </div>
  );
}

export default Graph; 