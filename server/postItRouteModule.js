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
router.route('/group')
	.post((req, res) => {
			let groupName = req.body.groupName;
			let groupDescription = req.body.groupDescription; 
			firebase.auth().onAuthStateChanged(user => {
				if (user){
					let groupCreator = user.uid;  //UserID of the group creator goes in here and is pushed in as first member	
					groupsRef.push({name:groupName,Description:groupDescription,members:{groupCreator}});
					res.json({message:`You just Successfully created ${groupName}.`})			
				}else{
					res.send({message:`You must be signed in before you create the group ${groupName}.`})	
				}
			})	
	})
// Add Members Route

router.route('/group/:groupId/user')
.post((req, res) => {
  const groupKey = req.params.groupId;
  firebase.database().ref(`group/${groupKey}/members/`)
  .update({ [req.body.memberId]: req.body.memberId }); //Get the ID of the member you are adding from Document body
  res.send('Successfully added user to the group !!');
});
//Signout 
router.route('/signout')
	.post((req, res) => {
		firebase.auth().signOut().then(() => {
		  res.send({message:`You Have Been Sucessfully Signed out`})
		}).catch(error => {
		  // An error happened.
		});
	})

module.exports = router;