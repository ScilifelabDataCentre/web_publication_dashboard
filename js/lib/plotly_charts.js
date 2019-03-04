facility_colour_map = {
	"Tissue Profiling": "#8dd3c7", // Affinity Proteomics
	"Fluorescence Tissue Profiling": "#8dd3c7", // Affinity Proteomics
	"Fluorescence Correlation Spectroscopy": "#ffffb3", // Bioimaging
	"Bioinformatics Compute and Storage": "#bebada", // Bioinformatics
	"Bioinformatics Long-term Support WABI": "#bebada", // Bioinformatics
	"Bioinformatics Support and Infrastructure": "#bebada", // Bioinformatics
	"Systems Biology": "#bebada", // Bioinformatics
	"Cryo-EM (SU)": "#fb8072", // Cellular and Molecular Imaging
	"Advanced Light Microscopy (ALM)": "#fb8072", // Cellular and Molecular Imaging
	"BioImage Informatics": "#fb8072", // Cellular and Molecular Imaging
	"Cell Profiling": "#fb8072", // Cellular and Molecular Imaging
	"Cryo-EM": "#fb8072", // Cellular and Molecular Imaging
	"Cryo-EM (UmU)": "#fb8072", // Cellular and Molecular Imaging
	"Protein Science Facility (PSF)": "#fb8072", // Cellular and Molecular Imaging
	"Swedish NMR Centre (SNC)": "#fb8072", // Cellular and Molecular Imaging
	"Chemical Biology Consortium Sweden (KI)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (UmU)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (CBCS)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Genome Engineering Zebrafish": "#80b1d3", // Chemical Biology and Genome Engineering
	"High-throughput Genome Engineering (HTGE)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Clinical Genomics Gothenburg": "#b3de69", // Diagnostics Development
	"Clinical Genomics Lund": "#b3de69", // Diagnostics Development
	"Clinical Genomics Stockholm": "#b3de69", // Diagnostics Development
	"Clinical Genomics Uppsala": "#b3de69", // Diagnostics Development
	"Drug Discovery and Development (DDD)": "#fdb462", // Drug Discovery and Development
	"Karolinska High Throughput Center (KHTC)": "#d9d9d9", // Functional Genomics
	"Ancient DNA": "#fccde5", // Genomics
	"NGI Stockholm": "#fccde5", // Genomics
	"NGI Stockholm (Genomics Applications)": "#fccde5", // Genomics
	"NGI Stockholm (Genomics Production)": "#fccde5", // Genomics
	"NGI Uppsala (SNP&SEQ Technology Platform)": "#fccde5", // Genomics
	"NGI Uppsala (Uppsala Genome Center)": "#fccde5", // Genomics
	"Eukaryotic Single Cell Genomics (ESCG)": "#fccde5", // Genomics
	"Microbial Single Cell Genomics": "#fccde5", // Genomics
	"Clinical Biomarkers": "#bc80bd", // Next-Generation Diagnostics
	"Mass Cytometry (KI)": "#ccebc5", // Proteomics and Metabolomics
	"Mass Cytometry (LiU)": "#ccebc5", // Proteomics and Metabolomics
	"Mass Cytometry": "#ccebc5", // Proteomics and Metabolomics
	"Single Cell Proteomics": "#ccebc5", // Proteomics and Metabolomics
	"Autoimmunity Profiling": "#ccebc5", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (MBB)": "#ccebc5", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (OncPat)": "#ccebc5", // Proteomics and Metabolomics
	"Chemical Proteomics & Proteogenomics": "#ccebc5", // Proteomics and Metabolomics
	"PLA Proteomics": "#ccebc5", // Proteomics and Metabolomics
	"Plasma Profiling": "#ccebc5", // Proteomics and Metabolomics
	"Swedish Metabolomics Centre (SMC)": "#ccebc5", // Proteomics and Metabolomics
	"Clinical Proteomics Mass spectrometry": "#ffed6f", // Regional facilities of national interest
	"Mass Spectrometry-based Proteomics, Uppsala": "#ffed6f", // Regional facilities of national interest
	"Array and Analysis Facility": "#ffed6f", // Regional facilities of national interest
	"Mutation Analysis Facility (MAF)": "#ffed6f", // Regional facilities of national interest
	"Bioinformatics and Expression Analysis (BEA)": "#ffed6f", // Regional facilities of national interest
	"BioMaterial Interactions (BioMat)": "#ffed6f", // Regional facilities of national interest
	"Advanced Mass Spectrometry Proteomics": "#ffed6f" // Regional facilities of national interest
}

function draw_label_pie(target_div, publications_json){
	// console.log(publications_json);
	var years = {};
	for (i=0; i<publications_json.length; i++){
		var year = publications_json[i]["published"].split('-')[0];
		if (years.hasOwnProperty(year)){
			years[year].push(publications_json[i]);
		} else {
			years[year] = [];
			years[year].push(publications_json[i]);
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

			// Using these labels because we want to remove some...
			var used_labels = Object.keys(labels);
			
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

			pmids.push(pmid);
			dois.push(doi);
			titles_for_word_cloud = titles_for_word_cloud + " " + title;
			var label_length = 0;
			for (var key in used_labels){
				//No idea why labels.length doesnt work...
				label_length += 1;
				if (label_count.hasOwnProperty(used_labels[key])){
					label_count[used_labels[key]] += 1;
				} else {
					label_count[used_labels[key]] = 1;
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

		var data = [{
			values:[], 
			labels:[],
			marker:{colors: [], line:{color:'rgb(100,100,100)', width:1}},
			type: "pie",
			textinfo: "value", 
			name: ""
		}];
		var layout = {
			// grid: {rows: 2, columns: 1, pattern: 'independent'},
			showlegend: false,
			// autosize: false,
			// width: 600,
			// height: 1000,
			margin: {
				l: 10,
				r: 10,
				b: 10,
				t: 100,
			},
			// yaxis2: {
			// 	title: "Publication count",
			// },
			// xaxis2: {
			// 	title: "Number of labels"
			// }
		}
		//console.log(label_count);
		for (var lab in label_count){
			console.log(label_count[lab]);
			data[0].values.push(label_count[lab]);
			data[0].labels.push(lab);
			data[0].marker.colors.push(facility_colour_map[lab]);
		}
		// //doing bar chart for labels
		// data.push({
		// 	x:[], 
		// 	y:[], 
		// 	type: "bar",
		// 	hoverinfo: "value+label",
		// 	xaxis: 'x2', //this sets it to 
		// 	yaxis: 'y2',  //seconnd chart area
		// 	name: ""
		// });
		// for (var lab_len in label_length_count){
		// 	data[1].x.push(lab_len);
		// 	data[1].y.push(label_length_count[lab_len]);
		// }

		$(target_div).append('<div id="pie'+year+'" style="display:none;" class="piechart"></div>');
		$('#button_holder').append('<button id="button'+year+'" class="year_button">'+year+'</button>');
		// console.log(year)

		Plotly.newPlot('pie'+year, data, layout, {displayModeBar: false});
	}

	// Hide all charts except 2019
	$("#charts").children().hide();
	$('#pie2019').show();

	/*
	jQuery events for pressing the buttons to switch chart
	*/
	$(".year_button").click(function(){
		var year = $(this).attr("id").substring(6);
		$("#charts").children().hide()
		$('#pie'+year).show();
	});
}