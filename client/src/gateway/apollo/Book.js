import { gql } from '@apollo/client'

const GET_BOOKS = gql`
query {
  books {
    id
    title
    desc
  }
}

`

const GET_BOOK = gql`
query($id: ID!) {
  book(id: $id) {
    id
    desc
    title
  }
}

`

const ADD_BOOK = gql`
  mutation($book: BookInput) {
    add_book(book: $book) {
      code
      success
    }
  }
`

const UPDATE_BOOK = gql`
  mutation($id: ID!, $book: BookInput) {
    edit_book(id: $id, book: $book) {
      code
      success
    }
  }
`

const DELETE_BOOK = gql`
  mutation($id: ID!) {
    delete_book(id: $id) {
      code
      success
    }
  }
`


export {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
}
