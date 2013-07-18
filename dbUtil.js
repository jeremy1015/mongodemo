var mongodb = require('mongodb');
var qmongo = require('q-mongodb');
var Q = require("q");
var _ = require("lodash");

var mongoUri = "mongodb://localhost/jeremy";
var mongoserver = new mongodb.Server("localhost", mongodb.Connection.DEFAULT_PORT),
    db_connector = new mongodb.Db("jeremy", mongoserver);

exports.ObjectID = mongodb.ObjectID;

exports.testMongo = function(req,res){
	db_connector.open(function(err, db){
		db.collection("testtable", function(err,collection){
			collection.find().toArray(function(err, results){
    			res.send(results);
			});
		});
	});
};

exports.qmongoExample = function(req,res){
	qmongo.connect(mongoUri)
		.invoke('collection', "testtable")
		.invoke('find', {})
		.invoke('toArray')
		.then(function(array){
		    res.send(array);
		});
};

exports.listCDs = function(req,res){
	qmongo.connect(mongoUri)
		.invoke('collection', "cd")
		.invoke('find', {})
		.invoke('toArray')
		.then(function(array){
		    res.send(array);
		});
};

exports.queryCDsBySong = function(req,res,artist){
	qmongo.connect(mongoUri)
		.invoke('collection', "cd")
		.invoke('find', {})
		.invoke('toArray')
		.then(function(array){
		    res.send(array);
		});
};

exports.queryCDsByTitle = function(req,res){
	var pattern = new RegExp(".*" + req.query.title + ".*", "i");
	qmongo.connect(mongoUri)
		.invoke('collection', "cd")
		.invoke('find', { title: pattern})
		.invoke('toArray')
		.then(function(array){
		    res.send(array);
		});
};

exports.createCD = function(req,res){
	qmongo.connect(mongoUri)
		.invoke('collection', "cd")
		.invoke('insert',req.body,{safe:true})
		.then(function(data){
			res.send(data);
		 });
};

exports.updateCD = function(req,res){
	var json = req.body;
	delete json._id;

	qmongo.connect(mongoUri)
		.invoke('collection', "cd")
		.then(function(collection){
		   return collection.findAndModify({_id:new mongo.ObjectID(req.params.id)},"_id",{$set: json},{new:true,safe:true});
		})
		.then(function(data){
			res.send(data);
		});
};
