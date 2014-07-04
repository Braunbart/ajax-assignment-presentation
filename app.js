var express = require('express')
  , hbs = require('hbs')
  , app = express();
  
// handlebars templates
app.set('views', __dirname + '/templates');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/templates/partials');

// public assets
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function(req, res) {
	res.render('index', {});	
});
app.get('/map-static', function(req, res) {
    if(req.query.tile !== undefined) {
        var imgRow = parseInt(req.query.tile.split("-")[0], 10);
        var imgCol = parseInt(req.query.tile.split("-")[1], 10);
    } else {
        var imgRow = 1;
        var imgCol = 3;
    }
    var mapVars = {
        imgCol: imgCol,
        imgRow: imgRow,
        up: (imgRow-1) + "-" + (imgCol+0),
        down: (imgRow+1) + "-" + (imgCol+0),
        left: (imgRow+0) + "-" + (imgCol-1),
        right: (imgRow+0) + "-" + (imgCol+1)
    }

	res.render('map-static', mapVars);	
});
app.get('/map-dynamic', function(req, res) {
	res.render('map-dynamic');	
});
app.get('/single-page-application', function(req, res) {
	res.render('single-page-application');	
});
app.get('/templates/single-page-application/home', function(req, res) {
	res.render('single-page-application-home');	
});
app.get('/templates/navigation', function(req, res) {
	res.render('single-page-application-navigation');	
});

// start the application
app.listen(8080);
console.log("Express started on port 8080");
