import * as d3 from 'd3';
import { color } from 'd3';

interface Coordinate {
  x: number,
  y: number,
};

let data = d3.csv("data.csv");

let width = 1280, height = 700;
let svg = d3.select("svg").attr("width", width).attr("height", height);



  
function render(data: any[]) {
  let scaleX = d3.scaleLinear()
  .domain([0, d3.max(data.map(a => +a.x)) + 30])
  .range([0, width])
  let scaleY = d3.scaleLinear()
  .domain([0, d3.max(data.map(a => +a.y)) + 30])
  .range([0, height])
  
  var axisX = d3.axisTop(scaleX);
  svg.append("g")
  .attr("transform", "translate(20, 685)")
  .call(axisX);

  var axisY = d3.axisLeft(scaleY)
  svg.append("g")
  .attr("transform", "translate(20, 20)")
  .call(axisY)


  let circle = svg.selectAll("circle").data(data)
  
  // Enter
  circle
  .enter().append("circle")
    .attr("cx", function(d) { return scaleX(d.x)})
    .attr("cy", function(d) { return scaleY(d.y)})
    .attr("r", 20)
   .attr("border", "none")
  
  // Update 
  circle
    .transition().duration(250)
    .attr("r", function(d) { return Math.random() * 20})    
    .attr("fill", function(d,i ) { return i % 2 ? "#F00" : "#0F0"})
    // Exit
  circle.exit().remove()
};




data.then(render);

d3.interval(function() {
  data.then(render);
}, 500)