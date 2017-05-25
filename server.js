// To use a firebase service
//Authentication firebase.auth()  
// Realtime Database firebase.database()  
// Write to database
		//db.push({name:'RodneyOssai',
		//email:'ossai2007@gmail.com',
		//password:'adminpassword'});

//db.once('value')
//	.then(function(snap){				-- Read from darabase
//		console.log(snap.key);
//		console.log(snap.ref.toString());
//		console.log(snap.val());
//	});

const express = require('express');
const app = express();
const firebase = require("firebase");
const port = process.env.PORT || 9201; 
const bodyParser = require('body-parser');

//Start Up Firebase
const config = {
    apiKey: "AIzaSyA1n8kU_Xkq6sqwMtpbz8yL4xvtQ3PcQOs",
    authDomain: "postit-347ec.firebaseapp.com",
    databaseURL: "https://postit-347ec.firebaseio.com",
    projectId: "postit-347ec",
    storageBucket: "postit-347ec.appspot.com",
    messagingSenderId: "424867635563"
  };
firebase.initializeApp(config);
let db = firebase.database();
module.exports = db;

// body parser, to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//Setting up routes

var routes = require('./server/postItRouteModule.js')
app.use('/',routes )

app.get('/', function(req, res) {
	res.send('welcome to the home page!');
});

//Starting the server	
app.listen(port, () => {
  console.log('We are live on ' + port );
});
