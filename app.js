var express = require('express');
var log4js = require('log4js');
var http = require('http');
var app = express();
var logger = log4js.getLogger('HelloKube');
var isHealthy = true;

logger.info("Starting...");

setInterval(function(){
	if(isHealthy)
	{
		logger.info("Ola....");
	}
	else
	{
		logger.info("cough...");
	}
},3000);

app.get("/", function(req, res, next){
	logger.info("operation / invoked...");
	res.send("Ola, Estou Vivo!!!");
});

app.get("/env", function(req, res, next){
	res.json(process.env);
});

app.get("/health", function(req, res, next){
	if(isHealthy)
	{
logger.info("operation /health invoked... returning GREEN");
		res.send("GREEN");
	}
	else
	{
logger.info("operation /health invoked... returning RED");
res.status(500).send("RED");
	}
});

app.get("/infect", function(req, res, next){
	logger.info("operation /infect invoked...");
	isHealthy = false;
	res.send("I don't feel that good...");
});

app.get("/kill", function(req, res, next){
	res.send("You are dead...");
	process.exit();
});

var port = process.env.PORT || 8080;

app.listen(port, function(){
	logger.info('HelloKube listening on port ' + port);
});
