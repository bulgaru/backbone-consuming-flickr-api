// Item model
var Item = Backbone.Model.extend({
	// "initialize" function stores collection.fullCollection of the Backbone Paginator instance
	// it is important, since the initial collection is destroyed when going to other pages
	initialize: function() {
		this.collection = this.collection.fullCollection;
	},
	// "parse" function validates the data received through API and adds missing fields
	parse: function(data) {
		// if the title is missing or is whitespaces only, it sets it to "untitled"
		data.title 		= (data.title && !(/^\s+$/.test(data.title))) ? data.title : 'untitled';
		// formats the datetime according to the wireframes using "moment.js" library
		// info: http://momentjs.com/
		data.date_formatted 	= moment(data.published).format('Do MMM YYYY [at] HH:mm');
		// splits the tags string into an array of tags
		data.tags_list 		= data.tags.split(' ');
		// generates a unique alias based on the last part of the link string
		data.alias 		= data.link ? data.link.split('/').filter(function (s) { return !!s }).pop() : 'undefined';
		// generate a link for the Flickr profile of the author
		data.author_link 	= data.author_id ? 'https://www.flickr.com/photos/' + data.author_id + '/' : '#';
		return data;
	}
});

// Application implements Backbone Paginator in order to split the collection in several pages 
// info: https://github.com/backbone-paginator/backbone.paginator
var ItemsCollection = Backbone.PageableCollection.extend({
	model: Item,
	// "client" mode - all the API results are stored by the application
	mode: 'client',
	// stores the information about the query used to retrieve results from the API
	searchTerm: '',
	// "initialize" function records the query that was passed as parameter and builds the url for API request
	initialize: function(query) { 
		this.searchTerm = query ? query : 'potato';
		this.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + this.searchTerm + '&tagmode=all&format=json'; 
	},
	// default settings for Paginator: first page is 0, current page is first page, there are 5 items per page
	state: {
		firstPage: 0,
		currentPage: 0,
		pageSize: 5
	},
	// query params used for API requests where certain results are served based on them
	// do not apply to Flickr Public API, so we reset them
	queryParams: {
		totalPages: null,
		totalRecords: null,
		sortKey: null,
		order: null,
		pageSize: null,
		currentPage: null,
		directions: {
      			"-1": null,
			"1": null
		}
	},
	// "parseRecords" function gets API response as parameter
	// tells the collection from which segment items are to be retrieved
	parseRecords: function(data) {
		return data.items; 
	}
});