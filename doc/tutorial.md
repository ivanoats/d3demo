# Learn Data Visualization with D3.js

## Create a Project and Install D3

```
npm init
bower install d3
```

## Get D3 working in a simple HTML page

Create a simple HTML page that loads the D3 library via a script tag.

index.html
```

```


## Set up an Express App to serve the web pages and data

We will eventually be loading data from the web server, and we won't be able
to use a `file:///` style URL because of
[CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS)
restrictions on AJAX (XHR) requests.
