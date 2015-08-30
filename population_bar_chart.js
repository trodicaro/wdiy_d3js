var data = [
{age: "<5", population: 50},
{age: "5-13", population: 87},
{age: "14-17", population: 400},
{age: "18-24", population: 235},
{age: "25-44", population: 76},
{age: "45-64", population: 234},
{age: ">=65", population: 98}
];

var svg = d3.select(".chart").append("svg");

var barGroup = svg.append("g");

var barData = barGroup.selectAll("g").data(data).enter();

var bars = barData.append("g");

var rect = bars.append("rect");

var barWidth = 50;   

rect.attr("width", barWidth);

rect.attr("height", function (d) {
  return d.population;
});

rect.attr("x", function(d, i) {
  return i * barWidth + i * 10 + 10;
});

var maxHeight = d3.max(data, function (d) {
  return d.population;
});

var viewPortHeight = maxHeight + 500;

var viewPortWidth = 1000;

svg.attr("height", viewPortHeight).attr("width", viewPortWidth);

// define x axis
var x = d3.scale.linear().domain([0,viewPortWidth]).range([0,viewPortWidth]);

var xAxis = d3.svg.axis().scale(x);

var xAxisGroup =  svg.append("g").call(xAxis);

// define y axis
var y = d3.scale.linear().domain([0,viewPortHeight]).range([0,viewPortHeight]);

var yAxis = d3.svg.axis().scale(y).orient("right");

var yAxisGroup = svg.append("g").call(yAxis);

rect.attr("y", function (d) {
 return maxHeight - d.population;
});

barGroup.attr("transform", "translate(50, 50)");

bars.append("text").style("fill", "red").text(function (d) {
  return d.population;
}).attr("x", function (d, i) { 
  return (i * barWidth) + i* 10 + 15
}).attr("y", function (d) {
  return maxHeight - d.population
});

bars.append("text").style("fill", "yellow").text(function (d) {
  return d.age;
}).attr("x", function (d, i) {
  return (i * barWidth) + i * 10 + 15
}).attr("y", function (d) {
  return maxHeight;
});

barGroup.append("text").attr("x", 150).attr("y", 450).attr("class", "heading").text("Age vs Population");

var colors = d3.scale.category10();

bars.select("rect").attr("fill", function (d, i) {
  return colors(i)
});