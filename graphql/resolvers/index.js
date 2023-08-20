const courseController = require('../../controller/courses');
const userController = require('../../controller/auth');

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
			const result = await courseController.insertCourse(newCourse);
			return result;
		},
		signUp: async (_, args) => {
			const user = {
				email: args.email,
				password: args.password,
			};
			const result = await userController.signUp(user);
			return result;
		},
	},
};

module.exports = { resolvers };
