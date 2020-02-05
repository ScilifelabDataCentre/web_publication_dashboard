facility_colour_map = {
	"Tissue Profiling": "#8dd3c7AA", // Affinity Proteomics
	"Fluorescence Tissue Profiling": "#8dd3c7AA", // Affinity Proteomics
	"Fluorescence Correlation Spectroscopy": "#ffffb3AA", // Bioimaging
	"Bioinformatics Compute and Storage": "#bebadaAA", // Bioinformatics
	"Bioinformatics Long-term Support WABI": "#bebadaAA", // Bioinformatics
	"Bioinformatics Support and Infrastructure": "#9e9aBaAA", // Bioinformatics
	"Systems Biology": "#7e7a9aAA", // Bioinformatics
	"Cryo-EM (SU)": "#8b1002AA", // Cellular and Molecular Imaging
	"Advanced Light Microscopy (ALM)": "#9b2012AA", // Cellular and Molecular Imaging
	"BioImage Informatics": "#Ab3022AA", // Cellular and Molecular Imaging
	"Cell Profiling": "#Bb4032AA", // Cellular and Molecular Imaging
	"Cryo-EM": "#Cb5042AA", // Cellular and Molecular Imaging
	"Cryo-EM (UmU)": "#Eb7062AA", // Cellular and Molecular Imaging
	"Protein Science Facility (PSF)": "#Db6052AA", // Cellular and Molecular Imaging
	"Swedish NMR Centre (SNC)": "#fb8072AA", // Cellular and Molecular Imaging
	"Chemical Biology Consortium Sweden (KI)": "#80b1d3AA", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (UmU)": "#80b1d3AA", // Chemical Biology and Genome Engineering
	"Chemical Biology Consortium Sweden (CBCS)": "#80b1d3AA", // Chemical Biology and Genome Engineering
	"Genome Engineering Zebrafish": "#80b1d3AA", // Chemical Biology and Genome Engineering
	"High-throughput Genome Engineering (HTGE)": "#80b1d3AA", // Chemical Biology and Genome Engineering
	"Clinical Genomics Gothenburg": "#D3Fe89AA", // Diagnostics Development
	"Clinical Genomics Lund": "#b3de69AA", // Diagnostics Development
	"Clinical Genomics Stockholm": "#93Be49AA", // Diagnostics Development
	"Clinical Genomics Uppsala": "#739e29AA", // Diagnostics Development
	"Drug Discovery and Development (DDD)": "#fdb462AA", // Drug Discovery and Development
	"Karolinska High Throughput Center (KHTC)": "#d9d9d9AA", // Functional Genomics
	"Ancient DNA": "#EcBdD5AA", // Genomics
	"NGI Stockholm": "#fccde5AA", // Genomics
	"NGI Stockholm (Genomics Applications)": "#fccde5AA", // Genomics
	"NGI Stockholm (Genomics Production)": "#fccde5AA", // Genomics
	"NGI Uppsala (SNP&SEQ Technology Platform)": "#DcAdC5AA", // Genomics
	"NGI Uppsala (Uppsala Genome Center)": "#Ac7d95AA", // Genomics
	"Eukaryotic Single Cell Genomics (ESCG)": "#Bc8dA5AA", // Genomics
	"Microbial Single Cell Genomics": "#Cc9dB5AA", // Genomics
	"Clinical Biomarkers": "#bc80bdAA", // Next-Generation Diagnostics
	"Mass Cytometry (KI)": "#DcFbD5AA", // Proteomics and Metabolomics
	"Mass Cytometry (LiU)": "#ccebc5AA", // Proteomics and Metabolomics
	"Mass Cytometry": "#BcDbB5AA", // Proteomics and Metabolomics
	"Single Cell Proteomics": "#AcCbA5AA", // Proteomics and Metabolomics
	"Autoimmunity Profiling": "#9cBb95AA", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (MBB)": "#8cAb85AA", // Proteomics and Metabolomics
	"Chemical Proteomics and Proteogenomics (OncPat)": "#7c9b75AA", // Proteomics and Metabolomics
	"Chemical Proteomics & Proteogenomics": "#6c8b65AA", // Proteomics and Metabolomics
	"PLA Proteomics": "#5c7b55AA", // Proteomics and Metabolomics
	"Plasma Profiling": "#4c6b55AA", // Proteomics and Metabolomics
	"Swedish Metabolomics Centre (SMC)": "#3c5b35AA", // Proteomics and Metabolomics
	"Clinical Proteomics Mass spectrometry": "#ffed6fAA", // Regional facilities of national interest
	"Mass Spectrometry-based Proteomics, Uppsala": "#EfDd5fAA", // Regional facilities of national interest
	"Array and Analysis Facility": "#DfCd4fAA", // Regional facilities of national interest
	"Mutation Analysis Facility (MAF)": "#CfBd4fAA", // Regional facilities of national interest
	"Bioinformatics and Expression Analysis (BEA)": "#BfAd3fAA", // Regional facilities of national interest
	"BioMaterial Interactions (BioMat)": "#Af9d2fAA", // Regional facilities of national interest
	"Advanced Mass Spectrometry Proteomics": "#9f8d1fAA", // Regional facilities of national interest
	// Temporary updates
	"National Genomics Infrastructure": "#fbcde5AA", // Genomics
	"Glycoproteomics": "#BbDbB5AA",
	"Chemical Proteomics": "#8cAb85AA",
	"Bioinformatics Support, Infrastructure and Training": "#9e9aBaAA", // Bioinformatics
	"National Resource for Mass Spectrometry Imaging": "#Ab3022AA",
	"Targeted and Structural Proteomics": "#DcFbD5AA",
	"In Situ Sequencing (ISS)": "#fbcde5AA", // Genomics
	"Proteogenomics": "#80b1d3AA",
	"Centre for Cellular Imaging": "#Ab3022AA",
	"PLA and Single Cell Proteomics": "#8cAb85AA",
	"AIDA Data Hub": "#9e9aBaAA",
	"Advanced FISH Technologies": "#Ab3022AA",
	"Gothenburg Imaging Mass Spectrometry": "#Ab3022AA",
};

