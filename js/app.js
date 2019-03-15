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
function mask_canvas(){
	var img = new Image();
	img.src = "./assets/rectangle_soft.png";

	img.onload = function readPixels() {
		maskCanvas = document.getElementById('fake_canvas');
		maskCanvas.width = img.width;
		maskCanvas.height = img.height;

		var ctx = maskCanvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);

		var imageData = ctx.getImageData(
		0, 0, maskCanvas.width, maskCanvas.height);
		var newImageData = ctx.createImageData(imageData);

		for (var i = 0; i < imageData.data.length; i += 4) {
			var tone = imageData.data[i] +
			imageData.data[i + 1] +
			imageData.data[i + 2];
			var alpha = imageData.data[i + 3];

			if (alpha < 128 || tone > 128 * 3) {
				// Area not to draw
				newImageData.data[i] =
				newImageData.data[i + 1] =
				newImageData.data[i + 2] = 255;
				newImageData.data[i + 3] = 0;
			} else {
				// Area to draw
				newImageData.data[i] =
				newImageData.data[i + 1] =
				newImageData.data[i + 2] = 0;
				newImageData.data[i + 3] = 255;
			}
		}
		ctx.putImageData(newImageData, 0, 0);
	}
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
		animation: 'spinner-line-fade-default',
		rotate: 0,
		direction: 1,
		speed: 1,
		zIndex: 2e9,
		className: 'spinner',
		top: '500px',
		left: '50%',
		shadow: '0 0 1px transparent',
		position: 'absolute',
	};

	// Start the loading animations
	var target_current_status = document.getElementById('spinner_current_status');
	var spinner_current_status = new Spinner(opts).spin();
	target_current_status.appendChild(spinner_current_status.el);

	var target_facility_network = document.getElementById('spinner_facility_network');
	var spinner_facility_network = new Spinner(opts).spin();
	target_facility_network.appendChild(spinner_facility_network.el);

	var target_publication_stats = document.getElementById('spinner_publication_stats');
	var spinner_publication_stats = new Spinner(opts).spin();
	target_publication_stats.appendChild(spinner_publication_stats.el);

	var target_facility_output = document.getElementById('spinner_facility_output');
	var spinner_facility_output = new Spinner(opts).spin();
	target_facility_output.appendChild(spinner_facility_output.el);

	// Starts the masking of the word cloud canvas
	mask_canvas();

	// Start the rest of the processing
	onReady(function () {

		// Loaded flags
		var loaded_bg = false;
		var loaded_current_status = false;
		var loaded_facility_network = false;
		var loaded_publication_stats = false;
		var loaded_facility_output = false;
		// LoadING flags
		var loading_bg = false;
		var loading_current_status = false;
		var loading_facility_network = false;
		var loading_publication_stats = false;
		var loading_facility_output = false;
		// Publication lists
		var current_year_publications = null;
		var recent_publications = null;
		var all_publications = null;
		var all_publications_pubmed_xml = null;

		// Workers
		// Starts to download everything in the background when page loads
		let worker_bg = new Worker('js/lib/fetch.js');
		worker_bg.onmessage = function(e) {
			all_publications = e.data;
			loading_bg = false;
			loaded_bg = true;
		}
		// Send message to worker_bg immediately
		loading_bg = true;
		worker_bg.postMessage(["https://publications.scilifelab.se/publications.json?full=false"]);

		// Workers
		// Starts to download this years data when page loads
		let worker_current_status = new Worker('js/lib/fetch.js');
		worker_current_status.onmessage = function(e) {
			// Save publication list
			current_year_publications = e.data;

			// Draw table
			conjure_table(current_year_publications, 2019);

			// Turn off loading animation
			loading_current_status = false;
			loaded_current_status = true;
			show('spinner_current_status', false);
		}
		// Send message to worker_current_status immediately
		loading_current_status = true;
		worker_current_status.postMessage(["https://publications.scilifelab.se/publications/2019.json?full=false"]);

		// Gets recent publications and draws cytoscape network
		let worker_facility_network = new Worker('js/lib/fetch.js');
		worker_facility_network.onmessage = function(e) {
			// Save publication list
			recent_publications = e.data;

			// Draw the cytoscape network
			show('cytoscape_network', true);
			draw_cyto("cytoscape_network", recent_publications);

			// Turn off loading animation
			loading_facility_network = false;
			loaded_facility_network = true;
			show('spinner_facility_network', false);
		}		

		// Fetches from publications db and pubmed
		let worker_publication_stats = new Worker('js/lib/fetch_pubmed.js');
		worker_publication_stats.onmessage = function(e) {
			// This worker sends several messages with information on how much is loaded
			// e.data[0] === true means it is done loading
			if (e.data[0] === true){
				// Save keyword xml
				all_publications_pubmed_xml = e.data[1];

				// Draw the wordcloud
				draw_wordcloud(all_publications_pubmed_xml);

				// Turn off loading animation
				loading_publication_stats = false;
				loaded_publication_stats = true;
				show('spinner_publication_stats', false);				
			}
			else {
				// Going to catch the network errors that may crop up
				if (e.data[1] === "network_error"){
					document.getElementById("loading_text_pubications_stats").innerHTML = "EFETCH<br/>NETWORK<br/>ERROR";
					loading_publication_stats = false;
					loaded_publication_stats = false;
				}
				else {
					// Not done loading yet, update the loading text
					loading_level = e.data[1];
					document.getElementById("loading_text_pubications_stats").innerHTML = "LOADING . . . <br/> "+loading_level+" %";
				}
			}
		}

		// Gets all publications and draws plotly charts for the facility output tab
		let worker_facility_output = new Worker('js/lib/fetch.js');
		worker_facility_output.onmessage = function(e) {
			// Save publication list
			all_publications = e.data;

			// Draw the pie charts
			draw_label_pie("#charts", all_publications, "Publication labels");

			// Turn off loading animation
			loading_facility_output = false;
			loaded_facility_output = true;
			show('spinner_facility_output', false);
		}

		$("#load_current_status").click(function(){
			// Hide all dashes
			$("#dashboards").children().hide();
			// Show this dashboard
			$("#current_status").show();

			if (loaded_current_status === false) {
				// Show loading animation
				show('spinner_current_status', true);
				
				if (loading_current_status === true) {
					// Dont do anything at the moment, just waiting
				}
				else {
					loading_current_status = true;
					show('spinner_current_status', true);
					worker_current_status.postMessage(["https://publications.scilifelab.se/publications/2019.json?full=false"]);
				}
			}
		});
		
		$("#load_facility_network").click(function(){
			// Hide all dashes
			$("#dashboards").children().hide();
			// Show this dashboard
			$("#facility_network").show();

			if (loaded_facility_network === false){
				// Show loading animation
				show('cytoscape_network', false);
				show('spinner_facility_network', true);

				if (loading_facility_network === true){
					// Dont do anything at the moment, just waiting
				}
				else {
					loading_facility_network = true;
					worker_facility_network.postMessage(["https://publications.scilifelab.se/publications/2017.json?full=false",
						"https://publications.scilifelab.se/publications/2018.json?full=false",
						"https://publications.scilifelab.se/publications/2019.json?full=false"]);
				}
			}
			else {
				/*
				Redraw the entire network every time you change to the tab, 
				to mitigate the issue with zoom-locked networks. 
				It does not take noticeable time, however, the network looks different each time.
				*/
				draw_cyto("cytoscape_network", recent_publications);
			}
		});

		$("#load_publication_stats").click(function(){
			$("#dashboards").children().hide();
			$("#publication_stats").show();

			if (loaded_publication_stats === false) {
				// Show loading animation
				show('spinner_publication_stats', true);

				if (loading_publication_stats === true) {
					// Dont do anything at the moment, just waiting
				}
				else{
					document.getElementById("loading_text_pubications_stats").innerHTML = "LOADING . . . <br/> 0 %";
					loading_publication_stats = true;
					if (loaded_bg === true){
						// Just load the pubmed data if publications are already loaded
						worker_publication_stats.postMessage(all_publications);
					}
					else {
						// If bg is not loaded, load everything
						worker_publication_stats.postMessage(["https://publications.scilifelab.se/publications.json?full=false"]);	
					}
				}
			}
		});

		$("#load_facility_output").click(function(){
			$("#dashboards").children().hide();
			$("#facility_output").show();

			if (loaded_facility_output === false) {
				// Show loading animation
				show('spinner_facility_output', true);

				if (loading_facility_output === true) {
					// Dont do anything at the moment, just waiting
				}
				else {
					loading_facility_output = true;
					if (loaded_bg === true) {
						// Draw the pie charts if publications are loaded already
				 		draw_label_pie("#charts", all_publications);

				 		// Turn off the loading animation
				 		loaded_facility_output = true;
						show('spinner_facility_output', false);
					}
					else {
						worker_facility_output.postMessage(["https://publications.scilifelab.se/publications.json?full=false"]);
					}
				}
			}
		});

		$("#load_current_status").click()
	});
});