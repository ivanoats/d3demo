# Learn Data Visualization with D3.js

I will walk you through a simplified setup of one of the most fun
D3.js visualizations, a force directed graph.

#### Prerequistes

Node and Bower installed and working on your system.

If you want it all set up already, or to use as a local reference, go ahead and
clone this repo:

`git clone https://github.com/codefellows/d3demo.git`

## Create a Project and Install D3

```
npm -g install node-static   (if you haven't already)
mkdir d3demo && cd d3demo
bower init
mkdir -p public
```

We want our bower components to be available to a simple static server, so we
want them to be installed under the `public` directory.

Put this in a file called `.bowerrc`
```
{
  "directory" : "public/components"
}
```
then:

`bower install d3 --save`
