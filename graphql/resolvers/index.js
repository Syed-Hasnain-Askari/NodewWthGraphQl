const courseController = require('../../controller/courses');

const resolvers = {
	Query: {
		course: (_, args) => courseController.getCourseById(args.id),
		courses: (_, args) => courseController.getCoursesByTopic(args.topic),
	},
	Mutation: {
		insertCourse: async (_, args) => {
			const newCourse = {
				title: args.title,
				author: args.author,
				description: args.description,
				topic: args.topic,
				url: args.url,
			};
			// Save the new course to your data store or database
			// Make sure to handle the insertion logic here

			// After insertion, you can return the updated list of courses
			// Call the insertCourse function from your controller to insert data into MongoDB
			const result = await courseController.insertCourse(newCourse);
			return result;
		},
	},
};

module.exports = { resolvers };
