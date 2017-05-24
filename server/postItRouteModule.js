// PostIt.js - PostIt routes module

let express = require('express')
let router = express.Router();
let db  = require('../server')
let firebase = require("firebase");

// Home page route
router.get('/', function (req, res) {
  res.send('PostIt Home Page')
})
router.route('/user/signup')
	 //create a user
  .post(function(req, res) {
	var users = {	username:req.body.username,
					password:req.body.password, 
					email:req.body.email 
					};
	firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
			.then(function(userRecord) {
    // A UserRecord representation of the newly created user is returned
			users.uid = userRecord.uid;
			res.send(users)
			db.push({users}).set({users});
  }).catch(function(error){
      res.json({ message: error.message});
    })
  })
  
 router.route('/user/signin')
	 //Sign into the application
  .post(function(req, res) {
	let email = req.body.email; 
	let password = req.body.password;			
	firebase.auth().signInWithEmailAndPassword(email,password).then(function() {
        res.json({ message: "Success: Logged In."});
    }).catch(function(error){
      res.json({ message: error.message});
    })
  })
  router.route('/group')
	 //CREATE BROADCAST GROUP
  .post(function(req, res) {
	let email = req.body.email; 
	let password = req.body.password;			
	firebase.auth().signInWithEmailAndPassword(email,password).then(function() {
        res.json({ message: "Success: Logged In."});
    }).catch(function(error){
      res.json({ message: error.message});
    })
  })


// DashBoard page route
router.route('/user/dashboard')
	.get(function (req, res) {
		res.send('if you sucessfully sign up')
	})



module.exports = router;