function draw_label_pie(target_div, publications_json){
	// Creating the datastructure for years
	// Including one set with all publications called All-time
	var years = {"All-time": []};

	for (i=0; i<publications_json.length; i++){
		var year = publications_json[i]["published"].split('-')[0];

		// Push the publication to the correct list
		if (years.hasOwnProperty(year)){
			years[year].push(publications_json[i]);
		} else {
			years[year] = [];
			years[year].push(publications_json[i]);
		}
		// Push all publications to this list
		years["All-time"].push(publications_json[i])
	}

	for (var year in years){
		var dois = [];
		var pmids = [];
		var label_count = {};
		var label_length_count = {};

		// Goes through all the publications in the year
		for (i=0; i<years[year].length; i++){
			var doi = years[year][i]["doi"];
			var title = years[year][i]["title"];
			var labels = years[year][i]["labels"];
			var pmid = years[year][i]["pmid"];

			// Using these labels because we want to remove some...
			var used_labels = Object.keys(labels);
			
			// Cleaning up the labels with these rules
			// Remove the two NGI Stockholm () ones and add a single NGI Stockholm
			// Remove Bioinformatics Compute and Storage
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

			// After labels have been cleaned up, add them to the counts
			var label_length = 0;
			for (var key in used_labels){
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

		// Plot defaults
		var data = [{
			values:[], 
			labels:[],
			marker:{colors: [], line:{color:'rgb(000,000,000)', width:1}},
			type: "pie",
			textinfo: "value", 
			name: "",
			insidetextfont: {
				family: "Roboto",
				size: 20,
				color: "#000000"
			},
			outsidetextfont: {
				size: 16
			},
			hovertemplate: "%{label}<br />Number of publications: %{value}<br />%{percent}",
			hoverlabel: {
				font: {
					family: "Roboto",
					size: 16 
				},
				bordercolor: "#000000"
			}
		}];

		// The All-time plot needs more space than the others
		if (year == "All-time"){
			var bot_margin = 200;
			var adjust_size_for_margin = 150;
		}
		else{
			var bot_margin = 50;
			var adjust_size_for_margin = 0;
		}

		var layout = {
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			title: {
				text: year+", publications: "+years[year].length,
				font: {
					family: "Roboto",
					size: 50,
					color: "#000000"
				}
			},
			showlegend: false,   
			width: 700 + adjust_size_for_margin,
			height: 700 + adjust_size_for_margin,
			margin: {
				l: 50,
				r: 50,
				b: bot_margin,
				t: 170,
				pad: 0
			}
		}

		// Push the label count and name into the plot data object
		for (var lab in label_count){
			data[0].values.push(label_count[lab]);
			data[0].labels.push(lab);
			data[0].marker.colors.push(facility_colour_map[lab]);
		}

		// Create div for the plot
		$(target_div).append('<div id="pie'+year+'" style="display:none;" class="piechart"></div>');
		$('#button_holder').append('<button id="button'+year+'" class="year_button">'+year+'</button>');

		// Finally create the plot and place it in its div
		Plotly.newPlot('pie'+year, data, layout, {displayModeBar: false});

		// Create a table with the same info as the plot
		$('#pie'+year).append('<table id="table'+year+'" class="facility_table"></table>');

		// Find the table so we can add to it
		var facility_table = document.getElementById("table"+year);

		// Add a caption to the table
		var facility_table_caption = facility_table.createCaption();
		facility_table_caption.innerHTML = "Facility output in "+year.toString();

		var rowno = 0;

		var label_count_sorted = Object.keys(label_count).map(function(key) {
			return [key, label_count[key]];
		});
		// Sort the array based on the second element
		label_count_sorted.sort(function(first, second) {
			return second[1] - first[1];
		});
		for (var rowno in label_count_sorted){

			// Create an empty <tr> element and add it to the 1st position of the table:
			var row = facility_table.insertRow(rowno);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			var cell_name = row.insertCell(0);
			var cell_no = row.insertCell(1);

			// Styling the cells
			row.style.backgroundColor = facility_colour_map[label_count_sorted[rowno][0]]
			cell_name.className = 'current_table_platform_name';
			cell_no.className = 'current_table_platform_no';

			// This is a workaround for the fact that NGI Stockholm has two labels that needed to be merged into a single item.
			// The link goes out to one of the two NGI Stockholm pubdb labels, it is hard coded.
			// Other labels just link out to their label name
			if (label_count_sorted[rowno][0] == "NGI Stockholm"){
				cell_name.innerHTML = "<a href='https://publications.scilifelab.se/label/NGI%20Stockholm%20%28Genomics%20Applications%29' target='_blank' class='facility_table_link'>"+label_count_sorted[rowno][0]+"</a>";
			} else {
				cell_name.innerHTML = "<a href='https://publications.scilifelab.se/label/"+label_count_sorted[rowno][0]+"' target='_blank' class='facility_table_link'>"+label_count_sorted[rowno][0]+"</a>";
			}
			cell_no.innerHTML = label_count_sorted[rowno][1];
		}

		// Need to add the thead last, because otherwise everything will be in the head - for reasons...
		// Create an empty <thead> element and add it to the table:
		var header = facility_table.createTHead();
		// Create an empty <tr> element and add it to the first position of <thead>:
		var header_row = header.insertRow(0);    
		// Insert a new cell (<td>) at the first position of the "new" <tr> element:
		var cell_platform = header_row.insertCell(0);
		var cell_publications = header_row.insertCell(1);
		// Add some bold text in the new cell:

		cell_platform.className = 'current_table_platform_name_th';
		cell_publications.className = 'current_table_platform_no_th';
		cell_platform.innerHTML = "<b>Facility</b>";
		cell_publications.innerHTML = "<b>Publications</b>";
	}

	/*
	jQuery events for pressing the buttons to switch chart
	*/
	$(".year_button").click(function(){
		$(".year_button").removeClass('active');
		$(this).toggleClass('active'); 

		var year = $(this).attr("id").substring(6);
		$("#charts").children().hide()
		$('#pie'+year).show();
	});

	var current_year = new Date().getFullYear().toString();
	$("#button"+current_year).click();

}
