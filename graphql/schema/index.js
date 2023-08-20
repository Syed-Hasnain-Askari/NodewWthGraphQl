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
  type Mutation {
    insertCourse(id: Int, title: String, author: String, description: String, topic: String, url: String): Course
  }
`;
module.exports = {
	typeDefs,
};
