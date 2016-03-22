var ItemsRouter = Backbone.Router.extend({
	// We cache several variables:
	// - item.collection 	- the current collection of items received from the Flickr API
	// - item.views.list 	- the List View corresponding to the current items collection
	// - item.views.item	- the Item View corresponding to the item we rendered in detailed layout
	item: {
		collection: '',
		views: {}
	},

	// stores the information about previous history state link
	previousRoute: '',

	routes: {
		"" 			: "search",	// base url scenario			// application entry point
		"search/:query" 	: "search",	// direct search link scenario		// search queries
		"item/:query" 		: "details"	// direct item link scenario		// item details
	},
	
	// "search" function is meant to handle all the requests for rendering a list of Flickr items
	// it expects an optional "query" parameter, corresponding to the tag name we search using Flickr API
	// it matches the query agains an existing List View
	// in case they match, cached view is rendered; in case they don't, garbage is cleared and new view is rendered
	search: function(query) {
		if (!query) this.navigate("search/potato", {trigger: false, replace: true});
		if ( 	!(this.item.collection instanceof Backbone.PageableCollection) ||
			!(this.item.collection.searchTerm === query) ) {

			if (this.item.views.list instanceof Backbone.View) { this.item.views.list.remove(); }
			if (this.item.collection instanceof Backbone.PageableCollection) { 
				this.item.collection.fullCollection.reset(); 
				console.log("%cAll items were deleted", "color: #ff7700;");
			}
			this.item.collection	= new ItemsCollection(query);
			this.item.views.list	= new ItemListView({ collection: this.item.collection });
					
			var collection 		= this.item.collection;
			var view		= this.item.views.list;
			// we're doing a cross-domain request therefore we are using "JSONP" dataType
			// we're also setting the "jsonpCallback" name of the callback function to be parsed
			collection.fetch({
				jsonpCallback: 'jsonFlickrFeed',
			   	dataType: "jsonp",    
				success : function (data) {
					console.log("%cItems were loaded from API", "color: #0000ff; font-weight: bold;");
					console.log("There are " + collection.state.totalPages + " pages in total");
				},
				error : function (data) {
					console.log("%cError while accessing the API", "color: #ff0000; font-weight: bold;");
				}
			}).done( function () {
				view.render();
			});
		}
		else { 
			this.item.views.list.initialize().renderToPage();
			console.log("%cCached list was rendered", "color: #00dd00;");
		};
		
		this.previousRoute = Backbone.history.getFragment();
	},

	// "details" function is meant to handle all the requests for rendering a particular item;
	// it expects an optional "query" parameter, corresponding to the item id from an existing or default "potato" collection
	// if the collection exists, it checks if the item is inside; if no collection exists - it fetches the default "potato" collection
	details: function(query) {
		// First we un-delegate all the events from the existing Item View if it exists
		if (this.item.views.item instanceof Backbone.View) { this.item.views.item.remove(); }
		// We check if the collection exists; if yes - we use it, if not - we fetch the default "potato" collection
		if (this.item.collection instanceof Backbone.PageableCollection) { 
			console.log("Item was fetched from cached collection");	
			this.item.views.item = new ItemDetailedView(
				{ model: this.item.collection.fullCollection.findWhere({ alias: query }) }, 
				this.previousRoute
			);
			this.item.views.item.render();
			this.previousRoute = Backbone.history.getFragment();
		}
		else {
			// If collection doesn't exist, we fetch the default "potato" collection
			this.item.collection	= new ItemsCollection(); 
			this.item.views.list	= new ItemListView({ collection: this.item.collection });
			this.previousRoute 	= 'search/potato';
			var collection 		= this.item.collection;
			var route		= this.previousRoute;
			collection.fetch({
				jsonpCallback: 'jsonFlickrFeed',
			   	dataType: "jsonp",    
				success : function (data) {
					console.log("%cDefault collection was fetched", "color: #0000ff; font-weight: bold;");
					console.log("There are " + collection.state.totalPages + " pages in total");
				},
				error : function (data) {
					console.log("%cError while accessing the API", "color: #ff0000; font-weight: bold;");
				}
			}).done( function () {
				// When collection is fetched, we try to find the corresponding item model and create a corresponding view;
				var view = new ItemDetailedView({ model: collection.fullCollection.findWhere({ alias: query }) }, 
					route
				);
				view.render();
			});
		}
	}
});