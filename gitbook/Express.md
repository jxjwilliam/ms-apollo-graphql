### Features

- `express-graphql`-server + `@apollo/federation`-gateway together
- sqlite3
- crud: useQuery, useMutation
- .gql + `graphql.macro`
- react-hook-form
- dayjs
- faker.js
- material-ui data-grid

### How to put several graphql-query in a .gql file ?

```gql
query {
	Posts {
		id
		title
		description
		createDate
		author
	}
}

mutation {
	createPost(
		title: "Mi primer Post"
		description: "en mi primer post tengo que la vida no es facil"
		createDate: "25-09-2019"
		author: "Jesus GIlbert"
	) {
		id
		title
		description
		createDate
		author
	}
}

mutation {
	updatePost(
		id: 2
		title: "Mi segundo Post"
		description: "en mi primer post tengo que la vida no es facil"
		createDate: "26-09-2019"
		author: "Jesus GIlbert"
	)
}

mutation {
	deletePost(id: 1)
}
```


### graphql.macro

```javascript
import { loader } from 'graphql.macro'
/**
 * { "kind": "Document",
		"definitions": [{kind: "OperationDefinition", operation: "query", variableDefinitions: Array(0), directives: Array(0), ...}],
		"loc": {...} }
 * When put all query/mutation in .gql file, throw errors.
 * 	<DataPrint data={data.Blogs} />
 */
const query = loader('./blog.gql')
```
