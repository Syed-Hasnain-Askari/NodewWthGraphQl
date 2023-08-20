const CourseModel = require('../models/course');

// Get a course by ID
const getCourseById = async (id) => {
	try {
		const course = await CourseModel.findOne({ id });
		return course;
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
