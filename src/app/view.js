// "ItemListView" renders the list of items from a given collection, based on "ItemCollapsedView"
var ItemListView = Backbone.View.extend({
	el: $('#application'),
	// stores information about the active timeout; used to reset the timeout on keystroke when typing is the search query
	timeout: '',
	// 2 events are monitored: clicking "Show more" button to render next page, keystrokes when typing is the search query
	events: {
		'click #more button': 'addPage',
		'keyup #search input': 'doSearch'
  	},
	// - views' templates implement JST templates, generated from HTML files
	templateEmpty: window["JST"]["item-empty-state.html"],
	templateInitial: window["JST"]["item-initial-state.html"],
	// "initialize" function sets the initial conditions:
	// - makes sure all events are delegated (needed for when we render a cached view without constructing it)
	// - sets searchbox value equal to the search query used
	// - clears the element where results are to be rendered
	// - renders the initial HTML of the view
	initialize: function() {
		this.$el.html(this.templateInitial());
		this.delegateEvents(this.events);
		this.$el.find('#search input').val(this.collection.searchTerm);
		return this;		
	},
	// "render" function renders the results using the "itemCollapsedView" or renders empty state if there are no items
	render: function() { 
		if(this.collection.length) {
			this.collection.each(function(model) {
				var itemCollapsedView = new ItemCollapsedView({
					model: model
				});

      				this.$el.find('#results').append(itemCollapsedView.render().el);
			}.bind(this));
			console.log("Page " + (this.collection.state.currentPage +1) + " of " + this.collection.state.totalPages + " was rendered");
			if (this.collection.state.currentPage < this.collection.state.totalPages-1) this.$el.find('#more').show(); 
		}
		else {
			this.$el.find('#more').hide();
			this.$el.find('#results').html(this.templateEmpty()).parent().removeClass('searching');
		}
		this.$el.find('#results').parent().removeClass('searching');
		return this;
	},
	// "renderToPage" function renders all the items from the first page up to given page
	// expects page number as parameter and defaults to current page if none is passed
	renderToPage: function(page) {
		if (typeof page === 'undefined') page = this.collection.state.currentPage;
		this.collection.getFirstPage();
		this.render();
		while ( page > this.collection.state.currentPage) { this.addPage(); }
	},
	// "addPage" function renders the next page of results if it exists and hides the "Show more" button if last page
	addPage: function() {
		var $button = this.$el.find('#more')
		if (this.collection.state.currentPage < this.collection.state.totalPages-1) { 
			document.activeElement && document.activeElement.blur();
			this.collection.getNextPage(); 
			this.render(); 
			if (this.collection.state.currentPage == this.collection.state.totalPages-1) $button.hide();
		}
		else { console.log("All pages have been rendered"); }
		return this;
	},
	// "doSearch" function monitors the searchbox activity
	// if search query is at least 3 chars long and there was no typing during 500ms, search for the current term is triggered
	doSearch: function() { 
		var $input = this.$el.find('#search input');
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function() {
			if ($input.val().length >=3) itemsRouter.navigate("search/" + $input.val(), {trigger: true});
		}, 500); 
	},
	remove: function() {
		this.$el.empty().off(); /* off to unbind the events */
		this.stopListening();
		this.undelegateEvents();
		return this;
	}
});

// "ItemCollapsedView" renders the one item from the items' list
var ItemCollapsedView = Backbone.View.extend({
	// for each added item it creates a "<div>" of class "card"
	tagName: 'div',
	className: 'card',
	// implements JST template, generated from HTML files
	template: window["JST"]["item-collapsed.html"],
	// renders the item based on the template and item model's attributes
	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
});

// "ItemCollapsedView" renders one item in a detailed format
var ItemDetailedView = Backbone.View.extend({
	el: $('#application'),
	// stores the link of the previous route in order to return to
	backLink: '',
	// 2 events are monitored: clicking "Show more" button to render next page, keystrokes when typing is the search query
	events: {
		'keyup #search input': 'doSearch',
		'click .item__meta .btn': 'popupHandler'
  	},
	// implements JST templates, generated from HTML files
	templateDetailed: window["JST"]["item-detailed.html"],
	templateEmpty: window["JST"]["item-empty-state.html"],
	templateInitial: window["JST"]["item-initial-state.html"],
	// "initialize" function sets the initial conditions:
	// - sets the correct search query into searchbox
	// - sets the link for the "Back" button
	// - clears the element where results are to be rendered
	// - renders the initial HTML of the view
	initialize: function(options, link) {
		this.$el.html(this.templateInitial());
		$input = this.$el.find('#search input');
		if (this.model instanceof Backbone.Model) { 
			$input.val(this.model.collection.pageableCollection.searchTerm);
			this.model.set({ item_link: link });
		}
		this.backLink = link ? '#' + link : '';
		return this;		
	},
	// "render" function renders the item's detailed layout (if it exists), or an empty state view
	render: function() {
		this.$el.find('#results').addClass('searching');
		this.$el.find('#more').hide(); 
		if (this.model instanceof Backbone.Model) {
			this.$el.find('#results').html(this.templateDetailed(this.model.attributes)).parent().removeClass('searching');
		}
		else {
			this.$el.find('#results').html(this.templateEmpty()).parent().removeClass('searching');
		}
		return this;
	},
	// "doSearch" function monitors the searchbox activity
	// if search query is at least 3 chars long and there was no typing during 500ms, search for the current term is triggered
	doSearch: function() { 
		var $input = this.$el.find('#search input');
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function() {
			if ($input.val().length >=3) itemsRouter.navigate("search/" + $input.val(), {trigger: true});
		}, 500); 
	},
	// "popupHandler" function creates social network popup when sharing button is clicked
	popupHandler: function(e) {
		e = (e ? e : window.event);
		var t = (e.target ? e.target : e.srcElement);

		// popup position
		var
			px = Math.floor(((screen.availWidth || 1024) - 500) / 2),
			py = Math.floor(((screen.availHeight || 700) - 500) / 2);
 
		// open popup
		if (!popup) var popup = window.open(t.href, "social", 
			"width="+500+",height="+500+
			",left="+px+",top="+py+
			",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
		if (popup) {
			popup.focus();
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
		}
 
		return !!popup;
	},
	remove: function() {
		this.$el.empty().off(); /* off to unbind the events */
		this.stopListening();
		this.undelegateEvents();
		return this;
	}
});