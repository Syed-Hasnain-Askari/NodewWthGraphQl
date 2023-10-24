const CourseModel = require('../models/course');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
//GET All courses
const getAllCourses = async () => {
	try {
	  const courses = await CourseModel.find()
	  if (courses.length > 0) {
		return courses;
	  } else {
		throw new Error("No courses found");
	  }
	} catch (error) {
	  throw error;
	}
  };
  
// Get a course by ID
const getCourseById = async (id) => {
	try {
	  if (!ObjectId.isValid(id)) {
		return null;
	  }
	  const course = await CourseModel.findById(id);
	  if (course) {
		return course;
	  } else {
		throw new  Error("Invalid course Id")
	  }
	} catch (error) {
	  throw error;
	}
  };
const updateCourseById = async (id,courses) => {
	try{
		const result = CourseModel.findByIdAndUpdate(id,courses,{new:true})
		if(!result){
			throw new  Error("Invalid course Id")
		}
		else{
			return result
		}

	}
	catch(error){
		throw error
	}
}
const deleteCourseById = async (id) => {
	try{
		const result = await CourseModel.findByIdAndDelete(id)
		console.log(result,"result-===========>")
		if(!result){
			throw new  Error("Invalid course Id")
		}
		else{
			return result
		}

	}
	catch(error){
		throw error
	}
}
// Get courses by topic
const getCoursesByTopic = async (topic) => {
	try {
		const courses = await CourseModel.find({ topic });
		return courses;
	} catch (error) {
		throw error;
	}
};
// Insert a new course
const insertCourse = async (courseData) => {
	console.log(courseData, 'courseData controller');
	try {
		const newCourse = new CourseModel(courseData);
		const savedCourse = await newCourse.save();
		return savedCourse
	} catch (error) {
		throw error;
	}
};
module.exports = {
	getAllCourses,
	getCourseById,
	deleteCourseById,
	updateCourseById,
	getCoursesByTopic,
	insertCourse,
};
