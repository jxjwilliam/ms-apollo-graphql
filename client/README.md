[useQuery](https://github.com/apollographql/apollo-client/blob/master/src/react/hooks/utils/useBaseQuery.ts)

```javascript
Promise.resolve().then(...)

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


import { useContext, useState, useRef, useEffect } from 'react';
const context = useContext(getApolloContext());
const [result, setResult] = useState({ called: false, loading: false });


// ({data, ...options}) = useQuery();
function Query() {
    const { children, query, ...options } = props;
    const result = useQuery(query, options);
    return children && result ? children(result): null;
}
```
