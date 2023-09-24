const CourseModel = require('../models/course');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
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
		console.log("Course not found");
		return null; // Return null or throw an error as needed
	  }
	} catch (error) {
	  throw error;
	}
  };
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
		return savedCourse;
	} catch (error) {
		throw error;
	}
};
module.exports = {
	getCourseById,
	getCoursesByTopic,
	insertCourse,
};
