### useQuery, useLazyQuery, useStaticQuery

---

1. no robomongo, mysql workbench tools
2. const {loading, error, data} = useQuery(gql, {variables})
3. similar with `useContext`

### useRef, useCallback, useMemo, useReducer

---

```text
const inputEl = useRef(null)

const onButtonClick = () => {
  inputEl.current.value
}

<input ref={inputEl} type='text'/>
<button onClick={onButtonClick}>Click</button>
```

### useMutation

---
