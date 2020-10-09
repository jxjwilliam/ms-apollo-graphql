const express = require('express')
const { graphqlHTTP } = require('express-graphql')

// directly access by frontend-react
const cors = require('cors')
const typeDefs = require('./schema')

require('dotenv').config()

const { EXPRESS_GRAPHQL_PORT: port } = process.env

const app = express()

app.use(cors({}))

app.use('/express', (req, res) => {
	res.status(200).send('YOU CALL REST /express')
})

// http://localhost:8626/graphql
app.use(
	'/graphql',
	graphqlHTTP({
		schema: typeDefs.schema,
		// rootValue: root,
		graphiql: true,
	})
)

app.listen(port, () => {
	console.log(`🚀 Running a GraphQL API server at http://localhost:${port}/graphql`)
})
