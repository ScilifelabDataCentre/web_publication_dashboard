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
// Start the main app logic requiring jquery and spin
requirejs(['jquery', 'spin', 'helpers', 'cytoscape_network', 'plotly_charts'],
function($, spin, helpers, cytoscape_network, plotly_charts){
	/*
	End of code from https://requirejs.org/docs/api.html#jsfiles

	The rest is dashboard specific and runs in this function 
	that requirejs has loaded the libs into
	*/

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
		animation: 'spinner-line-fade-default',
		rotate: 0,
		direction: 1,
		speed: 1,
		zIndex: 2e9,
		className: 'spinner',
		top: '50%',
		left: '50%',
		shadow: '0 0 1px transparent',
		position: 'absolute',
	};

	// Start the loading animation
	var target_cyto = document.getElementById('spinner_cyto');
	var spinner_cyto = new Spinner(opts).spin();
	target_cyto.appendChild(spinner_cyto.el);

	// Start the loading animation
	var target_plotly = document.getElementById('spinner_plotly');
	var spinner_plotly = new Spinner(opts).spin();
	target_plotly.appendChild(spinner_plotly.el);


	// Start the rest of the processing
	onReady(function () {
		// API calls to publication.scilifelab.se

		// Loaded flags
		var loaded_cyto = false;
		var loaded_plotly = false;
		var loaded_wordcloud = false;

		var all_publications = null;
		var recent_publications = null;

		// Workers
		let worker_plotly = new Worker('js/lib/fetch.js');
		let worker_cyto = new Worker('js/lib/fetch.js');
		
		// Worker return function for plotly
		worker_plotly.onmessage = function(e) {
			all_publications = e.data;
			// console.log(worker_result);
			// console.log('Message received from worker');

			// Draw the pie charts
			 draw_label_pie("#charts", all_publications, "Publication labels");

			// Hide all charts except 2019
			$("#charts").children().hide();
			$('#pie2019').show();

			/*
			jQuery events for pressing the buttons to switch chart
			*/
			$(".year_button").click(function(){
				// console.log($(this).attr("id").substring(6));
				var year = $(this).attr("id").substring(6);
				$("#charts").children().hide()
				$('#pie'+year).show();
			})

			loaded_plotly = true;

			// Turn off loading animation
			show('spinner_plotly', false);
		}

		// Worker return function for cytoscape
		worker_cyto.onmessage = function(e) {
			recent_publications = e.data;
			// Draw the cytoscape network	

			show('cytoscape_network', true);
			
			draw_cyto("cytoscape_network", recent_publications);
			
			loaded_cyto = true;

			// Turn off loading animation
			show('spinner_cyto', false);
		}

		$("#load_facility_output").click(function(){
			$("#dashboards").children().hide();
			$("#facility_output").show();
			if (loaded_plotly === false) {
				loaded_plotly = true;
				show('spinner_plotly', true);
				worker_plotly.postMessage(["https://publications.scilifelab.se/publications.json"]);

			}
		});
		
		$("#load_facility_network").click(function(){
			$("#dashboards").children().hide();
			$("#facility_network").show();
			$("#cytoscape_network").show();
			if (loaded_cyto === false){
				loaded_cyto = true;
				show('spinner_cyto', true);
				worker_cyto.postMessage(["https://publications.scilifelab.se/publications/2017.json",
					"https://publications.scilifelab.se/publications/2018.json",
					"https://publications.scilifelab.se/publications/2019.json"]);
			}
		});
		$("#load_current_status").click(function(){
			$("#dashboards").children().hide();
			$("#current_status").show();

		});
		$("#load_publication_stats").click(function(){
			$("#dashboards").children().hide();
			$("#publication_stats").show();
		});
	});
});