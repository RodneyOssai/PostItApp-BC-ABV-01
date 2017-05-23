// PostIt.js - PostIt routes module

let express = require('express')
let router = express.Router();
var db  = require('../server')

// Home page route
router.get('/', function (req, res) {
  res.send('PostIt Home Page')
})
router.route('/user/signup')
	 //create a user
  .post(function(req, res) {
    var user = {};
    user.username = req.body.name;
    user.password =req.body.password;
    user.email = req.body.email;
        db.push({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      
    }).then(function() {
        res.json({ message: "Success: User created."});
    }).catch(function(error){
      res.json({ message: error.message});
    })
  })


// DashBoard page route
router.get('/dashboard', function (req, res) {
  res.send('if you sucessfully sign up')
})



module.exports = router;