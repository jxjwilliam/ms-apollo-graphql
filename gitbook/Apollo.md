### Apollo Server

---

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

### async, await

---

- `async/await` works with most loops, but won’t work with loops that require a callback.
- For example, `for()`, `for-of` works, but `forEach`, `map`, `filter`, and `reduce` NOT.
- `forEach` is not promise-aware. It cannot support `async` and `await`. You cannot use `await` in `forEach`.
- `map`:

  ```text
  const promises = ary.map(async item => Promise.resolve(item))

  await Promise.all(promises)
  ```

### Key Takeaways

1. If you want to execute `await` calls in series, use a `for-loop` (or any loop without a callback).
1. Don’t ever use `await` with `forEach`. Use a `for-loop` (or any loop without a callback) instead.
1. Don’t `await` inside `filter` and `reduce`. Always `await` an array of promises with `map`, then `filter` or `reduce` accordingly.

### Sequelize

---

bin/init_db.sh:

```shell script
$ npm install -g sequelize-cli
```

- create
- update, save
- findAll
- findByPk
- findOne
- findOrCreate
- findAndCountAll
- count
- max
- min
- sum

### Reference

1. apllographql `fullstack-tutorial` [final branch](https://github.com/apollographql/fullstack-tutorial)
2. [graphql-bookstore](https://github.com/nareshbhatia/graphql-bookstore)

### Steps

- utils.js
- databases/
- resolver.js
- schema.js
- server.js

1. Setup DB, here is `sqlite3`: Not use `sequelize init` to create `configs/` and `models/` folders, just a simple `utils.js`
2. create models: `define` Sqlite3-Schema in `utils.js`
3. inside `databases/` folder, extends `apollo-datasource` class to implement `crud`
4. define apollo-server `schema.js`, mapping `utils.js` sqlite3 schema.
5. define `resolver.js`, associate databases-middleware with schema/utils.
6. inject to apollo-server: {typeDefs, resolvers, datasources}
7. test
