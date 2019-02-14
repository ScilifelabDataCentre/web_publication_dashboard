/*
requirejs code from https://requirejs.org/docs/api.html#jsfiles
*/
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
});

// Start the main app logic requiring jquery and spin
requirejs(['jquery', 'spin', 'dash'],
function   ($, spin, dash) {
	/*
	End of code from https://requirejs.org/docs/api.html#jsfiles

	The rest is dashboard specific and runs in this function 
	that requirejs has loaded the libs into
	*/



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

	var target = document.getElementById('animation');

	var spinner = new Spinner().spin();
	target.appendChild(spinner.el);

	onReady(function () {
		var d = new Date();
		console.log(d.getTime());
		var tmp = Get("https://publications.scilifelab.se/publications/2018.json");
		console.log(d.getTime());
		var json_all = JSON.parse(tmp);
		var d = new Date();
		console.log(d.getTime());
		draw_label_pie("#all_charts", json_all, "Publication labels")
		var d = new Date();
		console.log(d.getTime());

		//var labels_json = JSON.parse(Get("https://publications.scilifelab.se/labels.json"));
		draw_cyto("cyto", json_all);

		$("#all_charts").children().hide()
		$('#pie2018').show();
		/*
		jQuery events for pressing the buttons to switch chart
		*/
		$('#button2010').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2010').show();
		});
		$('#button2011').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2011').show();
		});
		$('#button2012').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2012').show();
		});
		$('#button2013').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2013').show();
		});
		$('#button2014').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2014').show();
		});
		$('#button2015').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2015').show();
		});
		$('#button2016').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2016').show();
		});
		$('#button2017').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2017').show();
		});
		$('#button2018').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2018').show();
		});
		$('#button2019').on('click',function(){
			$("#all_charts").children().hide()
			$('#pie2019').show();
		});
	    show('animation', false);
	});
});