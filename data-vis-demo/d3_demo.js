console.log("app connected");

// GRABBING ELEMENTS
 var  mainTitle = d3.select(".main-title");
      headerLogo = d3.select("#header-logo img");

      svg = d3.select(".main");
      r = d3.scale.sqrt().domain([52070, 1380000000]).range([10, 40]);
      x = d3.scale.log().domain([250,100000]).range([0,600]);
      y = d3.scale.linear().domain([15,90]).range([250,0]);



 // UPDATING ELEMENTS

 // changing the main title text to 'Gapminder World: China'
 mainTitle.text("Gapminder World: China")
  .style("text-transform", "uppercase");

// changing the alt text to 'logo'
headerLogo.attr('alt', 'logo');

//
svg.append('svg')
  .attr('width', 600)
  .attr('height', 300)
  .append('circle')
  .attr('fill', 'red')
  .attr('r', r(1380000000))
  .attr('cx', x(13330))
  .attr('cy', y(77));
