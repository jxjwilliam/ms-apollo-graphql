import { gql } from '@apollo/client'

const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
      books {
        title
      }
    }
  }
`

const GET_AUTHOR = gql`
  query ($id: ID!) {
    author(id: $id) {
      id
      name
      books {
        title
      }
    }
  }
`

const ADD_AUTHOR = gql`
  mutation($author: AuthorInput) {
    add_author(author: $author) {
      id
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation($id: ID!, $author: AuthorInput) {
    edit_author(id: $id, author: $author)
  }
`

const DELETE_AUTHOR = gql`
  mutation($id: ID!) {
    delete_author(id: $id)
  }
`

export {
  GET_AUTHORS,
  GET_AUTHOR,
  ADD_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
}
