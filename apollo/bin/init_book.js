#!/usr/bin/env node

const { createStore } = require('../src/utils')

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: "Fox in Socks",
    author: "Dr. Seuss",
  },
  {
    title: "San Guo",
    author: "Luo Guan Zhong"
  },
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

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
