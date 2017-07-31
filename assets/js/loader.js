window.onload = function () {
    		console.log("1");
		    if (localStorage["menuLoaded"] === null) {
		        loadContent('menuContainer', 'loaderContainer', 3);
		        console.log("2");
		        localStorage.setItem("menuLoaded", true);
		    }
		}

function loadContent(contentDiv, loaderDiv, delay) {
	setTimeout(function() {
	    showContent(contentDiv, loaderDiv);
	}, delay*1000);
}

function showContent(contentDiv, loaderDiv) {
  	document.getElementById(loaderDiv).style.display = "none";
  	document.getElementById(contentDiv).style.display = "block";
}