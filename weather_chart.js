
var chart = c3.generate({
  bindto: "#weather-chart",
  data: {
    url: "weather_data.json",
    mimeType: "json",
    axes: {
      temperatureMax: "y",
      precipIntensityMax: "y2"
    },
    types : {
      temperatureMin: "spline",
      temperatureMax: "spline",
      precipIntensityMax: "bar"
    },
    keys: { 
      x: "time",
      value: ["temperatureMax", "temperatureMin", "precipIntensityMax"],
    }
  },  
  // http://c3js.org/reference.html#data-json
  axis: {
    x: {
      type: "timeseries",
      tick: {
        format: "%A"
      },
      label: {
        text: "Day of Week",
        position: "outer-center"
      }
    },
    y: {
      max: 100,
      min: 30,
      label: {
        text: "Temperature (F)",
        position: "outer-middle"
      }
    },
    y2: {
      show: true,
      max: 0.5,
      label: {
        text: "Precipitation (in)",
        position: "outer-middle"
      }
    }
  },
  oninit: function () {
    d3.select("#weather-chart svg").append("text")
    .attr("x", 100)
    .attr("y", 20)
    .text("Aon Weather")
    .style("font-size","1.7em")
    .style("fill", "green");
  },
  padding: {
    top: 40
  },
  size: {
    height: 400
  }
});



