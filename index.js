const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs } = require('./graphql/schema/index');
const { resolvers } = require('./graphql/resolvers/index');

const app = express();
const port = process.env.PORT || 3977;
// MongoDB setup
mongoose.connect('mongodb://localhost:27017/graphqlDatabase', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
// Enable CORS
app.use(cors());
// GraphQL setup
const executableSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});
// Entrypoint
app.use(
	'/graphql',
	graphqlHTTP({
		schema: executableSchema,
		graphiql: true, // Enable the GraphiQL UI for testing
	})
);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
