var express = require('express');

var app = express();

app.disable('x-powered-by');  // prevents head form showing our server properties ...  For security Reasons

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

//MORE IMPORST HERE

app.set('port', process.env.PORT || 3000);  //setting port for localhost

app.use(express.static(__dirname + '/public'));  //for using logo image in bsnavabar.handlebars

app.get('/', function(req, res){  // remeber path is case insensitive
	res.render('home');   // it will render home.handlebars in  main.handlebars
});

app.get('/about', function(req, res){  // remeber path is case insensitive
	res.render('about');   // it will render home.handlebars in  main.handlebars
});

// middleware
app.use(function(req,res,next){                         
	console.log("looking for URL : " + req.url);
	next();
});


app.get('/junk',function(req,res, next){
	console.log('Tried to access /junk');
	throw new Error('/junk does not exit');
});

//middleware
app.use(function(err,req,res,next){
	console.log('Error : ' + err.message);
	next();
});

app.use(function(req,res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
})









app.listen(app.get('port'), function(){
	console.log("Express started on http:localhost:" + app.get('port') + 'Press Ctrl-C to terminate');
});