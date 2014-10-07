
var express = require('express');
var router = express.Router();
var mg = require('mailgun');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { 
		title: 'Express', 
		csrfToken: req.csrfToken() 
	});
});

router.post('/contact', function(req, res){
	console.log(req.body)
	var name = req.body.name,
	    email = req.body.email,
	    message = req.body.message
			mailgun = new mg.Mailgun(process.env.MAILGUNKEY);

  mailgun.sendText('ryan@ryanjurgensen.com', 
  	['ryan@ryanjurgensen.com'], 
  	'New lead from website', 
  	'Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message,
  	function(err) {
	  	if(err) res.send(500)
	  	res.send(200)
  });
});
module.exports = router;
