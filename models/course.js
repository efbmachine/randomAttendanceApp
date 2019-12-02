var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    title:  String,
    code: String,
    profesor: {type:Schema.Types.ObjectId, ref:'User', index:true},
    numberOfSession: {type:Number, default:5},
    students: [{
        name: String,
        attendance: [{date:String,present:Boolean}]
    }]
});



var toDMY = (date)=>{
    return date.getDate()+'/' +date.getMonth()+1 +'/'+date.getFullYear()
}
courseSchema.methods.addStudent = function(student){
    return this.students.push(student);
}

courseSchema.methods.studentPresent = function(student,present){
    var date = toDMY(new Date());
    this.students.forEach(function(student){
        if(student.name==name){

        }
    })
}

courseSchema.methods.allPresent = function(){
    var date = toDMY(new Date());
    console.log(date)
    this.students.forEach(function(student){
        console.log(student.name+':'+student.attendance)
        var here = student.attendance.includes({'date':date,'present':true});
        var notHere = student.attendance.includes({'date':date,'present':false});
        console.log(here)
        console.log(notHere)
        if(here==false && notHere==false){
             student.attendance.push({'date':date,'present':true})
         }
    })
}

courseSchema.methods.deleteAllStudents = function(){
    return this.students = []
}


var Course = mongoose.model('Course', courseSchema);


module.exports = Course
