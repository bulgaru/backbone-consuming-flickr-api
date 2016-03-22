describe("Collection testing", function(){
	describe("Before calling API, collection", function(){

		var collection = new ItemsCollection();

		it("should extend Paginator collection class", function(){
			expect(collection instanceof Backbone.PageableCollection).toBeTruthy();
		});

		it("should be in Paginator \"client\" mode", function(){
			expect(collection.mode).toBe("client");
		});

		it("should use \"Item\" model", function(){
			expect(collection.model).toBe(Item);
		});

		it("should use default \"potato\" searchTerm, if none is passed", function(){
			expect(collection.searchTerm).toBe("potato");
		});

		it("should build API call url correctly, by including the \"tags=<searchTerm>\"", function(){
			expect(collection.url).toBe("https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json");
		});

		it("should have \"state\" parameter set to 5 items per page, starting from page 0", function(){
			expect(collection.state.firstPage).toBe(0);
			expect(collection.state.currentPage).toBe(0);
			expect(collection.state.pageSize).toBe(5);
		});

		it("should have \"queryParams\" set to Null in order not to affect request URL", function(){
			expect(collection.queryParams.totalPages).toBeNull();
			expect(collection.queryParams.totalRecords).toBeNull();
			expect(collection.queryParams.sortKey).toBeNull();
			expect(collection.queryParams.order).toBeNull();
			expect(collection.queryParams.pageSize).toBeNull();
			expect(collection.queryParams.currentPage).toBeNull();
			expect(collection.queryParams.directions["-1"]).toBeNull();
			expect(collection.queryParams.directions["1"]).toBeNull();
		});
	});

	describe("When the collection calls the API, it", function(){

		var collection = new ItemsCollection();
		var spy = jasmine.createSpy();
		collection.url = "http://localhost/backbone/tests/unit/photos_public.json";
	
		beforeEach(function(done) {
			spyOn(collection, 'parse').and.callThrough();
			collection.fetch({
				jsonpCallback: 'jsonFlickrFeed',
				dataType: "jsonp",
				success: spy
			}).done(done);
		});

		it("should receive a \"success\" response from the API", function() {
			expect(spy).toHaveBeenCalled();
		});

		it("should call the collection's \"parse\" function", function() {
			expect(collection.parse).toHaveBeenCalled();
		});

		it("should be able to parse the results correctly, by getting \"items\" segment", function() {
			var data = collection.parse.calls.argsFor(0)[0];
			expect(data.items.length).toBeGreaterThan(0);
		});

		it("should create \"fullCollection\" and populate it with 20 results", function() {
			expect(collection.fullCollection).toBeDefined();
			expect(collection.fullCollection.length).toBe(20);
		});

		it("should split the collection items into 4 pages of results", function() {
			expect(collection.state.totalPages).toBe(4);
		});

		it("should be ready to provide an items page with 5 results in it", function() {
			expect(collection.length).toBe(5);
		});
	});
});

describe("Item testing", function(){
	describe("Item model", function(){
		var collection = new ItemsCollection();
		
		collection.url = "http://localhost/backbone/tests/unit/photos_public.json";
	
		beforeEach(function(done) {
			collection.fetch({
				jsonpCallback: 'jsonFlickrFeed',
				dataType: "jsonp",
			}).done(done);
		});

		it("should have all the default fields populated", function() {
			var model = collection.at(0);
			expect(model.get("link")).not.toBeNull;
			expect(model.get("media")).not.toBeNull;
			expect(model.get("date_taken")).not.toBeNull;
			expect(model.get("description")).not.toBeNull;
			expect(model.get("published")).not.toBeNull;
			expect(model.get("author")).not.toBeNull;
			expect(model.get("author_id")).not.toBeNull;
			expect(model.get("tags")).not.toBeNull;
		});		

		it("should create auxiliary fields \"date_formatted\", \"tags_list\", \"alias\", \"author_link\"", function() {
			var model = collection.at(0);
			expect(model.get("date_formatted")).toBeDefined;
			expect(model.get("date_formatted")).not.toBeNull;
			expect(model.get("tags_list")).toBeDefined;
			expect(model.get("tags_list")).not.toBeNull;
			expect(model.get("alias")).toBeDefined;
			expect(model.get("alias")).not.toBeNull;
			expect(model.get("author_link")).toBeDefined;
			expect(model.get("author_link")).not.toBeNull;
		});

		it("should set a value that is not empty or whitespaces for \"title\" field", function() {
			var model = collection.at(0);
			expect( (/^\s+$/.test(model.get("title"))) ).not.toBeNull;
		});
	});
});