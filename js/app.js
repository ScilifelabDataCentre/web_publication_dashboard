/*
requirejs code from https://requirejs.org/docs/api.html#jsfiles
*/
requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: 'js/lib',
});
function show(id, value) {
	// Shows an element
    document.getElementById(id).style.display = value ? 'block' : 'none';
}
function resize_iframe(obj) {
	obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}

function draw_content_latest_publications(publication_lists){
	// Draw publications list
	returning_dois = draw_latest_publications(publication_lists["this_year_publications"].concat(publication_lists["last_year_publications"]));
	
	// Create a worker to fetch from crossref API
	let worker_latest_publications_crossref = new Worker('js/lib/fetch_crossref.js');
	worker_latest_publications_crossref.onmessage = function(e){
		// Send the data from crossref to edit the table of publications
		// This sets proper publication dates and gets full journal names
		edit_latest_publications(e.data[0], e.data[1]);
	}
	// Start the crossref API requests
	// This will run in the bg while the site works as normal
	for (i in returning_dois){
		worker_latest_publications_crossref.postMessage([returning_dois[i], i]);
	}
	show('spinner_latest_publications', false);
}
function draw_content_facility_network(publication_lists, cytoscape_years){
	// Draw the cytoscape network
	show('cytoscape_network', true);
	draw_cyto(
		"cytoscape_network", 
		publication_lists["this_year_publications"].concat(
		publication_lists["last_year_publications"]).concat(
		publication_lists["lastlast_year_publications"]),
		cytoscape_years
	);
	show('spinner_facility_network', false);
}


// Start the main app logic requiring jquery, spin, wordcloud and my own stuff
// spin.js from https://spin.js.org
// wordcloud2.js from https://github.com/timdream/wordcloud2.js

