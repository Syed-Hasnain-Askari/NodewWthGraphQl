const typeDefs = `
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
  type User {
    email: String
    password: String
  }
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }
  type Mutation {
    insertCourse(id: Int, title: String, author: String, description: String, topic: String, url: String): Course
    signUp(email:String!,password:String!): User
  }
`;
module.exports = {
	typeDefs,
};
