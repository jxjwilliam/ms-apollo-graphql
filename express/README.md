[Apollo Server](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-express/src/ApolloServer.ts)

```javascript
for (const [name, value] of Object.entries(option.headers)) {
	res.setHeader(name, value)
}


function getMiddleware({
	path, cors, bodyParser
} = {}) {
	const router = express.Router();
	router.use(path, (_req, _res, next) => {
		Promise.resolve().then(() => next()).catch(next)
	})
}
```
