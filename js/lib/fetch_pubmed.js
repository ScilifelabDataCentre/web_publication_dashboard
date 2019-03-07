function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

onmessage = function(e) {
	// console.log('Message received from main script');
	var publications = [];
	console.log(e.data.length);
	loading_level = 0;

	if (e.data.length == 1){
		console.log(e.data[0])
		publications.push.apply(publications, JSON.parse(Get(e.data[0]))["publications"]);

		// Tell owner we have loaded a little bit
		loading_level = 10;
		postMessage([false, loading_level]);

	}
	else {
		publications = e.data;
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

		loading_level = Math.round(loading_level + Math.round(1/(batches.length*1.2)*1000)/10);
		console.log(loading_level);

		if (loading_level > 99){
			console.log("loading level over 9000! "+loading_level)
			loading_level = 99;
		}
		postMessage([false, loading_level]);
	}
	postMessage([true, batch_returns]);
}