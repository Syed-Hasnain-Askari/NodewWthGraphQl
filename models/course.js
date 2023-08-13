const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	id: Number,
	title: String,
	author: String,
	description: String,
	topic: String,
	url: String,
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
