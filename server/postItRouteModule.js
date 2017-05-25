// PostIt.js - PostIt routes module

let express = require('express')
let router = express.Router();
let db  = require('../server')
let firebase = require("firebase");
usersTable = db.ref('users')
groupsTable = db.ref('group')
// Home page route
router.get('/', function (req, res) {
  res.send('PostIt Home Page')
})
router.route('/user/signup')
	 //create a user
  .post(function(req, res) {
	var users = {	username:req.body.username,  // Create and obkect named users and populate it manually using contents of the document body
					password:req.body.password, 
					email:req.body.email 
					};
	firebase.auth().createUserWithEmailAndPassword(users.email, users.password) // Create account with firebase using object values
			.then(function(userRecord) {                                        // Extract the UserID of the just created user
    // A UserRecord representation of the newly created user is returned
			users.uid = userRecord.uid;  // Push the UserID into the object

			usersTable.set({userID:users}); 
			res.send(users)
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
  
	 //CREATE BROADCAST GROUP
firebase.auth().onAuthStateChanged(function(user) {
	if (user){
		router.route('/group')
			.post(function(req,res){
				let groupName = req.body.groupName;
				let firstMember = 198393938393 //UserID of the group creator goes in here and is pushed in as first member
				groupsTable.push({name:groupName,members:{firstMember}});
				
				res.send("You just Successfully created"+ groupName)
				
				
			})
	}else{
		var message ="Please login to create a group.";
		message;
	}
})
  

// DashBoard page route
router.route('/user/dashboard')
	.get(function (req, res) {
		res.send('if you sucessfully sign up')
	})



module.exports = router;