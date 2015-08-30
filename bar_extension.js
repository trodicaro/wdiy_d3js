
var svg = d3.select(".chart").append("svg");

var group = svg.append("g");

var accesssor = function (d) {
  var monthTotal = Math.round(d.monthtotal / 1000);
  return {
    stationName: d.stationame,
    monthlyTotal: monthTotal
  };
}

var callback = function (data) {

  data = data.sort(function (a, b) {
    return d3["descending"](a.monthlyTotal, b.monthlyTotal);
  });

  var viewPortHeight = 800;
  var viewPortWidth = 1000;
  var barWidth = 50;
  var spaceBetweenBars = 20;
  var viewPortWidth = data.length * (barWidth + spaceBetweenBars);

  group.attr("transform", "translate(0, 50)");

  svg.attr("height", viewPortHeight).attr("width", viewPortWidth);

  var bars = group.selectAll("g").data(data).enter().append("g");

  var rect = bars.append("rect");

  rect.attr("width", barWidth).attr("height", function (d) {
    return d.monthlyTotal;
  });

  // define x axis
  var x = d3.scale.ordinal().rangePoints([0, viewPortWidth]);

  x.domain(data.map(function (d) {
    return d.stationName;
  }));

  rect.attr("x", function (d) {
    return x(d.stationName);
  });

  // define y axis
  var y = d3.scale.linear().domain([0,viewPortHeight]).range([0,viewPortHeight]);

  var yAxis = d3.svg.axis().scale(y).orient("right");

  var yAxisGroup = svg.append("g").call(yAxis);

  var maxHeight = d3.max(data, function (d) {
    return d.monthlyTotal;
  })

  bars.append("text").attr("y", function (d) {
    return y(d.monthlyTotal);
    })
    .style("fill", "red")
    .text(function (d) {
      return d.monthlyTotal;
    })
    .attr("x", function (d, i) {
      return (i * barWidth) + i * 20 + 15
    })
    .attr("y", function (d) {
      return maxHeight - d.monthlyTotal;
    });

    var xAxis = d3.svg.axis().scale(x);

    var xAxisGroup = group.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate (0, " + maxHeight + " )").selectAll("text").attr("transform", "rotate(-70)").style("text-anchor", "end");

    var colors = d3.scale.category20();

    bars.select("rect").attr("fill", function (d, i) {
      return colors(i)
    });

    group.append("text").attr("x", 300).attr("y", 50).attr("class", "heading").text("CTA Rider frequency for July 2014").style("fill", "red");

    rect.attr("y", function (d) {
      return maxHeight - d.monthlyTotal;
    });

  }

d3.csv("cta-rides-july-2014.csv", accesssor, callback);

