// Map from Facility label to Platform name
var platform_map = {
	"Tissue Profiling": "Affinity Proteomics",
	"Fluorescence Tissue Profiling": "Affinity Proteomics",
	"Fluorescence Correlation Spectroscopy": "Bioimaging",
	"Bioinformatics Compute and Storage": "Bioinformatics",
	"Bioinformatics Long-term Support WABI": "Bioinformatics",
	"Bioinformatics Support and Infrastructure": "Bioinformatics",
	"Systems Biology": "Bioinformatics",
	"Cryo-EM (SU)": "Cellular and Molecular Imaging",
	"Advanced Light Microscopy (ALM)": "Cellular and Molecular Imaging",
	"BioImage Informatics": "Cellular and Molecular Imaging",
	"Cell Profiling": "Cellular and Molecular Imaging",
	"Cryo-EM": "Cellular and Molecular Imaging",
	"Cryo-EM (UmU)": "Cellular and Molecular Imaging",
	"Protein Science Facility (PSF)": "Cellular and Molecular Imaging",
	"Swedish NMR Centre (SNC)": "Cellular and Molecular Imaging",
	"Chemical Biology Consortium Sweden (KI)": "Chemical Biology and Genome Engineering",
	"Chemical Biology Consortium Sweden (UmU)": "Chemical Biology and Genome Engineering",
	"Chemical Biology Consortium Sweden (CBCS)": "Chemical Biology and Genome Engineering",
	"Genome Engineering Zebrafish": "Chemical Biology and Genome Engineering",
	"High-throughput Genome Engineering (HTGE)": "Chemical Biology and Genome Engineering",
	"Clinical Genomics Gothenburg": "Diagnostics Development",
	"Clinical Genomics Lund": "Diagnostics Development",
	"Clinical Genomics Stockholm": "Diagnostics Development",
	"Clinical Genomics Uppsala": "Diagnostics Development",
	"Drug Discovery and Development (DDD)": "Drug Discovery and Development",
	"Karolinska High Throughput Center (KHTC)": "Functional Genomics",
	"Ancient DNA": "Genomics",
	"NGI Stockholm": "Genomics",
	"NGI Stockholm (Genomics Applications)": "Genomics",
	"NGI Stockholm (Genomics Production)": "Genomics",
	"NGI Uppsala (SNP&SEQ Technology Platform)": "Genomics",
	"NGI Uppsala (Uppsala Genome Center)": "Genomics",
	"Eukaryotic Single Cell Genomics (ESCG)": "Genomics",
	"Microbial Single Cell Genomics": "Genomics",
	"Clinical Biomarkers": "Next-Generation Diagnostics",
	"Mass Cytometry (KI)": "Proteomics and Metabolomics",
	"Mass Cytometry (LiU)": "Proteomics and Metabolomics",
	"Mass Cytometry": "Proteomics and Metabolomics",
	"Single Cell Proteomics": "Proteomics and Metabolomics",
	"Autoimmunity Profiling": "Proteomics and Metabolomics",
	"Chemical Proteomics and Proteogenomics (MBB)": "Proteomics and Metabolomics",
	"Chemical Proteomics and Proteogenomics (OncPat)": "Proteomics and Metabolomics",
	"Chemical Proteomics & Proteogenomics": "Proteomics and Metabolomics",
	"PLA Proteomics": "Proteomics and Metabolomics",
	"Plasma Profiling": "Proteomics and Metabolomics",
	"Swedish Metabolomics Centre (SMC)": "Proteomics and Metabolomics",
	"Clinical Proteomics Mass spectrometry": "Regional facilities of national interest",
	"Mass Spectrometry-based Proteomics, Uppsala": "Regional facilities of national interest",
	"Array and Analysis Facility": "Regional facilities of national interest",
	"Mutation Analysis Facility (MAF)": "Regional facilities of national interest",
	"Bioinformatics and Expression Analysis (BEA)": "Regional facilities of national interest",
	"BioMaterial Interactions (BioMat)": "Regional facilities of national interest",
	"Advanced Mass Spectrometry Proteomics": "Regional facilities of national interest"
}
var platform_colour_map = {
	"Affinity Proteomics": "#8dd3c7",
	"Bioimaging": "#ffffb3",
	"Bioinformatics": "#bebada",
	"Cellular and Molecular Imaging": "#fb8072",
	"Chemical Biology and Genome Engineering": "#80b1d3",
	"Drug Discovery and Development": "#fdb462",
	"Diagnostics Development": "#b3de69",
	"Functional Genomics": "#d9d9d9",
	"Genomics": "#fccde5",
	"Next-Generation Diagnostics": "#bc80bd",
	"Proteomics and Metabolomics": "#ccebc5",
	"Regional facilities of national interest": "#ffed6f"
}

