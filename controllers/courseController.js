var CourseModel = require('mongoose').model('Course'),
    UserModel = require('mongoose').model('User');

//Display list of all courses
exports.index  =    (req,res,next)=>{
    if(!req.session.userId){
        return res.redirect('/unauthorized')
    }
    CourseModel.find({profesor:req.session.userId},(err,courses)=>{
        if(err) return next(err);
        return res.render('index',{name:req.session.name,courses:courses})
    })
}

exports.addCourse = (req,res,next)=>{
    if(!req.session.userId){
        return res.redirect('/unauthorized')
    }else{
        var title = req.body.title,
            code  = req.body.code,
            course = new CourseModel({  title:title,
                                        code:code,
                                        profesor:req.session.userId
                                    });
        course.save((err,data)=>{
            if(err)
                return next(err);
            UserModel.findByIdAndUpdate(req.session.userId, { $push: {courses: data._id}},(err)=>{
                //console.log(user);
                return res.redirect('/');
            })
        });
    }
}

exports.showCourse = (req,res,next)=>{
    if(!req.session.userId){
        return res.redirect('/unauthorized')
    }
    CourseModel.findOne({profesor:req.session.userId, code:req.params.id}, (err,course)=>{
        req.session.courseId = course._id
        return res.render('course', {name:req.session.name,course:course})
    })
}

exports.createStudent = (req,res,next)=>{
    if(!req.session.userId){
        return res.redirect('/unauthorized')
    }
    if(req.session.courseId){
        var student = {name:req.body.name};
        CourseModel.findById(req.session.courseId,(err,course)=>{
            if(err) return next(err)
            course.addStudent(student);
            course.allPresent();
            course.save();
            return res.redirect(`/courses/${req.params.id}`)
        })
    }
}

exports.deleteAllStudents = (req,res,next)=>{
    if(!req.session.userId){
        return res.redirect('/unauthorized')
    }
    if(req.session.courseId){
        CourseModel.findById(req.session.courseId,(err,course)=>{
            if(err) return next(err)
            course.deleteAllStudents()
            course.save();
            console.log('this far')
            return res.redirect(`/courses/${req.params.id}`)
        })
    }
}
