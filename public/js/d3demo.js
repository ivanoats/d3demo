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
    {source: 0, target: 1, weight: 4, stroke: '#c9c'}, // #cc99cc
    {source: 1, target: 0, weight: 8, stroke: '#ccc'},
    {source: 0, target: 2, weight: 1, stroke: '#3fc' },
    {source: 1, target: 2, weight: 3, stroke: '#c00' },
    {source: 2, target: 3, weight: 9, stroke: '#b09' },
    {source: 4, target: 3, weight: 2, stroke: '#0b2' }
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
               .style('stroke', function(d) {
                 return d.stroke;
               })
               .style('stroke-width', function(d) {
                 return d.weight;
               });

var nodes = svg.selectAll('circle')
  .data(dataset.nodes)
  .enter()
  .append('circle')
  .attr('r', 10)
  .style('fill', function(d, i) {
    return colors(i);
  })
  .call(force.drag);

var labels = svg.selectAll('text')
                .data(dataset.nodes)
                .enter()
                .append('text')
                .attr('id', 'tooltip')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '11px')
                .attr('font-weight', 'bold')
                .attr('fill', 'black')
                .text(function(d) { return d.name;} );

force.on('tick', function() {
  edges.attr('x1', function(d) { return d.source.x; })
       .attr('y1', function(d) { return d.source.y; })
       .attr('x2', function(d) { return d.target.x; })
       .attr('y2', function(d) { return d.target.y; });

  nodes.attr('cx', function(d) { return d.x; })
       .attr('cy', function(d) { return d.y; });

  labels.attr('transform', function(d) { return 'translate(' +  (d.x + 10) +  ',' + d.y + ')'; } );

});
