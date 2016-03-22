(function() {
window["JST"] = window["JST"] || {};

window["JST"]["item-collapsed.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="row item">\n	<div class="col-xs-4 col-sm-3">\n		<a href="#item/' +
((__t = ( alias )) == null ? '' : __t) +
'" class="item__avatar" style="background-image: url(\'' +
((__t = ( media.m )) == null ? '' : __t) +
'\');"></a>\n	</div>\n	<div class="col-xs-8 col-sm-9 padding-top padding-bottom padding-large-right">\n		<div class="row">\n			<div class="col-xs-12">\n				<a class="item__title" href="#item/' +
((__t = ( alias )) == null ? '' : __t) +
'">\n					<h2>' +
((__t = ( title )) == null ? '' : __t) +
'</h2>\n				</a>\n			</div>\n		</div>\n		<div class="row">\n			<div class="col-xs-12 col-sm-6 col-sm-push-3 item__published"><span>Published: </span>' +
((__t = ( date_formatted )) == null ? '' : __t) +
'</div>\n			<div class="col-xs-6 col-sm-3 col-sm-pull-6 item__author"><a target="_blank" href="' +
((__t = ( author_link )) == null ? '' : __t) +
'">Post author</a></div>\n			<div class="col-xs-6 col-sm-3 item__flickr"><a target="_blank" href="' +
((__t = ( link )) == null ? '' : __t) +
'">View on Flickr</a></div>\n		</div>\n	</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["item-detailed.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="card item item--detailed padding-top padding-bottom padding-left padding-large-right padding-large-left">\n	<div class="row">\n		<div class="col-xs-9 col-sm-10 vcenter">\n			<a class="item__title" target="_blank" href="' +
((__t = ( link )) == null ? '' : __t) +
'">\n				<h2>' +
((__t = ( title )) == null ? '' : __t) +
'</h2>\n			</a>\n		</div><!--\n		--><div class="col-xs-3 col-sm-2 vcenter text-right">\n			<div id="back">\n				<a href="#' +
((__t = ( item_link )) == null ? '' : __t) +
'" class="btn btn-primary">Back</a>\n			</div>\n		</div>\n	</div>\n	<div class="row">\n		<div class="col-xs-12">\n			<div class="item__meta">\n				<a target="_blank" href="' +
((__t = ( author_link )) == null ? '' : __t) +
'">Post author</a><!--\n				--><span class="separator">|</span><!--\n				--><span>Published: </span><!--\n				--><span>' +
((__t = ( date_formatted )) == null ? '' : __t) +
'</span><!--\n				--><span class="separator">|</span><!--\n				--><a class="btn btn-xs btn-danger" href="https://plus.google.com/share?url=' +
((__t = ( link )) == null ? '' : __t) +
'" title="Share on Google+">+1</a>\n			</div>\n		</div>\n	</div>\n	<div class="row">\n		<div class="col-xs-12 col-sm-4 text-center">\n			<a target="_blank" href="' +
((__t = ( link )) == null ? '' : __t) +
'">\n				<img class="item__image" src="' +
((__t = ( media.m )) == null ? '' : __t) +
'" alt="' +
((__t = ( title )) == null ? '' : __t) +
'">\n			</a>\n		</div>\n		<div class="col-xs-12 col-sm-8">\n			<div class="item__description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n			<div class="item__tags">\n			       ';
 for(var tag in tags_list) { ;
__p += '\n        				<a class="btn btn-warning" href="#search/' +
((__t = ( tags_list[tag] )) == null ? '' : __t) +
'">' +
((__t = ( tags_list[tag] )) == null ? '' : __t) +
'</a>\n       				';
 } ;
__p += '\n  			</div>\n		</div>\n	</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["item-empty-state.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="empty">\n	<div class="empty__image"></div>\n	<div class="empty__message text-center">	\n		<h3>Nothing in here, try another search</h3>\n		<p>Type in keyword inside the search box at the top<br/><!--\n		-->or check this one out <span class="item__tags"><a class="btn btn-warning" href="#search/potato" title="Potato">Potato</a></span></p>\n	</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["item-initial-state.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="page-header">\n	<div class="row">\n		<div class="col-xs-8 vcenter">\n			<h1>Flickr public feed</h1>\n		</div><!--\n		--><div class="col-xs-4 vcenter text-right">\n			<div id="search">\n				<input class="form-control" type="text" name="search" placeholder="search..."/>\n			</div>\n		</div>\n	</div>\n</div>\n<div class="page-content">\n	<div id="results"></div>\n	<div id="more"><button class="btn btn-default btn-lg btn-block">Show more</button></div>\n</div>';

}
return __p
}})();