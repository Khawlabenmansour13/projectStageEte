const Course =  require('../Model/course.model');
const Section =  require('../Model/section.model');
const User =  require('../Model/user.model');

/************************ Add Course ****************************/

exports.addCourse = async function(req,res,next) {

    var  creationDate = new  Date();
      let course  = new Course ({

        title: req.body.title,
        creationDate: creationDate,
        description: req.body.description,
        categories: req.body.categories,
     
          
        
    
      })
      course.save(function(err,data) {
        if(err){
          next(err);
      }
          else {
            res.json({success:true , message :"course added successfully",data: data});

          }
      });




}
 
    /****************** Get all courses *****************/
    exports.getAllCourses= async function(req, res, next) {
  
      try {
       await Course.find({}).exec(function(err,data){
              if(err) return next(err);
              else
              res.status(200).json({sucess: "OK",data: data});
  
        }) ;
    
      }catch(error) {
        next(error)
      }
    
    
    };
  //a faire  : getCourseById , deleteCourse, UpdateCourse,affecterCourseSection 
