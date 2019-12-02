var express = require('express');
var router = express.Router();

//require controllers
var user_controller = require('../controllers/userController');
/* GET home page. */

router.get('/', function(req, res) {
    if(req.session.userId){
        return res.redirect('/courses');
    }else {
        return res.redirect('/signin');
    }
});

router.get('/unauthorized',(req,res)=>{
    res.render('signin',{message:'You have to log in to access that data'})
})

router.get('/signup',user_controller.renderSignup);
router.post('/signup',user_controller.createUser);

router.get('/signin',user_controller.renderSignin);
router.post('/signin',user_controller.checkUser);

router.get('/signout',user_controller.killSession);

module.exports = router;
