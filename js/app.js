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

		// Workers
		let worker_plotly = new Worker('js/lib/fetch.js');
		let worker_cyto = new Worker('js/lib/fetch.js');
		
		// Worker return function for plotly
		worker_plotly.onmessage = function(e) {
			var worker_plotly_result = e.data;
			// console.log(worker_result);
			// console.log('Message received from worker');

			// Draw the pie charts
			 draw_label_pie("#all_charts", worker_plotly_result, "Publication labels");

			// Hide all charts except 2019
			$("#all_charts").children().hide()
			$('#pie2019').show();

			/*
			jQuery events for pressing the buttons to switch chart
			*/
			$(".year_button").click(function(){
				// console.log($(this).attr("id").substring(6));
				var year = $(this).attr("id").substring(6);
				$("#all_charts").children().hide()
				$('#pie'+year).show();
			})
			// Turn off loading animation
			show('spinner_plotly', false);
		}

		// Worker return function for cytoscape
		worker_cyto.onmessage = function(e) {
			var worker_cyto_result = e.data;
			// Draw the cytoscape network
			draw_cyto("cyto", worker_cyto_result);
			// Turn off loading animation
			show('spinner_cyto', false);
		}

		$("#loadplotly").click(function(){
			show('spinner_plotly', true);
			worker_plotly.postMessage(["https://publications.scilifelab.se/publications.json"]);
		});
		
		$("#loadcyto").click(function(){
			show('spinner_cyto', true);
			console.log("CYTOCLICK")
			worker_cyto.postMessage(["https://publications.scilifelab.se/publications/2017.json",
				"https://publications.scilifelab.se/publications/2018.json",
				"https://publications.scilifelab.se/publications/2019.json"]);
		});


	});
});