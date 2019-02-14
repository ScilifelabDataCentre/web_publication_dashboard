
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
	console.log(all_collab_labels);
	console.log(edges);
	var options = {
		name: 'cose',
		// Called on `layoutready`
		ready: function(){},
		// Called on `layoutstop`
		stop: function(){},
		// Whether to animate while running the layout
		// true : Animate continuously as the layout is running
		// false : Just show the end result
		// 'end' : Animate with the end result, from the initial positions to the end positions
		animate: true,
		// Easing of the animation for animate:'end'
		animationEasing: undefined,
		// The duration of the animation for animate:'end'
		animationDuration: undefined,
		// A function that determines whether the node should be animated
		// All nodes animated by default on animate enabled
		// Non-animated nodes are positioned immediately when the layout starts
		animateFilter: function ( node, i ){ return true; },
		// The layout animates only after this many milliseconds for animate:true
		// (prevents flashing on fast runs)
		animationThreshold: 250,
		// Number of iterations between consecutive screen positions update
		// (0 -> only updated on the end)
		refresh: 20,
		// Whether to fit the network view after when done
		fit: true,
		// Padding on fit
		padding: 30,
		// Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		boundingBox: undefined,
		// Excludes the label when calculating node bounding boxes for the layout algorithm
		nodeDimensionsIncludeLabels: false,
		// Randomize the initial positions of the nodes (true) or use existing positions (false)
		randomize: false,
		// Extra spacing between components in non-compound graphs
		componentSpacing: 40,
		// Node repulsion (non overlapping) multiplier
		nodeRepulsion: function( node ){ return 204800; },
		// Node repulsion (overlapping) multiplier
		nodeOverlap: 4,
		// Ideal edge (non nested) length
		idealEdgeLength: function( edge ){ return 32; },
		// Divisor to compute edge forces
		edgeElasticity: function( edge ){ return 320; },
		// Nesting factor (multiplier) to compute ideal edge length for nested edges
		nestingFactor: 1.2,
		// Gravity force (constant)
		gravity: 1,
		// Maximum number of iterations to perform
		numIter: 1000,
		// Initial temperature (maximum node displacement)
		initialTemp: 1000,
		// Cooling factor (how the temperature is reduced between consecutive iterations
		coolingFactor: 0.99,
		// Lower temperature threshold (below this point the layout will end)
		minTemp: 1.0,
		// Pass a reference to weaver to use threads for calculations
		weaver: false
	};
	var cy = cytoscape({
	container: document.getElementById('cyto'),
	elements: [],
	style: [
	{
		selector: 'node',
		style: {
			'shape': 'square',
			'background-color': 'blue',
			'label': 'data(id)',
			"font-size": "24px",
			"text-valign": "center",
			"text-halign": "center",
			"background-color": "#555",
			"text-outline-color": "#555",
			"text-outline-width": "2px",
			"color": "#fff",
			"overlay-padding": "6px",
			"z-index": "10"
		}
	}]
	});
	for (var label in all_collab_labels){
		//console.log(all_labels[label]);
		cy.add({data:{id:all_collab_labels[label]}, style:{width:500, height:500}})
	}
	for (var key in edges){
		var str_split = key.split("+");
		cy.add({data:{id:key, source:str_split[0], target:str_split[1]}, style:{width: edges[key]}})
		console.log(str_split);
		console.log(edges[key]);
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