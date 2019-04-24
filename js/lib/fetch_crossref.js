function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

onmessage = function(e) {
	// console.log('Message received from main script');
	// var crossref_api_returns = [];
	var doi = e.data[0];
	var send_back = e.data[1];
	//console.log(e.data);
	crossref_api_returns = JSON.parse(Get("https://api.crossref.org/v1/works/"+doi));
	// console.log('Posting message back to main script');
	postMessage([crossref_api_returns, send_back]);
}
