function loadMenuFromXML(filePath, divID){

	var xhttp = new XMLHttpRequest();

	//set the callback method
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var menu = parseXML(xhttp.responseXML);		//create an array of objects from the xml
			display(menu, divID);						//display the contents of the xml in a table
		}
	};

	//send an asynchronous get request for the xml file
	xhttp.open("GET", filePath, true);
	xhttp.send();

}

function parseXML(xml){

	var menuElement = xml.getElementsByTagName("menu")[0];

	var menuObj = {}
	menuObj.dateUpdated = menuElement.getAttribute("dateUpdated");
	menuObj.sectionArray = [];

	var elements_section = menuElement.getElementsByTagName("section");
	for (var count_section=0; count_section<elements_section.length; count_section++){

		var section = {};//create an object to store the current section
		section.image = null;
		section.heading = {};
		section.items = [];
		section.subtext = [];

		//parse the sections image if the tag is present
		var element_image = elements_section[count_section].getElementsByTagName("image")[0];
		if (typeof(element_image) != "undefined") {
			section.image = element_image.childNodes[0].nodeValue;
		}

		// parse the section's heading name and its columns
		var element_heading = elements_section[count_section].getElementsByTagName("heading")[0];
		section.heading.name = element_heading.getElementsByTagName("name")[0].childNodes[0].nodeValue;
		section.heading.columns = [];
		var elements_headingCols = element_heading.getElementsByTagName("column");
		for(var count_headingCols=0; count_headingCols<elements_headingCols.length; count_headingCols++){
			section.heading.columns.push(elements_headingCols[count_headingCols].childNodes[0].nodeValue);
		}

		//parse all item elements to the section object's item array
		var elements_item = elements_section[count_section].getElementsByTagName("item");
		for(var count_item=0; count_item<elements_item.length; count_item++){
			var item = {}//create an object to store the current item

			item.name = elements_item[count_item].getElementsByTagName("name")[0].childNodes[0].nodeValue;
			item.style = "";
			style = elements_item[count_item].getAttribute("style");
			if (style != null) {
				item.style = style;
			}
			item.desc = null;
			item.columns = [];

			//pasre items description if the tag is present
			var element_itemDesc = elements_item[count_item].getElementsByTagName("description")[0];
			if (typeof(element_itemDesc) != "undefined") {
				item.desc = element_itemDesc.childNodes[0].nodeValue;
			}
			
			var elements_itemCols = elements_item[count_item].getElementsByTagName("column");
			for(var count_itemCols=0; count_itemCols<elements_itemCols.length; count_itemCols++){
				item.columns.push(elements_itemCols[count_itemCols].childNodes[0].nodeValue);
			}

			section.items.push(item);
		}

		//parse all subtexts of the section
		var elements_subtext = elements_section[count_section].getElementsByTagName("subtext");
		for(var count_subtext=0; count_subtext<elements_subtext.length; count_subtext++){
			section.subtext.push(elements_subtext[count_subtext].childNodes[0].nodeValue);
		}

		menuObj.sectionArray.push(section);
	}


	return menuObj;
}


function display(menu, divID){
	var html = "";
	//html += "Last Updated " + menu.dateUpdated + "<br><br>";
	html += "<menu>";

	//menu sections
	for(var count_section=0; count_section<menu.sectionArray.length; count_section++){
		var section = menu.sectionArray[count_section];
		if (section.image != null) {
			html += '<div class="gallery" style="background-image: url('
				+ "'" + section.image + "'"
				+ ');"></div>';
		}

		//menu section heading
		html += '<div class="menu-section">'
			+ "<table><tr><th class='leftText'>"
			+ section.heading.name
			+ "</th>";

		for(var count_headingCols=0; count_headingCols<section.heading.columns.length; count_headingCols++){
			html += "<th>"
				+ section.heading.columns[count_headingCols]
				+ "</th>";
		}
		html += "</tr>";

		//menu section items
		for(var count_item=0; count_item<section.items.length; count_item++){
			var item = section.items[count_item];
			html += "<tr class='";
			if (item.style.includes("right-align")) {
				html += "menu-right-align";
			}if (item.style.includes("emphasize")) {
				html += " menu-emphasize";
			}
			html += "'><td>"
				+ item.name;

			if (item.desc != null) {
				html += "<menu-item-desc>"
				+ item.desc
				+ "</menu-item-desc>";
			}

			html += "</td>";

			//menu item columns
			for(var count_itemCols=0; count_itemCols<item.columns.length; count_itemCols++){
				html += "<td class='menu-center-align' id='column-thin'>"
					+ item.columns[count_itemCols]
					+ "</td>";
			}
		}

		html += "</tr></table>";

		//menu subtexts
		for(var count_subtext=0; count_subtext<section.subtext.length; count_subtext++){
			html += "<p>" + section.subtext[count_subtext] + "</p>";
		}

		html += "</div>";
	}


	document.getElementById(divID).innerHTML = html;
}








