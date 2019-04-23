// Map from Facility label to Platform name
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
	"Advanced Mass Spectrometry Proteomics": "#9f8d1fAA" // Regional facilities of national interest
}
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

issns_over_10 = ["0007-9235","0028-4793","0140-6736","0009-2665","2058-8437","1474-1776","0098-7484","2058-7546","1474-175X","1474-1733","0028-0836","1471-0056","0036-8075","0306-0012","1476-1122","1748-3387","1470-2045","0034-6861","1087-0156","1471-0072","1471-003X","1078-8956","1749-4885","1740-1526","0092-8674","0001-8732","1754-5692","2051-5545","2051-5545","1474-4422","1061-4036","1548-7091","1047-840X","0732-183X","1755-4330","0360-1285","1473-3099","0066-4146","1759-4774","0079-6700","1369-7021","0927-796X","2159-8274","0031-9333","0079-6425","1756-1833","0195-668X","1433-8351","1934-5909","1535-6108","0066-4308","0066-4308","1548-7660","1745-2473","0732-0582","0935-9648","1614-6832","1947-5454","1529-2908","2213-2600","1943-8206","1529-1006","0001-4842","2374-2437","0016-5085","0893-8512","1550-4131","1759-5029","1553-877X","0066-4154","0370-1573","2168-6106","1097-6256","1759-4758","1074-7613","0003-4819","2213-8587","1758-678X","1758-678X","1465-7392","0031-6997","0009-7322","1543-5008","2214-109X","2214-109X","0962-8924","1931-3128","0167-5729","1748-0132","0302-2838","1759-5045","0017-5749","0735-1097","1946-6234","2168-622X","2168-622X","1754-9426","2056-676X","1553-4006","0169-5347","0001-6322","1531-7331","0968-0004","1759-4790","1364-6613","1364-6613","0163-769X","1001-0602","1389-5567","1073-449X","2215-0374","2215-0374","0009-7330","1759-5002","0006-4971","0140-525X","0140-525X","0168-8278","0342-4642","0066-4219","0066-4189","0147-006X","0010-8545","1752-0894","2160-3308","0002-7863","0066-4278","0896-6273","0034-4885","1097-2765","1471-4906","2058-5276","0301-0082","2451-9294","1759-5061","0270-9139","1560-2745","0923-7534","0066-4170","1552-4450","1571-0645","0066-426X","1936-0851","0169-409X","2047-7538","0167-7799","8755-1209","1092-2172","0149-5992","0002-953X","0002-953X","1545-9993","1616-301X","0362-1642","1548-5943","1548-5943","0091-6749","0021-9738","0033-2909","0033-2909","1474-760X","2051-6347","0033-3190","0033-3190","2211-2855","1931-9401","0149-2195","1941-1405","1614-4961","1552-5260","0950-6608","2190-6009","2198-3844","1754-2189","2095-4700","2041-1723","0003-4967","2380-8195","0903-1936","1360-1385","0165-6147","1433-7851","1530-6984","0006-3223","1355-4786","0966-842X","1936-122X","1464-7931","0926-3373","1549-1676","1350-9462","1359-4184","0166-0616","1368-7646","0742-3098","0935-4956","0305-1048","0920-5691","2375-2548","2055-026X","2168-6149","0734-9750","0166-2236","0265-0568","0168-6445","0084-6597","2155-5435","2352-3018","0027-8874","2374-7943","1554-8627","0146-6410","1471-4914","0006-8950","0022-1007","2168-6203","1043-2760","0079-6727","2352-3026","1388-9842","1087-0792","0261-4189","0168-9525","1932-4529","0163-7258","1556-0864","1757-4676","0364-5134","1936-878X","0002-9270","0737-4038","2043-8206","1078-0432","1044-579X","1543-592X","2380-6583","1088-9051","0887-6924","0955-0674"];

function edit_latest_publications(crossref_data){
	for (pub in crossref_data){
		crossref_journal_name = crossref_data[pub]["message"]["container-title"][0];
		crossref_published_date = crossref_data[pub]["message"]["issued"]["date-parts"][0];
		crossref_published_date_string = crossref_published_date[0].toString();

		// Format the datestring properly with leading 0s for day/month
		if (crossref_published_date[1].toString().length<2){
			crossref_published_date_string += "-0"+crossref_published_date[1].toString();
		}else{
			crossref_published_date_string += "-"+crossref_published_date[1].toString();
		}
		if (crossref_published_date[2].toString().length<2){
			crossref_published_date_string += "-0"+crossref_published_date[2].toString();
		}else{
			crossref_published_date_string += "-"+crossref_published_date[2].toString();
		}

		document.getElementById("latest_journal_"+pub).innerHTML = "Journal: "+crossref_journal_name;
		document.getElementById("latest_journal_date_"+pub).innerHTML = "Published: "+crossref_published_date_string;
	}
}

