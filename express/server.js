const express = require('express')
const { graphqlHTTP } = require('express-graphql')

// directly access by frontend-react
const cors = require('cors')
const schema = require('./blog/schema')

require('dotenv').config()

const { EXPRESS_GRAPHQL_PORT: port } = process.env // 8626

const app = express()

app.use(cors())

// GraphiQL is on http://localhost:8626/graphql
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
