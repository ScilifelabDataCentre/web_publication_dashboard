# web_publication_dashboard
A dashboard for showing publication visualisations based on SciLifeLab Publications Database https://publications.scilifelab.se 

Will be hosted on scilifelab.se

## Dependencies

### spin.js
https://spin.js.org

### Cytoscape
https://js.cytoscape.org

### Plotly
https://plot.ly/javascript/

### requirejs 
https://requirejs.org/docs/download.html

This project uses requirejs to combine all javascript files into one.

Installed with:
```
npm install -g requirejs
```
#### Building js into one file
In the js folder:
```
r.js -o baseUrl=. name=app out=app-built.js
```

### Deploying to web page
Contact company representative via email to make a pull from the master branch on this repository.
