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