var UserModel = require('../models/user');

exports.index = (req, res,next) => {
    UserModel.findById(req.session.userId)
                .populate('courses')
                .exec((err, users)=> {
                    console.log(users)
                    return res.render('users', {title:'Users',data:users});
    })
}

exports.createUser = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        res.render('signup',{message:"Enter an email address and/or password"})
    }
    else{
        var email = req.body.email
        var password = req.body.password
        if(req.body.name)
            var name = req.body.name

        UserModel.findOne({email:email},(err,user) => {
            if (user){
                return res.render('signup',{message:"User with that email already exists"})
            }
            else{
                var user = new UserModel({
                    'email':req.body.email,'password':req.body.password,'name':req.body.name
                })

                user.save((err,data)=>{
                    console.log('$$$$$$$$$$$$ Data $$$$$$$$$$$$$$$')
                    console.log(data);
                    //if(err) next(new Error(err));
                    if(data){
                        req.session.userId = data._id;
                        req.session.name = data.name || '';
                        console.log("printing req.session ############################################################")
                        console.log(req.session)
                        return res.redirect('/');
                    }
                    else{
                        return res.render('signup',{message:'An error occured try again'})
                    }
                })
            }
        })
    };
}
exports.renderSignup = (req,res,next)=>{
    res.render('signup')
}
exports.checkUser = (req,res,next)=>{
    UserModel.findOne({email:req.body.email},(err, user)=>{
        if(err)
            next(err);
        else if(user){
            if(req.body.password == user.password){
                req.session.userId = user._id;
                req.session.name = user.name;
                return res.redirect('/');
            }
        }
        res.render('signin',{message:"Wrong password or username"});
    })
};
exports.renderSignin = (req,res,next)=>{
    res.render('signin')
}
exports.killSession = (req,res,next)=>{
    req.session = null;
    return res.render('signin',{message:"Succesfully logged out"})
}
