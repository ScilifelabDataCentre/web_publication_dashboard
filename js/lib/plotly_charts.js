facility_colour_map = {
	"Tissue Profiling": "#8dd3c7AA", // Affinity Proteomics
	"Fluorescence Tissue Profiling": "#8dd3c7AA", // Affinity Proteomics
	"Fluorescence Correlation Spectroscopy": "#ffffb3AA", // Bioimaging
	// "Bioinformatics Compute and Storage": "#bebadaAA", // Bioinformatics
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
	// "NGI Stockholm (Genomics Applications)": "#fccde5AA", // Genomics
	// "NGI Stockholm (Genomics Production)": "#fccde5AA", // Genomics
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
	"Advanced Mass Spectrometry Proteomics": "#9f8d1fAA" // Regional facilities of national interest
}

function draw_label_pie(target_div, publications_json){
	// console.log(publications_json);
	var years = {"All-time": []};

	for (i=0; i<publications_json.length; i++){
		var year = publications_json[i]["published"].split('-')[0];
		if (years.hasOwnProperty(year)){
			years[year].push(publications_json[i]);
		} else {
			years[year] = [];
			years[year].push(publications_json[i]);
		}
		years["All-time"].push(publications_json[i])
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
		var layout = {
			paper_bgcolor: 'rgba(0,0,0,0)',
			plot_bgcolor: 'rgba(0,0,0,0)',
			title: {
				text: year,
				font: {
					family: "Roboto",
					size: 60,
					color: "#000000"
				}
			},
			showlegend: false,   
			width: 700,
			height: 700,
				margin: {
					l: 50,
					r: 50,
					b: 50,
					t: 170,
					pad: 0
				}
		}
		for (var lab in label_count){
			data[0].values.push(label_count[lab]);
			data[0].labels.push(lab);
			data[0].marker.colors.push(facility_colour_map[lab]);
		}

		$(target_div).append('<div id="pie'+year+'" style="display:none;" class="piechart"></div>');
		$('#button_holder').append('<button id="button'+year+'" class="year_button">'+year+'</button>');
		// console.log(year)

		Plotly.newPlot('pie'+year, data, layout, {displayModeBar: false});

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

			row.style.backgroundColor = facility_colour_map[label_count_sorted[rowno][0]]
			cell_name.className = 'current_table_platform_name';
			cell_no.className = 'current_table_platform_no';
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

	$("#button2019").click();

}