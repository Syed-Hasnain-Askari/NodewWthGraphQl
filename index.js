'use strict';
const mongoose = require('mongoose');
const app = require('./app');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const port = 3977;
// In-memory data store
const data = {
	coursesData: [
		{
			id: 1,
			title: 'The Complete Node.js Developer Course',
			author: 'Andrew Mead, Rob Percival',
			description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
			topic: 'Node.js',
			url: 'https://codingthesmartway.com/courses/nodejs/',
		},
		{
			id: 2,
			title: 'Node.js, Express & MongoDB Dev to Deployment',
			author: 'Brad Traversy',
			description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
			topic: 'Node.js',
			url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
		},
		{
			id: 3,
			title: 'JavaScript: Understanding The Weird Parts',
			author: 'Anthony Alicea',
			description:
				'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
			topic: 'JavaScript',
			url: 'https://codingthesmartway.com/courses/understand-javascript/',
		},
	],
};
// Schema
const typeDefs = `
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
`;
const getCourse = function (args) {
	var id = args.id;
	return data.coursesData.filter((course) => {
		return course.id == id;
	})[0];
};

const getCourses = function (args) {
	if (args.topic) {
		var topic = args.topic;
		return data.coursesData.filter((course) => course.topic === topic);
	} else {
		return data;
	}
};

var root = {
	course: getCourse,
	courses: getCourses,
};

// Resolver for warriors
const resolvers = {
	Query: {
		course: (obj, args, context) => getCourse(args),
		courses: (obj, args, context) => getCourses(args),
	},
};

const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
// mongodb://0.0.0.0:27017/clothingcompany
// useNewUrlParser: true, useUnifiedTopology: true
mongoose
	.connect('mongodb://0.0.0.0:27017/clothingcompany')
	.then(() => {
		try {
			console.log('connection successfully !');
			app.use(bodyParser.json());
			// Enable CORS policy
			app.use(cors());
			app.options('*', cors());
			app.use(cors());
			app.use(bodyParser.urlencoded({ extended: false }));
			app.use(bodyParser.json());

			// Entrypoint
			app.use(
				'/graphql',
				graphqlHTTP({
					schema: executableSchema,
					rootValue: root,
					graphiql: true,
				})
			);

			app.listen(port, () => {
				console.log(`Running a server at http://localhost:${port}`);
			});
		} catch (err) {
			console.log('err', err);
		}
	})
	.catch((err) => {
		console.log('err', err);
	});
