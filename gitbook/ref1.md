### useHooks

--- 
[useQuery](https://github.com/apollographql/apollo-client/blob/master/src/react/hooks/utils/useBaseQuery.ts)

```text
import React, {useState, useRef, useEffect, useContext} from 'react'
import {useQuery} from 'graphql'

Promise.resolve().then(() => {})

useEffect(() => func({lazy}), [
	queryResult.loading,
	queryResult.error,
	queryResult.data,
	queryResult.networkStatus,
]);


function useDeepMemo(memoFunc, key) {
	const ref = useRef()
	if(!ref.current) ref.curent = {key, value: memoFunc()}
	return ref.current.value
}


const context = useContext(getApolloContext());
const [result, setResult] = useState({ called: false, loading: false });


// ({data, ...options}) = useQuery();
function Query() {
	const { children, query, ...options } = props;
	const result = useQuery(query, options);
	return children && result ? children(result): null;
}
```

### Material-UI Data-grid

Not fully available.

```javascript
function Datagrid({data: {Posts:rows}}) {
	const columns = [
		{ field: 'id', hide: true },
		{ field: 'title', headerName: '标题', width: 150 },
		{ field: 'author', headerName: '作者', width: 150 },
		{ field: 'createDate', headerName: '日期', width: 150 },
		{ field: 'description', headerName: '内容', width: 450 },
	];
	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} />
		</div>
	)
}
```
