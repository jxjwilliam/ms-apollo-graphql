import React from 'react'

export default function ({ error }) {
	return (
		<>
			<h1>Error</h1>
			<div>{JSON.stringify(error, null, 2)}</div>
		</>
	)
}
