'use strict';
/* global d3, BinarySearchTree */

var w = 500, h = 500;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

var bst = new BinarySearchTree();

bst.add(50);
bst.add(25);
bst.add(75);
bst.add(1);
bst.add(12);
bst.add(62);
bst.add(100);

console.dir(bst);
console.log('bst.toString() is: ' + bst.toString());
console.log('Nodes to array are: ', bst.toArray());

var bstArray = bst.toArray();
var nodes = [];
var edges = [];

// Figure out edges array
bst.traverse(function(node){
  console.log('working on node value', node.value);
  // find node.value positions in nodes array
  var sourceNodePosition = bstArray.indexOf(node.value);
  nodes.push({name: node.value});
  if (node.left) {
    var leftTargetNodePosition  = bstArray.indexOf(node.left.value);
    edges.push({source: sourceNodePosition, target: leftTargetNodePosition});
  }
  if (node.right) {
    var rightTargetNodePosition = bstArray.indexOf(node.right.value);
    edges.push({source: sourceNodePosition, target: rightTargetNodePosition});
  }
});

console.log('Edges are: ');
console.dir(edges);

var dataset = {
  nodes: nodes,
  edges: edges
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
