describe("Views testing", function(){
	describe("List view", function(){
		var collection = new ItemsCollection();		
		var emptyCollection = new ItemsCollection();
		collection.url = "http://localhost/backbone/tests/unit/photos_public.json";

		beforeAll(function(done) {
			$('body').append('<div id="application"></div>');
			collection.fetch({
				jsonpCallback: 'jsonFlickrFeed',
				dataType: "jsonp",
			}).done(done);
		});

		it("should attach itself to DOM when constructing", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			expect(view.$el).toBeInDOM();
		});

		it("should create the basic layout: searchbox, \"More\" button and results pane when initialising", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			expect(view.$el.find('#search')).toExist();
			expect(view.$el.find('#results')).toExist();
			expect(view.$el.find('#more')).toExist();
		});

		it("should set correct text inside the searchbox when initialising", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			expect(view.$el.find('#search').find('input')).toHaveValue('potato');
		});

		it("should use the empty state template for empty collection when rendering", function() {
			var view = new ItemListView({ el: $('#application'), collection: emptyCollection });
			view.render();
			expect(view.$el.find('.empty')).toExist();
		});

		it("should use the collapsed item template for non-empty collection when rendering", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			view.render();
			expect(view.$el.find('.card')).toExist();
		});

		it("should render first page and show \"Show more\" button when rendering", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			view.render();
			expect(collection.state.currentPage).toBe(0);
			expect(view.$el.find('#more')).toBeVisible();
		});

		it("should render by default number pages based using collection.state.currentPage (function \"renderToPage()\")", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			collection.state.currentPage = 2; // page 3
			view.renderToPage();
			expect(view.$el.find('.card')).toHaveLength(15);
		});

		it("should render 3 pages when asked to render 3 pages (function \"renderToPage(page)\")", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			view.renderToPage(2); // page 3
			expect(collection.state.currentPage).toBe(2);
			expect(view.$el.find('.card')).toHaveLength(15);
		});

		it("should render 1 more page when asked to add page (function \"addPage()\")", function() {
			var view = new ItemListView({ el: $('#application'), collection: collection });
			view.render();
			expect(collection.state.currentPage).toBe(0);
			expect(view.$el.find('.card')).toHaveLength(5);
			view.addPage();
			expect(collection.state.currentPage).toBe(1);
			expect(view.$el.find('.card')).toHaveLength(10);
		});

		afterEach(function() {
			$('#application').html('');
			collection.getFirstPage();
		});
	});
});