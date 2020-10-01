import { gql } from '@apollo/client'

const GET_BOOKS = gql`
  query {
    books {
      id
      name
    }
  }
`

const GET_BOOK = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
    }
  }
`

const ADD_BOOK = gql`
  mutation($book: BookInput) {
    add_book(book: $book)
  }
`

const UPDATE_BOOK = gql`
  mutation($id: ID!, $book: BookInput) {
    edit_book(id: $id, book: $book)
  }
`

const DELETE_BOOK = gql`
  mutation($id: ID!) {
    delete_book(id: $id)
  }
`


export {
  GET_BOOKS,
  GET_BOOK,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
}
