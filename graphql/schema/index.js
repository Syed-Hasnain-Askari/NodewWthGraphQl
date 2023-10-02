const typeDefs = `
  type Course {
    id: String
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
  type authData {
    userId:String
    token:String
    tokenExpiration:Int
  }
  type User {
    email: String
    password: String
  }
  type Query {
    course(id: String!): Course
    courses(topic: String): [Course]
    login(email:String!,password:String!): authData
  }
  type Mutation {
    insertCourse(id: Int, title: String, author: String, description: String, topic: String, url: String): Course
    updateCourse(id: String, title: String, author: String, description: String, topic: String, url: String): Course
    deleteCourse(id: String): String
    signUp(email:String!,password:String!):User
  }

  `;
module.exports = {
	typeDefs,
};
