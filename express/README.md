[Apollo Server](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-express/src/ApolloServer.ts)

```javascript
for (const [name, value] of Object.entries(option.headers)) {
	res.setHeader(name, value)
}

function getMiddleware({ path, cors, bodyParser } = {}) {
	const router = express.Router()
	router.use(path, (_req, _res, next) => {
		Promise.resolve()
			.then(() => next())
			.catch(next)
	})
}
```

### SDL, GQL

---

[3 ways to represent graphql schema](https://www.apollographql.com/blog/three-ways-to-represent-your-graphql-schema-a41f4175100d/)

- The GraphQL Schema Definition Language, or SDL
- The GraphQL introspection query result
- The GraphQL.js GraphQLSchema object


- The `buildSchema` function takes a schema in `SDL` (schema definition language) and returns a `GraphQLSchema` object. 
- If you want to utilize `SDL` to generate your schema, you should instead use graphql-tools' `makeExecutableSchema`.
- `makeExecutableSchema` allows you to define a schema using SDL, while also providing a separate `resolvers` object.
```javascript
const typeDefs = `
  type Query {
    hello: String
  }
`
const resolvers = {
  Query: {
    hello: () => 'Hello!',
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })
```