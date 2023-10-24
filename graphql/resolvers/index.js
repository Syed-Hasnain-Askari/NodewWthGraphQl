const courseController = require('../../controller/courses');
const userController = require('../../controller/auth');
const resolvers = {
	Query: {
		course: (_, args) => courseController.getCourseById(args.id),
		getCourseByTopic: (_, args) => {
			if(!req.isAuth){
				throw new Error("Unauthorized")
		   }
		   else{
			   return courseController.getCoursesByTopic(args.topic)
		   }
		},
		getCourses:(_,) =>{return courseController.getAllCourses()   
		},
		login: (_, args) => userController.login(args.email,args.password)
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
		updateCourse: async (_, args) => {
			const newCourse = {
				title: args.title,
				author: args.author,
				description: args.description,
				topic: args.topic,
				url: args.url,
			};
			const result = await courseController.updateCourseById(args.id,newCourse);
			return result;
		},
		deleteCourse: async (_, args) => {
			courseController.deleteCourseById(args.id);
			return "Course has been deleted";
		},
		signUp: async (_, args) => {
			const user = {
				email: args.email,
				password: args.password,
			};
			const result = await userController.signUp(user);
			return result
		},
	},
};
module.exports = { resolvers };
