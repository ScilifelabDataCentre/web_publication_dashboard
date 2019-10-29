function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 100);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
	// Shows/hides an element
    document.getElementById(id).style.display = value ? 'block' : 'none';
}