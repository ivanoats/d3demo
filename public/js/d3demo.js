'use strict';
/* global d3 */

var w = 500, h = 500;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);


var dataset = {
  nodes: [
    {name: 'Ivan'},
    {name: 'Ben'},
    {name: 'Mike'},
    {name: 'Will'},
    {name: 'Brook'}
  ],
  edges: [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 1, target: 2},
    {source: 2, target: 3}
  ]
};

var colors = d3.scale.category10();

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
  .attr('r', 10)
  .style('fill', function(d, i) {
    return colors(i);
  })
  .call(force.drag);

force.on('tick', function() {
  edges.attr('x1', function(d) { return d.source.x; })
       .attr('y1', function(d) { return d.source.y; })
       .attr('x2', function(d) { return d.target.x; })
       .attr('y2', function(d) { return d.target.y; });

  nodes.attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; });
});
