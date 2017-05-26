// PostIt.js - PostIt routes module

const express = require('express')
const router = express.Router();
const db  = require('../server')
const firebase = require("firebase");
usersRef = db.ref('users')
groupsRef = db.ref('group')

// Home page route

router.get('/', (req, res) => {
  res.send('PostIt Home Page')
})

router.route('/user/signup')
	 //create a user
  .post((req, res) => {
  		const user = {	username:req.body.username,  // Create and object named users and populate it manually using contents of the document body
						password:req.body.password, 
						email:req.body.email 
					};
					firebase.auth().createUserWithEmailAndPassword(user.email, user.password) // Create account with firebase using object values
	.then(userRecord => {        
			user.uid = userRecord.uid;  // Push the UserID into the user object
			let userID = userRecord.uid
			usersRef.update({[userID] :user}); //Push to the database using uid as key
			res.send(user) })
	.catch(error => {
			res.json({ message: error.message});
    })
  })

router.route('/user/signin')
    //Sign into the application
	 .post((req, res) => {
			let email = req.body.email; 
			let password = req.body.password;			
			firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
			res.json({ message: "Success: Logged In."});
		})
		.catch(error => {
			res.json({ message: error.message});
   })
 })

//Create Broadcast Group
firebase.auth().onAuthStateChanged(user => {
	if (user){
		router.route('/group')
			.post((req, res) => {
				let groupName = req.body.groupName;
				let groupDescription = req.body.groupDescription;
				let groupCreator = user.uid; //UserID of the group creator goes in here and is pushed in as first member
				groupsRef.push({name:groupName,Description:groupDescription,members:{groupCreator}});
				res.send(`You just Successfully created ${groupName}.`)				
			})
	}else{

		const message ="Please login to create a group.";
		message;
	}
 })
// Add Members Route

firebase.auth().onAuthStateChanged(user => {
	if (user){
		router.route('/group/:groupId/user')
			.post((req, res,firebase) => {
				
			})
	}else{
			//Execute failure condition
	}
 });
module.exports = router;