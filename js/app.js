// Start the main app logic requiring jquery, spin, and my own stuff
// requirejs code from https://requirejs.org/docs/api.html#jsfiles
// spin.js from https://spin.js.org

requirejs([ 'jquery', 'require_trick', 'spin', 'helpers', 'cytoscape_network', 'facility_output', 'current_status', 'latest_publications'],
function($, requirejs, spin, helpers, cytoscape_network, facility_output, current_status, latest_publications){
	// The rest is dashboard specific and runs in this function 
	// that requirejs has loaded the libs into

	// menu bar button click functions to handle colouring them
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
		// Build a worker from an anonymous function body
		// This URL.createObjectURL Blob is a workaround for the fact that this setup needs all js in a single file
		// Normally workers would be specified in separate js files, instead they are here in the Blob
		var fetch_worker_function_url = URL.createObjectURL( new Blob(['(',
		function(){
			onmessage = function(e) {
				function Get(yourUrl){
					var Httpreq = new XMLHttpRequest(); // a new request
					Httpreq.open("GET",yourUrl,false);
					Httpreq.send(null);
					return Httpreq.responseText;          
				}
				// console.log('Message received from main script');
				var publications = [];
				// console.log(e.data);
				for (var url in e.data){
					console.log(e.data[url]);
					publications.push.apply(publications, JSON.parse(Get(e.data[url]))["publications"]);
				}
				// console.log('Posting message back to main script');
				postMessage(publications);
			}
		}.toString(),')()' ], { type: 'application/javascript' } ) );

		var worker_all_bg = new Worker(fetch_worker_function_url);
		worker_all_bg.onmessage = function(e) {
			publication_lists["all_publications"] = e.data;
			loaded_flags["all_publications"] = true;
			console.log("all_publications loaded");

	 		draw_label_pie("#charts", publication_lists["all_publications"]);
			show('spinner_facility_output', false);
	 		loaded_flags["facility_output"] = true;
		}
		var worker_this_bg = new Worker(fetch_worker_function_url);
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
		var worker_last_bg = new Worker(fetch_worker_function_url);
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
		var worker_lastlast_bg = new Worker(fetch_worker_function_url);
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

		// Won't be needing this anymore
		URL.revokeObjectURL(fetch_worker_function_url);

		// Start the bg workers
		worker_all_bg.postMessage(["https://publications.scilifelab.se/publications.json?full=false"]);
		worker_this_bg.postMessage(["https://publications.scilifelab.se/publications/"+current_year.toString()+".json"]);
		worker_last_bg.postMessage(["https://publications.scilifelab.se/publications/"+(current_year-1).toString()+".json"]);
		worker_lastlast_bg.postMessage(["https://publications.scilifelab.se/publications/"+(current_year-2).toString()+".json"]);

		// Click functions for all menu bar items
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
			// There is a bug with how the network is displayed if hidden and shown again
			// This is a workaround for that bug, but it does change the layout every time since it is random
			if (loaded_flags["facility_network"] === true){
				draw_content_facility_network(publication_lists, cytoscape_years)
			}
		});
		$("#load_word_cloud").click(function(){
			$("#dashboards").children().hide();
			$("#word_cloud").show();
		});
		$("#load_facility_output").click(function(){
			$("#dashboards").children().hide();
			$("#facility_output").show();
		});

		$("#load_current_status").click()
	});
});