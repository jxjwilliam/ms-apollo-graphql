[Apollo Server](https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-express/src/ApolloServer.ts)

```text
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

###

- `sequelize` not found

bin/init_db.sh:

```text
npm install -g sequelize-cli
```

### async

- `async/await` works with most loops, but won’t work with loops that require a callback.
- For example, `for()`, `for-of` works, but `forEach`, `map`, `filter`, and `reduce` NOT.
- `forEach` is not promise-aware. It cannot support `async` and `await`. You cannot use `await` in `forEach`.
- `map`:
	```javascript
	const promises = ary.map(async item => Promise.resolve(item))

	await Promise.all(promises)
	```


### Key Takeaways

1. If you want to execute `await` calls in series, use a `for-loop` (or any loop without a callback).
1. Don’t ever use `await` with `forEach`. Use a `for-loop` (or any loop without a callback) instead.
1. Don’t `await` inside `filter` and `reduce`. Always `await` an array of promises with `map`, then `filter` or `reduce` accordingly.
```
