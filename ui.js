ui = {
	showFilters: function() {
		for (var i = 0; i < Object.keys(filters).length; i += 1)
		{
			var filterName = Object.keys(filters)[i];
			var checkboxHTML = ui.getFilterHTML(filterName);
			
			$('#filter_container').append(checkboxHTML);
		}
	},
	
	getFilterHTML: function(f) {
		return `<span class='filter_item unkempt-regular'>` +
				`<input type="checkbox" id="${f}" onclick="ui.clickFilterCheckBox(this)" name="${f}" switch ${filters[f] ? "checked" : ""} />` +
				`<label for="${f}">${ui.capitalizeFirstLetter(f)}</label>` +
			`</span>`;
	},
	
	clickFilterCheckBox: function(cb)
	{
		filters[cb.id] = $(cb).prop('checked');
		ui.filterOutfits();
	},
	
	getOutfitHTML: function(o) {
		var monthDay = o.date.split(".");
		var monthIndex = monthDay[0];
		var day = monthDay[1];
		var monthString = new Date(2025, monthIndex, day).toLocaleString('default', { month: 'long' });
		var formattedDateAsString = monthString + " " + monthDay[1] + ", 2026";
		
		var adjectiveText = "";
		for (var j = 0; j < o.adjectives.length; j += 1)
		{
			adjectiveText += ui.capitalizeFirstLetter(o.adjectives[j]) + ". ";
		}
		
		return	`<div id='${monthIndex}_${day}' class='outfitImgDiv unkempt-regular'>` +
					`<p><img class='outfitImg' src="images/${o.date}.${o.extension}"></img></p>` +
					`<h3>${formattedDateAsString}: ${adjectiveText.trim()}</h3>` +
				`</div>`;
	},
	filterOutfits: function() {
		$('.outfitImgDiv').hide();
		for (var i = 0; i < Object.keys(filters).length; i += 1)
		{
			var filterName = Object.keys(filters)[i];
			var filterChecked = filters[filterName];
			if (filterChecked)
			{
				for (var j = 0; j < outfits.length; j += 1)
				{
					var outfit = outfits[j];
					if (outfit.adjectives.includes(filterName))
					{
						$(`#${outfit.date.replace(".","_")}`).show();
					}
				}
			}
		}
	},
	capitalizeFirstLetter: function(s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
};
