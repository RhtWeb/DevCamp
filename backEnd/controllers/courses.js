const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getCourses = asyncHandler( async (req, res, next) => {

  if(req.params.bootcampId){
    const courses = await Course.find({ bootcamp : req.params.bootcampId });

    return res.status(200).json({
      success : true,
      count : courses.length,
      data: courses
    });
  } else {
    // query = Course.find().populate("bootcamp", "name description");
    res.status(200).json(res.advancedResults);
  }
});

exports.getCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate("bootcamp", "name description");

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: course
  });
} );

exports.addCourse = asyncHandler( async (req, res, next) => {
  console.log(req.params.bootcampId, req.user.id)
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if(!bootcamp){
    return next(new ErrorResponse(`Bootcamp do not exit with the Id of ${req.params.bootcampId}`), 404);
  }

  // Check the owner of Bootcamp or admin 
  if(bootcamp.user.toString() !== req.user.id && req.user.role !== "admin"){
    return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`, 401));
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
} );

exports.updateCourse = asyncHandler( async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  // Check the owner of Course or admin 
  if(course.user.toString() !== req.user.id && req.user.role !== "admin"){
    return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to update a course  ${course._id}`, 401));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    success: true,
    data: course
  });
} );

exports.deleteCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if(!course){
    return next(new ErrorResponse(`Course do not exit with the Id of ${req.params.id}`), 404);
  }

  // Check the owner of Course or admin 
  if(course.user.toString() !== req.user.id && req.user.role !== "admin"){
    return next(new ErrorResponse(`User of Id ${req.user.id} is not authorized to delete a course  ${course._id}`, 401));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
} );