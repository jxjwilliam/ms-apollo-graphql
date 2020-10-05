#!/usr/bin/env node

const { createStore } = require('../src/utils')

const books = []

const { Book } = createStore()

Book.sync({ force: false })
  .then(async () => {
    for (const book of books) {
      await Book.create(book)
    }
  })
  .then(() => {
    console.log('Sync table and Seed Book successfully.')
  })
  .catch(err => console.error(err))
