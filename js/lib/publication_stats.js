function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

function draw_wordcloud(pubmed_xml_raw){
	var xml_parser = new DOMParser();
	var pm_xml = xml_parser.parseFromString(pubmed_xml_raw, "text/xml");

	var keyword_dict = {};

	for (var i=0; i<pm_xml.getElementsByTagName("PubmedArticle").length; i++){
		var pub_xml = pm_xml.getElementsByTagName("PubmedArticle")[i];
		var keywords = pub_xml.getElementsByTagName("Keyword");
		for (var j=0; j<keywords.length; j++){
			var keyword = keywords[j].childNodes[0].nodeValue.toUpperCase();
			if (keyword_dict.hasOwnProperty(keyword)){
				keyword_dict[keyword] += 1;
			} else {
				keyword_dict[keyword] = 1;
			}
		}
	}
	var word_list = [];
	for (var key in keyword_dict){
		word_list.push([key,keyword_dict[key]]);
	}

	var cloud_opts = {
		list: word_list,
		gridSize: Math.round(16 * $('#publication_stats_wordcloud').width() / 1024),
		weightFactor: function (size) {
			return Math.pow(size, 2.3) * $('#publication_stats_wordcloud').width() / 1024;
		},
		fontFamily: 'Times, serif',
		color: 'random-light',
		rotateRatio: 0,
		// rotationSteps: 2,
		backgroundColor: '#FFFFFF'
	};
	console.log(word_list);

	WordCloud(document.getElementById('publication_stats_wordcloud'), cloud_opts );
}