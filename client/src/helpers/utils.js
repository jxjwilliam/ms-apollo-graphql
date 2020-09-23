import React from 'react'

function DataPrint({ data }) {
  return (
    <pre style={{ textAlign: 'initial' }}>
      <code>
        {JSON.stringify(data, null, 4)}
      </code>
    </pre>
  );
}

export {
  DataPrint
}