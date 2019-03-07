facility_colour_map = {
	"Tissue Profiling": "#8dd3c7", // Affinity Proteomics
	"Fluorescence Tissue Profiling": "#8dd3c7", // Affinity Proteomics
	"Fluorescence Correlation Spectroscopy": "#ffffb3", // Bioimaging
	// "Bioinformatics Compute and Storage": "#bebada", // Bioinformatics
	"Bioinformatics Long-term Support WABI": "#bebada", // Bioinformatics
	"Bioinformatics Support and Infrastructure": "#9e9aBa", // Bioinformatics
	"Systems Biology": "#7e7a9a", // Bioinformatics
	"Cryo-EM (SU)": "#8b1002", // Cellular and Molecular Imaging
	"Advanced Light Microscopy (ALM)": "#9b2012", // Cellular and Molecular Imaging
	"BioImage Informatics": "#Ab3022", // Cellular and Molecular Imaging
	"Cell Profiling": "#Bb4032", // Cellular and Molecular Imaging
	"Cryo-EM": "#Cb5042", // Cellular and Molecular Imaging
	"Cryo-EM (UmU)": "#Eb7062", // Cellular and Molecular Imaging
	"Protein Science Facility (PSF)": "#Db6052", // Cellular and Molecular Imaging
	"Swedish NMR Centre (SNC)": "#fb8072", // Cellular and Molecular Imaging
	"Chemical Biology Consortium Sweden (KI)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (UmU)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (CBCS)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Genome Engineering Zebrafish": "#80b1d3", // Chemical Biology and Genome Engineering
	"High-throughput Genome Engineering (HTGE)": "#80b1d3", // Chemical Biology and Genome Engineering
	"Clinical Genomics Gothenburg": "#D3Fe89", // Diagnostics Development
	"Clinical Genomics Lund": "#b3de69", // Diagnostics Development
	"Clinical Genomics Stockholm": "#93Be49", // Diagnostics Development
	"Clinical Genomics Uppsala": "#739e29", // Diagnostics Development
	"Drug Discovery and Development (DDD)": "#fdb462", // Drug Discovery and Development
	"Karolinska High Throughput Center (KHTC)": "#d9d9d9", // Functional Genomics
	"Ancient DNA": "#EcBdD5", // Genomics
	"NGI Stockholm": "#fccde5", // Genomics
	// "NGI Stockholm (Genomics Applications)": "#fccde5", // Genomics
	// "NGI Stockholm (Genomics Production)": "#fccde5", // Genomics
	"NGI Uppsala (SNP&SEQ Technology Platform)": "#DcAdC5", // Genomics
	"NGI Uppsala (Uppsala Genome Center)": "#Ac7d95", // Genomics
	"Eukaryotic Single Cell Genomics (ESCG)": "#Bc8dA5", // Genomics
	"Microbial Single Cell Genomics": "#Cc9dB5", // Genomics
	"Clinical Biomarkers": "#bc80bd", // Next-Generation Diagnostics
	"Mass Cytometry (KI)": "#DcFbD5", // Proteomics and Metabolomics
	"Mass Cytometry (LiU)": "#ccebc5", // Proteomics and Metabolomics
	"Mass Cytometry": "#BcDbB5", // Proteomics and Metabolomics
	"Single Cell Proteomics": "#AcCbA5", // Proteomics and Metabolomics
	"Autoimmunity Profiling": "#9cBb95", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (MBB)": "#8cAb85", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (OncPat)": "#7c9b75", // Proteomics and Metabolomics
	"Chemical Proteomics & Proteogenomics": "#6c8bc65", // Proteomics and Metabolomics
	"PLA Proteomics": "#5c7b55", // Proteomics and Metabolomics
	"Plasma Profiling": "#4c6b55", // Proteomics and Metabolomics
	"Swedish Metabolomics Centre (SMC)": "#3c5b35", // Proteomics and Metabolomics
	"Clinical Proteomics Mass spectrometry": "#ffed6f", // Regional facilities of national interest
	"Mass Spectrometry-based Proteomics, Uppsala": "#EfDd5f", // Regional facilities of national interest
	"Array and Analysis Facility": "#DfCd4f", // Regional facilities of national interest
	"Mutation Analysis Facility (MAF)": "#CfBd4f", // Regional facilities of national interest
	"Bioinformatics and Expression Analysis (BEA)": "#BfAd3f", // Regional facilities of national interest
	"BioMaterial Interactions (BioMat)": "#Af9d2f", // Regional facilities of national interest
	"Advanced Mass Spectrometry Proteomics": "#9f8d1f" // Regional facilities of national interest
}

function draw_label_pie(target_div, publications_json){
	// console.log(publications_json);
	var years = {"all-time": []};

	for (i=0; i<publications_json.length; i++){
		var year = publications_json[i]["published"].split('-')[0];
		if (years.hasOwnProperty(year)){
			years[year].push(publications_json[i]);
		} else {
			years[year] = [];
			years[year].push(publications_json[i]);
		}
		years["all-time"].push(publications_json[i])
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