function draw_latest_publications(publications, JIF_threshold){
	
}
function conjure_table(publications, year){
	pub_list = [];
	platforms = {};

	for (pub in publications){
		var pub_year = publications[pub]["published"].split('-')[0];
		if (pub_year == year){
			// Use this publication
			pub_list.push(pub);

			// Count platform numbers
			var labels = publications[pub]["labels"];

			for (var key in labels){
				// console.log(key);
				platform = platform_map[key];
				// console.log(platform);
				if (platforms.hasOwnProperty(platform)){
					platforms[platform] += 1;
				} else {
					platforms[platform] = 1;
				}
			}
		}
	}

	document.getElementById("current_published_p").innerHTML = '<br/>'
		+ '<span id="text_published_number">'
		+ '<a id="current_year_db_link" href="https://publications.scilifelab.se/publications/'
		+ year.toString() 
		+'" target="_blank">'
		+ pub_list.length.toString() 
		+ '</a></span><br/>SciLifeLab publications published to date in<br/><span id="text_current_year">'
		+ year.toString()
		+ '</span>';

	document.getElementById("text_published_number").setAttribute('after-content', pub_list.length.toString());

	// Create items array
	var platforms_sorted = Object.keys(platforms).map(function(key) {
		return [key, platforms[key]];
	});

	// Sort the array based on the second element
	platforms_sorted.sort(function(first, second) {
		return second[1] - first[1];
	});

	// Find the table so we can add to it
	var table = document.getElementById("current_platform_table");

	// Add a caption to the table
	var table_caption = document.getElementById("current_platform_table").createCaption();
	table_caption.innerHTML = "Platform distibution in "+year.toString();


	for (i in platforms_sorted){
		console.log(platforms_sorted[i]);

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(i);
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell_name = row.insertCell(0);
		var cell_no = row.insertCell(1);

		row.style.backgroundColor = platform_colour_map[platforms_sorted[i][0]];
		cell_name.className = 'current_table_platform_name';
		cell_no.className = 'current_table_platform_no';
		cell_name.innerHTML = '<span class="current_table_platform_name">'+platforms_sorted[i][0]+'</span>';
		cell_no.innerHTML = '<span class="current_table_platform_no">'+platforms_sorted[i][1]+'</span>';
	}

	// Need to add the thead last, because otherwise everything will be in the head - for reasons...
	// Create an empty <thead> element and add it to the table:
	var header = table.createTHead();
	// Create an empty <tr> element and add it to the first position of <thead>:
	var header_row = header.insertRow(0);    
	// Insert a new cell (<td>) at the first position of the "new" <tr> element:
	var cell_platform = header_row.insertCell(0);
	var cell_publications = header_row.insertCell(1);
	// Add some bold text in the new cell:

	cell_platform.className = 'current_table_platform_name_th';
	cell_publications.className = 'current_table_platform_no_th';
	cell_platform.innerHTML = "<b>Platform</b>";
	cell_publications.innerHTML = "<b>Publications</b>";


}