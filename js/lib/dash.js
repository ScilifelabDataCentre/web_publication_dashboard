
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
		$('#button_holder').append('<button id="button'+year+'" class="year_button">'+year+'</button>');
		// console.log(year)

		Plotly.newPlot('pie'+year, data, layout, {displayModeBar: false});
	}
}
function draw_cyto(target_div, publications_json){

	// Map from Facility label to Platform name
	var platform_map = {
		"Tissue Profiling": "Affinity Proteomics",
		"Fluorescence Tissue Profiling": "Affinity Proteomics",
		"Fluorescence Correlation Spectroscopy": "Bioimaging",
		"Bioinformatics Compute and Storage": "Bioinformatics",
		"Bioinformatics Long-term Support WABI": "Bioinformatics",
		"Bioinformatics Support and Infrastructure": "Bioinformatics",
		"Systems Biology": "Bioinformatics",
		"Cryo-EM (SU)": "Cellular and Molecular Imaging",
		"Advanced Light Microscopy (ALM)": "Cellular and Molecular Imaging",
		"BioImage Informatics": "Cellular and Molecular Imaging",
		"Cell Profiling": "Cellular and Molecular Imaging",
		"Cryo-EM": "Cellular and Molecular Imaging",
		"Cryo-EM (UmU)": "Cellular and Molecular Imaging",
		"Protein Science Facility (PSF)": "Cellular and Molecular Imaging",
		"Swedish NMR Centre (SNC)": "Cellular and Molecular Imaging",
		"Chemical Biology Consortium Sweden (KI)": "Chemical Biology and Genome Engineering",
		"Chemical Biology Consortium Sweden (UmU)": "Chemical Biology and Genome Engineering",
		"Chemical Biology Consortium Sweden (CBCS)": "Chemical Biology and Genome Engineering",
		"Genome Engineering Zebrafish": "Chemical Biology and Genome Engineering",
		"High-throughput Genome Engineering (HTGE)": "Chemical Biology and Genome Engineering",
		"Clinical Genomics Gothenburg": "Diagnostics Development",
		"Clinical Genomics Lund": "Diagnostics Development",
		"Clinical Genomics Stockholm": "Diagnostics Development",
		"Clinical Genomics Uppsala": "Diagnostics Development",
		"Drug Discovery and Development (DDD)": "Drug Discovery and Development",
		"Karolinska High Throughput Center (KHTC)": "Functional Genomics",
		"Ancient DNA": "Genomics",
		"NGI Stockholm": "Genomics",
		"NGI Stockholm (Genomics Applications)": "Genomics",
		"NGI Stockholm (Genomics Production)": "Genomics",
		"NGI Uppsala (SNP&SEQ Technology Platform)": "Genomics",
		"NGI Uppsala (Uppsala Genome Center)": "Genomics",
		"Eukaryotic Single Cell Genomics (ESCG)": "Genomics",
		"Microbial Single Cell Genomics": "Genomics",
		"Clinical Biomarkers": "Next-Generation Diagnostics",
		"Mass Cytometry (KI)": "Proteomics and Metabolomics",
		"Mass Cytometry (LiU)": "Proteomics and Metabolomics",
		"Mass Cytometry": "Proteomics and Metabolomics",
		"Single Cell Proteomics": "Proteomics and Metabolomics",
		"Autoimmunity Profiling": "Proteomics and Metabolomics",
		"Chemical Proteomics and Proteogenomics (MBB)": "Proteomics and Metabolomics",
		"Chemical Proteomics and Proteogenomics (OncPat)": "Proteomics and Metabolomics",
		"Chemical Proteomics & Proteogenomics": "Proteomics and Metabolomics",
		"PLA Proteomics": "Proteomics and Metabolomics",
		"Plasma Profiling": "Proteomics and Metabolomics",
		"Swedish Metabolomics Centre (SMC)": "Proteomics and Metabolomics",
		"Clinical Proteomics Mass spectrometry": "Regional facilities of national interest",
		"Mass Spectrometry-based Proteomics, Uppsala": "Regional facilities of national interest",
		"Array and Analysis Facility": "Regional facilities of national interest",
		"Mutation Analysis Facility (MAF)": "Regional facilities of national interest",
		"Bioinformatics and Expression Analysis (BEA)": "Regional facilities of national interest",
		"BioMaterial Interactions (BioMat)": "Regional facilities of national interest",
		"Advanced Mass Spectrometry Proteomics": "Regional facilities of national interest"
	}
	// Map from Platform name to colour
	var platform_colour_map = {
		"Affinity Proteomics": "#8dd3c7",
		"Bioimaging": "#ffffb3",
		"Bioinformatics": "#bebada",
		"Cellular and Molecular Imaging": "#fb8072",
		"Chemical Biology and Genome Engineering": "#80b1d3",
		"Drug Discovery and Development": "#fdb462",
		"Diagnostics Development": "#b3de69",
		"Functional Genomics": "#d9d9d9",
		"Genomics": "#fccde5",
		"Next-Generation Diagnostics": "#bc80bd",
		"Proteomics and Metabolomics": "#ccebc5",
		"Regional facilities of national interest": "#ffed6f"
	}

	// Variables which will store information
	// All labels used
	var all_labels = [];
	// All labels which have a collaboration
	var all_collab_labels = [];
	// All collaborations and their counts
	var edges = {};
	// Counts for all labels
	var label_count = {};

	for (i=0; i<publications_json["publications"].length; i++){
		var pub_labels = publications_json["publications"][i]["labels"];

		// Using these labels because we want to remove some...
		var used_labels = Object.keys(pub_labels);
		
		// Cleaning up the labels with these rules
		if (used_labels.indexOf("NGI Stockholm (Genomics Applications)") >= 0){
			used_labels.splice(used_labels.indexOf("NGI Stockholm (Genomics Applications)"), 1);
			used_labels.splice(used_labels.indexOf("NGI Stockholm (Genomics Production)"), 1);
			used_labels.push("NGI Stockholm");
		}
		if (used_labels.indexOf("NGI Stockholm (Genomics Production)") >= 0){
			used_labels.splice(used_labels.indexOf("NGI Stockholm (Genomics Applications)"), 1);
			used_labels.splice(used_labels.indexOf("NGI Stockholm (Genomics Production)"), 1);
			used_labels.push("NGI Stockholm");
		}
		if (used_labels.indexOf("Bioinformatics Compute and Storage") >= 0){
			used_labels.splice(used_labels.indexOf("Bioinformatics Compute and Storage"), 1);
		}

		var tmp_labels = [];
		for (var key in used_labels){
			//checking index of the key, if -1 its not in list yet
			tmp_labels.push(used_labels[key]);
			if (all_labels.indexOf(used_labels[key]) == -1){	
				all_labels.push(used_labels[key]);
			}
			if (label_count.hasOwnProperty(used_labels[key])){
				label_count[used_labels[key]] += 1;
			} else {
				label_count[used_labels[key]] = 1;
			}
		}

		// Need to sort them because of how the edges are stored "Facility+Facility"
		// If unsorted it might create two different edges of the same type of collabs
		tmp_labels = tmp_labels.sort();
		if (tmp_labels.length>1){
			for (var j=0; j<tmp_labels.length-1;j++){
				// Adding an edge for this label and the next one in the list
				if (edges.hasOwnProperty(tmp_labels[j]+"+"+tmp_labels[j+1])){
					edges[tmp_labels[j]+"+"+tmp_labels[j+1]] += 1;
				}else{
					edges[tmp_labels[j]+"+"+tmp_labels[j+1]] = 1;
				}
				if (all_collab_labels.indexOf(tmp_labels[j])==-1){	
					all_collab_labels.push(tmp_labels[j]);
				}	
				// add all the labels except last one (which isnt looped through)
			}
			// add last label to collab label list because it wasnt in the loop
			if (all_collab_labels.indexOf(tmp_labels[tmp_labels.length - 1])==-1){	
				all_collab_labels.push(tmp_labels[tmp_labels.length - 1]);
			}	
		}
	}

	// These two values are used to spread the node and edge sizes
	var highest_collab = edges[Object.keys(edges).reduce(function(a, b){ return edges[a] > edges[b] ? a : b })];
	var highest_lab_no = label_count[Object.keys(label_count).reduce(function(a, b){ return label_count[a] > label_count[b] ? a : b })];

	// Start the cytoscape object
	var cy = cytoscape({
	container: document.getElementById('cyto'),
	elements: [], // Adding the elements later
	minZoom: 0.2, // Better zoom limits
	maxZoom: 1.2, // Better zoom limits
	style: [
		{
			"selector": 'node', // Node styling
			"style": {
				'label': 'data(name)',
				"width": "mapData(score, 0, "+highest_lab_no+", 200, 400)",  // Maps the label counts from 0 to max
				"height": "mapData(score, 0, "+highest_lab_no+", 200, 400)", // between node sizes 200 and 400
				"font-size": "50px",
				"text-valign": "center",
				"text-halign": "center",
				"background-color": "#AAAAAA", // Default bg colour of the node
				"color": "#000000", // Text colour
				"overlay-padding": "6px",
				"z-index": "10", 
				"text-wrap": "wrap", 
				"text-max-width": 40
			}
		},
		{	"selector": 'edge', // edge styling
			"style": {
				"width": "mapData(weight, 0, "+highest_collab+", 5, 100)",
				"color": "#AAAAAA"
			}
		},
		{
			"selector": "edge.unbundled-bezier", // Currently used curvy edge
			"style": {
				"curve-style": "unbundled-bezier",
				"control-point-distances": 120,
				"control-point-weights": 0.1
			}
		}
	]
	});

	// Add all nodes
	for (var label in all_collab_labels){
		// Set the node size after number of publications with their label
		var node_size = label_count[all_collab_labels[label]];

		// Add the actual node
		cy.add({
			"data":{
				"id":all_collab_labels[label],
				"name":all_collab_labels[label], 
				"score":node_size // Calling this a score instead of size
			}, 
			"style":{
				// Set platform colour
				"background-color":platform_colour_map[platform_map[all_collab_labels[label]]]
			}
		})
	}
	// Add all edges
	for (var key in edges){
		var str_split = key.split("+");
		cy.add({
			"data":{
				"id":key, 
				"source":str_split[0], 
				"target":str_split[1], 
				"weight":edges[key] // the number of collabs are stored in the edges object
			}, 
			"classes": "unbundled-bezier" 
		})
	}

	// Set some things on mouseover
	cy.on('mouseover', 'node', function(evt){
		// Get the node
		var node = evt.target; 
		
		// Set publications count as the name instead of facility name
		node.data("name", node.data("score")+" publications");
		node.style("font-size", "100px");
		
		// Set the colour of all connected edges to SciLifeLab Green
		node.connectedEdges().animate({
			"style": {lineColor: "#95C11E"},
			"duration": 10
		});
	});

	// RESET the transform when mouseout
	cy.on('mouseout', 'node', function(evt){
		var node = evt.target;
		node.data("name", node.id());
		node.style("font-size", "50px");
		node.connectedEdges().animate({
			style: {lineColor: "#AAAAAA"},
			"duration": 10
		});
	});

	// This options variable contains the layout information for the network
	// this one is called cose and uses a physics simulation to lay out graphs
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
		nodeRepulsion: function( node ){ return 20480; },
		// Node repulsion (overlapping) multiplier
		nodeOverlap: 4,
		// Ideal edge (non nested) length
		idealEdgeLength: function( edge ){ return 320; },
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
	// Shows an element
    document.getElementById(id).style.display = value ? 'block' : 'none';
}