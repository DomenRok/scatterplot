import * as d3 from 'd3';



var margin = {top: 20, right: 30, bottom: 30, left: 30};
let data = d3.csv("data.csv")


let width = (window.outerWidth ||document.body.clientWidth) - margin.left - margin.right;
let height = (window.outerHeight ||document.body.clientHeight) - margin.top - margin.bottom;
let svg = d3.select("svg")
  .attr("width" , width).attr("height", height)
  .append("g")  
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let scaleX = d3.scaleLinear() 
.range([0, width])
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
let scaleY = d3.scaleLinear()
  .range([height, 0])

  
function render(data: any[]) {

  scaleY.domain([0, d3.max(data.map(a => +a.y))])
  scaleX.domain([0, d3.max(data.map(a => +a.x))])


  var axisX = d3.axisTop(scaleX);
  svg.append("g")
  .attr("transform", `translate(0, ${height-25})`)
  .call(axisX);

  var axisY = d3.axisLeft(scaleY)
  svg.append("g")
  .call(axisY)


  let circle = svg.selectAll("circle").data(data.map(function(d) { +d.x; +d.y; return d}))
  
  // Enter
  circle
  .enter().append("circle")
    .attr("cx", function(d) { return scaleX(d.x)})
    .attr("cy", function(d) { return scaleY(d.y)})
    .attr("r", "10")
    //.attr("r", function(d,i) { return scaleX(d.x) / scaleY(d.y) + 1})
    .attr("border", "none")
  
  // Update 
  circle
    .transition().duration(750)
    .attr("cx",  function() { return scaleX(d3.randomUniform(10, 1000)())})
    .attr("cy",  function() { return scaleY(d3.randomUniform(10, 190)())})
    .style("fill",function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
      })// Exit
  circle.exit().remove()
};

data.then(render);

var interval = d3.interval(function(elapsed) {
  //if (elapsed > 10000) {
  //  interval.stop();
  //}
}, 1000)
