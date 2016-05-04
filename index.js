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







app.listen(app.get('port'), function(){
	console.log("Express started on http:localhost:" + app.get('port') + 'Press Ctrl-C to terminate');
});