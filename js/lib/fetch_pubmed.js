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
	var years = ["2017", "2018", "2019"];

	var pmid_list = [];
	var batches = [];

	for (i in publications){
		var pub = publications[i];
		var year = pub["published"].split('-')[0];
		if (years.indexOf(year) >= 0){
			var pmid = pub["pmid"];
			if (pmid != null){
				pmid_list.push(pmid);
				if (pmid_list.length > 100){
					batches.push(pmid_list);
					// console.log(pmid_list.length);
					pmid_list = [];
				}
			}
		}
	}


	var batch_returns = [];

	for (i in batches){
		try {
			var pubmed_xml_raw = Get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=".concat(batches[i].join(",")));
			batch_returns.push(pubmed_xml_raw)
		} catch(exception) {
			if(exception instanceof NetworkError) {
			console.log('There was a network error.');
			}
		}
	}
	postMessage(batch_returns);
}