function draw_latest_publications(publications){
	var published_date_list = [];	
	var show_list = [];
	
	for (pub in publications){
		var published_datestring = publications[pub]["created"];
		var published_date = new Date(published_datestring);
		published_date_list.push([published_date,publications[pub]]);
	}
	
	published_date_list.sort(function(first, second){
		return second[0].getTime() - first[0].getTime();
	});
	
	for (item in published_date_list){
		if (issns_over_10.indexOf(published_date_list[item][1]["journal"]["issn"]) > 0){
			show_list.push(published_date_list[item][1]);
		}
		// This is the length of the list, show 10 items
		if (show_list.length == 10){
			break;
		}
	}
	// console.log(show_list);
	
	// These will be sent back, and then sent to crossref API
	var send_back_dois = [];

	for (pub in show_list){
		console.log(show_list[pub]["title"]);
		$("#latest_publications_container").append('<div id="latest_'+pub+'" class="latest_publication"></div>');
		if (show_list[pub]["doi"] != null){
			send_back_dois[pub] = show_list[pub]["doi"];
			var publication_href = "https://www.doi.org/"+show_list[pub]["doi"];
		}
		else{
			// Not sure if this ever happens for high impact items, but keeping it anyway
			console.log("no DOI, "+pub)
			var publication_href = show_list[pub]["links"]["display"]["href"]
		}
		$("#latest_"+pub).append('<div class="latest_publication_title_container"><a class="latest_publication_title" target="_blank" href="'+publication_href+'">'+show_list[pub]["title"]+'</a></div>');

		var author_string = "";
		for (author in show_list[pub]["authors"]){
			if (show_list[pub]["authors"][author]["family"] != null){
				if (author_string != ""){
					author_string += ", "
				}
				author_string += show_list[pub]["authors"][author]["family"] + " " + show_list[pub]["authors"][author]["initials"]
			}
		}

		// Adding authors
		$("#latest_"+pub).append('<div id="latest_publication_authors_container_'+pub+'" class="latest_publication_authors_container"></div>');
		$("#latest_publication_authors_container_"+pub).append('<div id="latest_publication_authors_'+pub+'" class="latest_publication_authors">'+author_string+'</div>');
		$("#latest_publication_authors_container_"+pub).append('<span style="display: none;" id="latest_publication_show_more_button_'+pub+'" class="latest_publication_show_more_button">Show all authors</span>');

		if (document.getElementById("latest_publication_authors_"+pub).offsetHeight > 38) {
			document.getElementById("latest_publication_authors_"+pub).className = "latest_publication_authors_hidden";
			document.getElementById("latest_publication_show_more_button_"+pub).style.display = 'inline';
		}
		$("#latest_publication_show_more_button_"+pub).click(function(){
			if (this.previousSibling.className == "latest_publication_authors"){
				this.previousSibling.className = "latest_publication_authors_hidden";
				this.innerHTML = "Show all authors";
			}
			else{
				this.previousSibling.className = "latest_publication_authors";
				this.innerHTML = "Hide all authors";
			}
		});

		$("#latest_"+pub).append('<div id="latest_journal_'+pub+'" class="latest_publication_journal">Journal: '+show_list[pub]["journal"]["title"]+'</div>');
		$("#latest_"+pub).append('<div id="latest_journal_date_'+pub+'" class="latest_publication_date">Published: '+show_list[pub]["published"]+'</div>');

		// Now adding the label buttons
		$("#latest_"+pub).append('<div id="latest_labels_'+pub+'" class="latest_publication_labels_container"></div>');
		
		// Stores the label types (Service, Collaborative, Tech Dev)
		var label_types = [];
		
		for (label in show_list[pub]["labels"]){
			// Check if the label type has been listed already, if not, then add it
			if (label_types.indexOf(show_list[pub]["labels"][label]) < 0){
				label_types.push(show_list[pub]["labels"][label])
			}
			$("#latest_labels_"+pub).append("<a style='background-color:"+facility_colour_map[label]+";' class='latest_publication_label' target='_blank' href='https://publications.scilifelab.se/label/"+label+"'>"+label+"</a>");
		}

		// Create the string for the label types
		var label_types_string = "";
		for (label_type in label_types){
			if (label_types_string != ""){
				label_types_string += ", ";
			}
			label_types_string += label_types[label_type];
		}

		$("#latest_"+pub).append('<div id="latest_label_types_'+pub+'" class="latest_publication_label_types_container"><span class="latest_publication_label_type">Type of SciLifeLab affiliation: </span></div>');
		$("#latest_label_types_"+pub).append("<span class='latest_publication_label_type'>"+label_types_string+"</span>");
		
		if (pub != show_list.length-1){
			// Add a spacer div, to be styled, if its not the last pub
			$("#latest_"+pub).append('<div class="latest_publication_spacer"></div>');
		}
	}

	return send_back_dois;
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