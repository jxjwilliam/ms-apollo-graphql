const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const { buildFederatedSchema } = require("@apollo/federation");
const schema = require('./blog/schema')

require('dotenv').config()

const { EXPRESS_GRAPHQL_PORT: port } = process.env

const app = express()

app.use(cors())

// GraphiQL is on http://localhost:8069/graphql
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema.schema,
		// rootValue: root,
		graphiql: true,
	})
)

app.listen(port, () => {
	console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
})
