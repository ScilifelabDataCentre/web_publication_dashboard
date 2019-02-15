
function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}
function draw_label_pie(target_div, publications_json, chart_title){
	//Collections arrays
	console.log();
	var years = {};
	for (i=0; i<publications_json["publications"].length; i++){
		var year = publications_json["publications"][i]["published"].split('-')[0];
		if (years.hasOwnProperty(year)){
			years[year].push(publications_json["publications"][i]);
		} else {
			years[year] = [];
			years[year].push(publications_json["publications"][i]);
		}
	}
	for (var year in years){
		var dois = [];
		var pmids = [];
		var label_count = {};
		var titles_for_word_cloud = "";
		label_length_count = {}
		for (i=0; i<years[year].length; i++){
			var doi = years[year][i]["doi"];
			var title = years[year][i]["title"];
			var labels = years[year][i]["labels"];
			var pmid = years[year][i]["pmid"];
			pmids.push(pmid);
			dois.push(doi);
			titles_for_word_cloud = titles_for_word_cloud + " " + title;
			var label_length = 0;
			for (var key in labels){
				//No idea why labels.length doesnt work...
				label_length += 1;
				if (label_count.hasOwnProperty(key)){
					label_count[key] += 1;
				} else {
					label_count[key] = 1;
				}
			}
			if (label_length != 0){
				if (label_length_count.hasOwnProperty(label_length)){
					label_length_count[label_length] += 1;
				} else {
					label_length_count[label_length] = 1;
				}
			}
		}
		//console.log(label_length_count);
		//Pie chart of labels
		var data = [{
			values:[], 
			labels:[], 
			type: "pie", 
			textinfo: "value", 
			name: ""
		}];
		var layout = {
			grid: {rows: 2, columns: 1, pattern: 'independent'},
			title: chart_title, 
			showlegend: false,
			autosize: false,
			width: 600,
			height: 1000,
			margin: {
				l: 100,
				r: 100,
				b: 100,
				t: 100,
				pad: 1
			},
			yaxis2: {
				title: "Publication count",
			},
			xaxis2: {
				title: "Number of labels"
			}
		}
		//console.log(label_count);
		for (var lab in label_count){
			data[0].values.push(label_count[lab]);
			data[0].labels.push(lab);
		}
		//doing bar chart for labels
		data.push({
			x:[], 
			y:[], 
			type: "bar",
			hoverinfo: "value+label",
			xaxis: 'x2', //this sets it to 
			yaxis: 'y2',  //seconnd chart area
			name: ""
		});
		for (var lab_len in label_length_count){
			data[1].x.push(lab_len);
			data[1].y.push(label_length_count[lab_len]);
		}

		$(target_div).append('<div id="pie'+year+'" style="display:none" class="piechart"></div>');
		$('#button_holder').append('<button id="button'+year+'">'+year+'</button>');

		Plotly.newPlot('pie'+year, data, layout, {displayModeBar: false});
	}
}
function draw_cyto(target_div, publications_json){
	var all_labels = [];
	var all_collab_labels = [];
	var edges = {};
	var label_count = {};
	for (i=0; i<publications_json["publications"].length; i++){
		//console.log(publications_json["publications"][i]);
		var pub_labels = publications_json["publications"][i]["labels"];
		var tmp_labels = [];
		for (var key in pub_labels){
			//console.log(key);
			//No idea why labels.length doesnt work...
			//checking index of the key, if -1 its not in list yet
			tmp_labels.push(key);
			if (all_labels.indexOf(key)==-1){	
				all_labels.push(key);
			}
			if (label_count.hasOwnProperty(key)){
				label_count[key] += 1;
			} else {
				label_count[key] = 1;
			}
		}
		tmp_labels = tmp_labels.sort();
		if (tmp_labels.length>1){
			for (var j=0; j<tmp_labels.length-1;j++){
				if (edges.hasOwnProperty(tmp_labels[j]+"+"+tmp_labels[j+1])){
					edges[tmp_labels[j]+"+"+tmp_labels[j+1]] += 1;
				}else{
					edges[tmp_labels[j]+"+"+tmp_labels[j+1]] = 1;
				}
				if (all_collab_labels.indexOf(tmp_labels[j])==-1){	
					all_collab_labels.push(tmp_labels[j]);
				}	
				//add all the labels except last one (which isnt looped through)
			}
			//add last label which wasnt looped in
			if (all_collab_labels.indexOf(tmp_labels[tmp_labels.length - 1])==-1){	
				all_collab_labels.push(tmp_labels[tmp_labels.length - 1]);
			}	
		}
	}
	console.log(label_count)
	//console.log(all_collab_labels);
	//console.log(edges);
	var options = {
 name: 'concentric',

  fit: true, // whether to fit the viewport to the graph
  padding: 30, // the padding on fit
  startAngle: 3 / 2 * Math.PI, // where nodes start in radians
  sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
  clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
  minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
  nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  height: undefined, // height of layout area (overrides container height)
  width: undefined, // width of layout area (overrides container width)
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
  return node.degree();
  },
  levelWidth: function( nodes ){ // the letiation of concentric values in each level
  return nodes.maxDegree() / 4;
  },
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
  transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts

	};
	var cy = cytoscape({
	container: document.getElementById('cyto'),
	elements: [],
	style: [
	{
		selector: 'node',
		style: {
			'background-color': 'blue',
			'label': 'data(id)',
			"width": "mapData(score, 0, 200, 200, 600)",
			"height": "mapData(score, 0, 200, 200, 600)",
			"font-size": "24px",
			"text-valign": "center",
			"text-halign": "center",
			"background-color": "#555",
			"text-outline-color": "#555",
			"text-outline-width": "2px",
			"color": "#fff",
			"overlay-padding": "6px",
			"z-index": "10", 
			"text-wrap": "wrap", 
			"text-max-width": 40
		}
	}]
	});
	for (var label in all_collab_labels){
		console.log(all_labels[label]);
		console.log(label_count[all_labels[label]]);
		var node_size = label_count[all_labels[label]];
		console.log(node_size);
		cy.add({data:{id:all_collab_labels[label], score:node_size}})
	}
	for (var key in edges){
		var str_split = key.split("+");
		console.log(str_split);
		cy.add({data:{id:key, source:str_split[0], target:str_split[1]}, selector: ".multiline-auto", style:{width: edges[key], "text-wrap": "wrap", "text-max-width": 80 }})
		//console.log(edges[key]);
	}
	cy.layout(options).run()
}

function onReady(callback) {

    var intervalID = window.setInterval(checkReady, 100);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}