console.log('app is connected!');

(function() {
  //setting the width and height of our board
  var width = 900;
      height = 600;

  //creating the svg and appending it to the id
  var svg = d3.select("#bubble-chart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)")

  var radiusScale = d3.scaleSqrt().domain([1, 100]).range([20, 50])

  //collection of forces about where we want our cicles to go and how we want them to interact
  var forceXSplit = d3.forceX(function(d) {
    if (d.Category === 'Development') {
      return 250
    } else {
      return 700
    }
  }).strength(0.05)

  var forceXCombine = d3.forceX(width / 2).strength(0.05)

  var forceCollide = d3.forceCollide(function(d) {
    return radiusScale(d.Level) + 1;
  })

  var simulation = d3.forceSimulation()
    //telling the circles to go to the middle of the board
    .force("x", forceXCombine)
    .force("y", d3.forceY(height / 2).strength(0.05))
    //making circles to not collide. give the radius of the area that we want the collision to avoid.
    .force("collide", forceCollide)

  //queuing our data
  d3.queue()
    .defer(d3.csv, "data/tech-stack.csv")
    .await(ready)

  function ready (error, datapoints) {
    //creating the circles
    var circles = svg.selectAll(".tech-stack")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "tech-stack")
      .attr("r", function(d) {
        return radiusScale(d.Level);
      })
      .attr("fill", "#de9bc4")
      .on("click", function(d) {
        console.log(d);
      })

    d3.select("#split").on("click", function() {
      simulation
        .force("x", forceXSplit)
        .alphaTarget(0.35)
        .restart()
    })

    d3.select("#combine").on("click", function() {
      simulation
        .force("x", forceXCombine)
        .alphaTarget(0.35)
        .restart()
    })

    //tells the browser to run the 'ticked' function
    simulation.nodes(datapoints)
      .on("tick", ticked)

    function ticked() {
      circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
    }

  }


})();
