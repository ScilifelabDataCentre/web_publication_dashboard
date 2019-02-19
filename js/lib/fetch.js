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

	// console.log('Posting message back to main script');
	postMessage(publications);
}
