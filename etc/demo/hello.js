#! /usr/bin/env node

const { graphql, buildSchema } = require('graphql')

// 使用 GraphQL Schema Language 创建一个 schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// root 提供所有 API 入口端点相应的解析器函数
const root = { hello: () => 'Hello world!' }

// run: node hello.js
graphql(schema, '{ hello }', root).then(response => {
	console.log(response)
})
