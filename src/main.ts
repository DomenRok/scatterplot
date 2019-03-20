import * as d3 from 'd3';

interface Coordinate {
  x: number,
  y: number,
};


var svg = d3.select("svg").attr("width", 600).attr("height", 600);

let arrayOfObjects: Coordinate[] = [{x: 30, y:100}, {x:60, y:120}, {x:100, y:200}, {x: 120, y:240}];

var scaleX = d3.scaleLinear()
  .domain([10, 200])
  .range([50, 550])
  //.domain(d3.extent(arrayOfObjects.map(a => a.x)))
var scaleY = d3.scaleLinear()
  .domain([10, 200])  
  .range([50, 550]);
  //.domain(d3.extent(arrayOfObjects.map(a => a.y)))



  
function render(data: Coordinate[]) {
  // Select
  let circle = svg.selectAll("circle").data(data)
  
  // Enter
  circle
  .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 2.5)
  
    
  circle
    .attr("r", function(d) { return d.x/100 + Math.random() * 40});


  // Exit
  circle.exit().remove()
};

render(arrayOfObjects);

d3.interval(function() {
  render(arrayOfObjects);
}, 500)