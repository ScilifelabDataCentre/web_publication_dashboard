function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

onmessage = function(e) {
	// console.log('Message received from main script');
	var publications = [];
	console.log(e.data);
	for (var url in e.data){
		console.log(e.data[url]);
		publications.push.apply(publications, JSON.parse(Get(e.data[url]))["publications"]);
	}

	var base_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=";
	var pmid_list = [];
	var years = ["2018", "2019"];

	for (i in publications){
		var pub = publications[i];
		var year = pub["published"].split('-')[0];
		if (years.indexOf(year) >= 0){
			var pmid = pub["pmid"];
			if (pmid != null){
				pmid_list.push(pmid);
			}
		}
	}
	var pubmed_xml_raw = Get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=".concat(pmid_list.join(",")));
	
	postMessage(pubmed_xml_raw);
}