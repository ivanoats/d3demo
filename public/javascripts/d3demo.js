/* global d3 */
/* jshint devel: true */
/* jshint browser: true */

'use strict';
// set the width and height
var w = 500, h = 300;

// create an svg element on the page
var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)
  .style('border', '1px solid #000');


// load our graph data
d3.json('data.json', function(error, json) {
  if (error) {
    alert('Error loading data file');
  } else {
    drawForceGraph(json);
  }
});

function drawForceGraph(dataset) {

  // automatic color range
  var colors = d3.scale.category10();

  // create the force layout
  var force = d3.layout.force()
                       .nodes(dataset.nodes)
                       .links(dataset.edges)
                       .linkDistance([50])
                       .charge([-100])
                       .size([w,h])
                       .start();

  var edges = svg.selectAll('line')
                 .data(dataset.edges)
                 .enter()
                 .append('line')
                 .style('stroke', '#ccc')
                 .style('stroke-width', 1);

  var nodes = svg.selectAll('circle')
                 .data(dataset.nodes)
                 .enter()
                 .append('circle')
                 // radius
                 .attr('r', 10)
                 .style('fill', function(d, i) {
                   return colors(i);  //jshint ignore:line
                  })
                 .call(force.drag)
                 .on('click', function(d) {
                   alert(d.name);    //jshint ignore:line
                  })
                  .on('mouseover', function(d) {
                    d3.select(this).style('fill', 'yellow');
                  })
                  .on('mouseout', function(d, i) {
                    console.dir(colors(i));

                    d3.select(this).style('fill', function(d, i) {
                      return colors(i);
                    });
                  });

  // update the locations after dragging
  force.on('tick', function() {
    edges.attr('x1', function(d) { return d.source.x; })
         .attr('y1', function(d) { return d.source.y; })
         .attr('x2', function(d) { return d.target.x; })
         .attr('y2', function(d) { return d.target.y; });

    nodes.attr('cx', function(d) { return d.x; })
         .attr('cy', function(d) { return d.y; });
  });
}

