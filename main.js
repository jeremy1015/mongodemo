var express = require('express')
  , http = require('http')
  , path = require('path');

var _ = require('lodash');
var dbUtil = require('./dbUtil.js');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  //app.use(express.logger('dev'));
  app.use(express.limit('1gb')); // limit download size to 1gb
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/holla', function(req, res){
	res.send("I ain't no holla back girl");
});

app.get('/rest/testmongo', function(req,res){
	dbUtil.testMongo(req,res);
});

app.get('/rest/qmongo', function(req,res){
	dbUtil.qmongoExample(req,res);
});

app.get('/rest/cd', function(req,res){
	if (req.query.song){
		dbUtil.queryCDsBySong(req,res);
	}else if (req.query.title){
		dbUtil.queryCDsByTitle(req,res);
	}else{
		dbUtil.listCDs(req,res);
	}
});

app.post('/rest/cd', function(req,res){
	dbUtil.createCD(req,res);
});

app.put('/rest/cd/:id', function(req,res){
	dbUtil.updateCD(req,res);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});