requirejs(['jquery', 'spin', 'wordcloud2', 'helpers', 'cytoscape_network', 'plotly_charts', 'current_status', 'publication_stats'],
function($, spin, wordcloud2, helpers, cytoscape_network, plotly_charts, current_status, publication_stats){
	/*
	End of code from https://requirejs.org/docs/api.html#jsfiles

	The rest is dashboard specific and runs in this function 
	that requirejs has loaded the libs into
	*/



	// menu bar buttons

	$(".load_button").click(function(){
		$(".load_button").removeClass('active');
		$(this).toggleClass('active'); 
	});

	// Options for the loading animation
	var opts = {
		lines: 12,
		length: 27,
		width: 150,
		radius: 80,
		scale: 1.0,
		corners: 1,
		color: '#95C11E',
		fadeColor: 'transparent',
		animation: 'spinner-line-fade-quick',
		rotate: 0,
		direction: 1,
		speed: 1,
		zIndex: 2e9,
		className: 'spinner',
		top: '500px',
		left: '50%',
		shadow: 'inset 2px 2px black, inset -2px -2px black, inset 2px -2px black, inset -2px 2px black',
		position: 'absolute',
	};

	// Start the loading animations
	var target_current_status = document.getElementById('spinner_current_status');
	var spinner_current_status = new Spinner(opts).spin();
	target_current_status.appendChild(spinner_current_status.el);

	var target_latest_publications = document.getElementById('spinner_latest_publications');
	var spinner_latest_publications = new Spinner(opts).spin();
	target_latest_publications.appendChild(spinner_latest_publications.el);

	var target_facility_network = document.getElementById('spinner_facility_network');
	var spinner_facility_network = new Spinner(opts).spin();
	target_facility_network.appendChild(spinner_facility_network.el);

	var target_publication_stats = document.getElementById('spinner_publication_stats');
	var spinner_publication_stats = new Spinner(opts).spin();
	target_publication_stats.appendChild(spinner_publication_stats.el);

	var target_facility_output = document.getElementById('spinner_facility_output');
	var spinner_facility_output = new Spinner(opts).spin();
	target_facility_output.appendChild(spinner_facility_output.el);

	// Start the rest of the processing
	onReady(function () {

		// Flags for if things are loaded and ready
		var loaded_flags = {
			"all_publications": false,
			"this_year_publications": false,
			"last_year_publications": false,
			"lastlast_year_publications": false,
			"current_status": false,
			"latest_publications": false,
			"facility_network": false,
			"publication_stats": false,
			"facility_output": false
		}
		// The publication lists will be kept here
		var publication_lists = {
			"all_publications": null,
			"this_year_publications": null,
			"last_year_publications": null,
			"lastlast_year_publications": null
		}
		// Configurations
		var current_year = new Date().getFullYear();
		var cytoscape_years = [(current_year-2).toString(), (current_year-1).toString(), current_year.toString()];

		// Workers
		// bg workers start to download everything in the background when page loads
		// Loading ALL pubs in the "full=false" version and the last three years in full version
		let worker_all_bg = new Worker('js/lib/fetch.js');
		worker_all_bg.onmessage = function(e) {
			publication_lists["all_publications"] = e.data;
			loaded_flags["all_publications"] = true;
			console.log("all_publications loaded");

	 		draw_label_pie("#charts", publication_lists["all_publications"]);
			show('spinner_facility_output', false);
	 		loaded_flags["facility_output"] = true;
		}
		let worker_this_bg = new Worker('js/lib/fetch.js');
		worker_this_bg.onmessage = function(e) {
			publication_lists["this_year_publications"] = e.data;
			loaded_flags["this_year_publications"] = true;
			console.log("this_year_publications loaded");

			// This should draw the current status tab content
			if (loaded_flags["this_year_publications"]){
				current_status_content(publication_lists["this_year_publications"], current_year);
				show("spinner_current_status", false);
				loaded_flags["current_status"] = true;
			}
			// This should draw the latest publications tab content
			if (loaded_flags["this_year_publications"] && loaded_flags["last_year_publications"]){
				draw_content_latest_publications(publication_lists);
				loaded_flags["latest_publications"] = true;
			}
			// This should draw the facility network
			if (loaded_flags["this_year_publications"] && loaded_flags["last_year_publications"] && loaded_flags["lastlast_year_publications"]){
				draw_content_facility_network(publication_lists, cytoscape_years)
				loaded_flags["facility_network"] = true;
			}
		}
		let worker_last_bg = new Worker('js/lib/fetch.js');
		worker_last_bg.onmessage = function(e) {
			publication_lists["last_year_publications"] = e.data;
			loaded_flags["last_year_publications"] = true;
			console.log("last_year_publications loaded");

			// This should draw the latest publications tab content
			if (loaded_flags["this_year_publications"] && loaded_flags["last_year_publications"]){
				draw_content_latest_publications(publication_lists);
				loaded_flags["latest_publications"] = true;
			}
			// This should draw the facility network
			if (loaded_flags["this_year_publications"] && loaded_flags["last_year_publications"] && loaded_flags["lastlast_year_publications"]){
				draw_content_facility_network(publication_lists, cytoscape_years)
				loaded_flags["facility_network"] = true;
			}
		}
		let worker_lastlast_bg = new Worker('js/lib/fetch.js');
		worker_lastlast_bg.onmessage = function(e) {
			publication_lists["lastlast_year_publications"] = e.data;
			loaded_flags["lastlast_year_publications"] = true;
			console.log("lastlast_year_publications loaded");

			// This should draw the facility network
			if (loaded_flags["this_year_publications"] && loaded_flags["last_year_publications"] && loaded_flags["lastlast_year_publications"]){
				draw_content_facility_network(publication_lists, cytoscape_years)
				loaded_flags["facility_network"] = true;
			}
		}

		// Start the bg workers
		worker_all_bg.postMessage(["https://publications.scilifelab.se/publications.json?full=false"]);
		worker_this_bg.postMessage(["https://publications.scilifelab.se/publications/"+current_year.toString()+".json"]);
		worker_last_bg.postMessage(["https://publications.scilifelab.se/publications/"+(current_year-1).toString()+".json"]);
		worker_lastlast_bg.postMessage(["https://publications.scilifelab.se/publications/"+(current_year-2).toString()+".json"]);

		$("#load_current_status").click(function(){
			// Hide all dashes
			$("#dashboards").children().hide();
			// Show this dashboard
			$("#current_status").show();
		});
		$("#load_latest_publications").click(function(){
			$("#dashboards").children().hide();
			$("#latest_publications").show();
		});
		$("#load_facility_network").click(function(){
			$("#dashboards").children().hide();
			$("#facility_network").show();
			
			// Always reload the network after click
			if (loaded_flags["facility_network"] === true){
				draw_content_facility_network(publication_lists, cytoscape_years)
			}
		});
		$("#load_publication_stats").click(function(){
			$("#dashboards").children().hide();
			$("#publication_stats").show();
		});
		$("#load_facility_output").click(function(){
			$("#dashboards").children().hide();
			$("#facility_output").show();
		});

		$("#load_current_status").click()
	});
});