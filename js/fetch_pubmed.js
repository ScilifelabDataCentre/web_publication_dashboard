function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	try {
		Httpreq.send(null);
		return Httpreq.responseText;  
	} catch(exception) {
		console.log('There was an error.');
		console.log(exception);
		return null;
	}          
}

onmessage = function(e) {
	// console.log('Message received from main script');
	var publications = [];
	var loading_level = 0;

	if (e.data.length == 1){
		console.log(e.data[0])

		var get_request_result = Get(e.data[0]);
		if (get_request_result !== null){
			publications.push.apply(publications, JSON.parse(get_request_result)["publications"]);
		}
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
	var break_flag = false;

	for (i in batches){
		var pubmed_xml_raw = Get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=".concat(batches[i].join(",")));

		// Break if network error. This happens fairly often with Efetch
		if (pubmed_xml_raw === null){
			postMessage([false, "network_error"]);
			break_flag = true;
			break;
		}
		batch_returns.push(pubmed_xml_raw)
		loading_level = Math.round(loading_level + Math.round(1/(batches.length*1.2)*1000)/10);

		if (loading_level > 99){
			console.log("loading level over 9000! "+loading_level)
			loading_level = 99;
		}
		postMessage([false, loading_level]);
	}
	if (break_flag === false){
		postMessage([true, batch_returns]);
	}
}