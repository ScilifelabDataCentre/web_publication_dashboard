function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

function draw_wordcloud(pubmed_xml_raw){
	
	var xml_parser = new DOMParser();
	var articles_xml = [];

	for (batch in pubmed_xml_raw){
		// console.log(pubmed_xml_raw[batch]);
		var pm_xml = xml_parser.parseFromString(pubmed_xml_raw[batch], "text/xml");
		
		for (var i=0; i<pm_xml.getElementsByTagName("PubmedArticle").length; i++){
			articles_xml.push(pm_xml.getElementsByTagName("PubmedArticle")[i]);
		}
	}

	var keyword_dict = {};

	for (var i=0; i<articles_xml.length; i++){
		var pub_xml = articles_xml[i];
		var keywords = pub_xml.getElementsByTagName("Keyword");
		for (var j=0; j<keywords.length; j++){
			var keyword = keywords[j].childNodes[0].nodeValue.toUpperCase();
			if (keyword_dict.hasOwnProperty(keyword)){
				keyword_dict[keyword] += 1;
			} else {
				keyword_dict[keyword] = 1;
			}
		}
	}

	// Create keyword array instead of dict
	var raw_word_list = Object.keys(keyword_dict).map(function(key) {
		return [key, keyword_dict[key]];
	});
	// Sort the array based on the second element
	raw_word_list.sort(function(first, second) {
		return second[1] - first[1];
	});
	// console.log(raw_word_list);

	var max_keyword_count = raw_word_list[0][1];

	var normalize = 8.5/max_keyword_count;


	for (var i=0; i<raw_word_list.length; i++) {
		raw_word_list[i][1] = raw_word_list[i][1]*normalize;
		if (raw_word_list[i][0].length > 20){
			raw_word_list[i][1] = raw_word_list[i][1] * 20/raw_word_list[i][0].length;
			//console.log(raw_word_list[i][0]);
		}
	}

	var curated_word_list = [];
	var max_total_value = 400;
	var current_value = 0;
	
	for (var i=0; i<raw_word_list.length; i++) {
		if (current_value < max_total_value) {	
			curated_word_list.push(raw_word_list[i]);
			current_value = current_value + raw_word_list[i][1];
			// console.log(current_value);
		}
		else {
			break;
		}
	}

	// console.log(curated_word_list);

	var cloud_opts = {
		list: curated_word_list,
		gridSize: 5,
		weightFactor: function (size) {
			return Math.pow(size, 1.8);
		},
		fontFamily: 'Arial Unicode MS',
		color: function() {
			return (["#8dd3c7", "#AfAf73", "#bebada", 
				"#fb8072", "#80b1d3", "#fdb462", 
				"#b3de69", "#d9d9d9", "#fccde5", 
				"#bc80bd", "#ccebc5", "#ffed6f"
			])[Math.floor(Math.random() * 12)]
		},
		// color: 'random-light',
		rotateRatio: 0.5,
		rotationSteps: 6,
		backgroundColor: '#FFFFFF',
		drawOutOfBound: true
	};
	// console.log(word_list);


	// The following masks the canvas in the shape of the image we loaded in app.js
	cloud_opts.clearCanvas = false;
	var $canvas = $('#fake_canvas');
	/* Determine bgPixel by creating
	another canvas and fill the specified background color. */
	var bctx = document.createElement('canvas').getContext('2d');

	bctx.fillStyle = cloud_opts.backgroundColor || '#fff';
	bctx.fillRect(0, 0, 1, 1);
	var bgPixel = bctx.getImageData(0, 0, 1, 1).data;

	var maskCanvasScaled = document.createElement('canvas');
	maskCanvasScaled.width = $canvas[0].width;
	maskCanvasScaled.height = $canvas[0].height;
	var ctx = maskCanvasScaled.getContext('2d');

	ctx.drawImage(maskCanvas,
	0, 0, maskCanvas.width, maskCanvas.height,
	0, 0, maskCanvasScaled.width, maskCanvasScaled.height);

	var imageData = ctx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
	var newImageData = ctx.createImageData(imageData);
	for (var i = 0; i < imageData.data.length; i += 4) {
		if (imageData.data[i + 3] > 128) {
			newImageData.data[i] = bgPixel[0];
			newImageData.data[i + 1] = bgPixel[1];
			newImageData.data[i + 2] = bgPixel[2];
			newImageData.data[i + 3] = bgPixel[3];
		} else {
		// This color must not be the same w/ the bgPixel.
			newImageData.data[i] = bgPixel[0];
			newImageData.data[i + 1] = bgPixel[1];
			newImageData.data[i + 2] = bgPixel[2];
			newImageData.data[i + 3] = bgPixel[3] ? (bgPixel[3] - 1) : 0;
		}
	}
	ctx.putImageData(newImageData, 0, 0);
	ctx = $canvas[0].getContext('2d');
	ctx.drawImage(maskCanvasScaled, 0, 0);
	// maskCanvasScaled = ctx = imageData = newImageData = bctx = bgPixel = undefined;

	WordCloud([document.getElementById('fake_canvas'), document.getElementById('publication_stats_wordcloud')], cloud_opts );
}