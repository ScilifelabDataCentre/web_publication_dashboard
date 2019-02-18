/*
requirejs code from https://requirejs.org/docs/api.html#jsfiles
*/
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
});

// Start the main app logic requiring jquery and spin
requirejs(['jquery', 'spin', 'helpers', 'cytoscape_network', 'plotly_charts'],
function   ($, spin, dash) {
	/*
	End of code from https://requirejs.org/docs/api.html#jsfiles

	The rest is dashboard specific and runs in this function 
	that requirejs has loaded the libs into
	*/

	// Options for the loading animation
	var opts = {
	  lines: 13, // The number of lines to draw
	  length: 42, // The length of each line
	  width: 17, // The line thickness
	  radius: 36, // The radius of the inner circle
	  scale: 1.95, // Scales overall size of the spinner
	  corners: 1, // Corner roundness (0..1)
	  color: '#ffffff', // CSS color or array of colors
	  fadeColor: 'transparent', // CSS color or array of colors
	  speed: 1.5, // Rounds per second
	  rotate: 30, // The rotation offset
	  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  className: 'spinner', // The CSS class to assign to the spinner
	  top: '50%', // Top position relative to parent
	  left: '50%', // Left position relative to parent
	  shadow: '0 0 1px transparent', // Box-shadow for the lines
	  position: 'absolute' // Element positioning
	};

	// Start the loading animation
	var target = document.getElementById('animation');
	var spinner = new Spinner().spin();
	target.appendChild(spinner.el);

	// Start the rest of the processing
	onReady(function () {
		// API call to publication.scilifelav.se
		var tmp = Get("https://publications.scilifelab.se/publications.json");
		// Parse json
		var json_all = JSON.parse(tmp);

		// Draw the pie charts
		draw_label_pie("#all_charts", json_all, "Publication labels")

		// Draw the cytoscape network
		draw_cyto("cyto", json_all);

		// Hide all charts except 2019
		$("#all_charts").children().hide()
		$('#pie2019').show();

		/*
		jQuery events for pressing the buttons to switch chart
		*/
		$(".year_button").click(function(){
			console.log($(this).attr("id").substring(6));
			var year = $(this).attr("id").substring(6);
			$("#all_charts").children().hide()
			$('#pie'+year).show();
		})

		// Turn off loading animation
	    show('animation', false);
	});
});