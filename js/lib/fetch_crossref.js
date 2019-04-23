function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

onmessage = function(e) {
	// console.log('Message received from main script');
	var crossref_api_returns = [];
	//console.log(e.data);
	for (var doi in e.data){
		// console.log(e.data[doi]);
		crossref_api_returns.push(JSON.parse(Get("https://api.crossref.org/v1/works/"+e.data[doi])));
	}
	// console.log('Posting message back to main script');
	postMessage(crossref_api_returns);
}
