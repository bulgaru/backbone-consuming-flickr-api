# backbone-consuming-flickr-api
Backbone app that consumes Flickr photos public API (https://www.flickr.com/services/feeds/docs/photos_public/)

###Try it out
[Live demo](http://www.crql.net/backbone/)

###The app is designed with the following functionality in mind:
- it should consume public photos using the Flickr public API
- it should be able to render a view with the list of all the fetched items
- it should be able to show a detailed view of each item from the list
- it should provide search functionality by fetching new lists based on searched tag

###The following libraries were used:
- [jQuery](https://jquery.com/)
- [Underscore.js](http://underscorejs.org/)
- [Backbone.js](http://backbonejs.org/)
- [Backbone Paginator](https://github.com/backbone-paginator/backbone.paginator) for splitting items into pages
- [Moment.js](http://momentjs.com/) for date formatting
- [Bootstrap](http://getbootstrap.com/) for styling
 
###The following tools were used
- [Gulp.js](http://gulpjs.com/) as task runner
- [BrowserSync](https://www.browsersync.io/) in order to inject code directly into browser
- [Karma](https://github.com/karma-runner/karma) as test runner
- [Jasmine](http://jasmine.github.io/2.4/introduction.html) as testing framework
 
###The repository contains:
| What                | Where                                 |
| ------------------- | ------------------------------------- |
| production code     | [/dist/*](/dist/)                   |
| JS libraries        | [/src/libraries/*](/src/libraries/) |
| SCSS (w/ Bootstrap) | [/src/scss/*](/src/scss/)           |
| app templates       | [/src/templates/*](/src/templates/) |
| app code            | [/src/app/*](/src/app/)             |
| tests               | [/tests/*](/tests/unit/)            |
| gulp config         | [/gulpfile.js](/gulpfile.js)        |
| karma config        | [/karma.conf.js](/karma.conf.js)    |

###Getting started
Here are the following steps to get you started
- download this project
- open the command line tool and browse to the project directory
- assuming you have Node.js in place, set up Gulp and necessary plugins inside your project using the command:

`npm install --save-dev gulp browser-sync gulp-sass gulp-notify gulp-autoprefixer gulp-minify-css gulp-concat gulp-uglify gulp-template-compile`
- set up Karma server with Jasmine and Phantom.js browser:

`npm install --save-dev karma karma-jasmine karma-phantomjs-launcher karma-spec-reporter karma-jasmine-jquery`


If you would like to try out the application, you can:
- open index.html file to launch the application
- fire `gulp` (default task) command to initiate build process. All application files modified inside the src/* and src/templates/* will automatically compile into production code.
- fire `gulp test` (test task) command to do a one time pass through all the provided tests.
- fire `gulp tdd` (test-driven development task) command to test your application after each new build.

###Troubleshooting
- there may be issues related to BrowserSync setup. If you are unfamiliar with BrowserSync and would like to know more about it, go [here](https://www.browsersync.io/docs/). Otherwise, you can comment off the BrowserSync task inside the gulpfile.js
