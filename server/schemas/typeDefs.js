const { gql } = require('apollo-server-express');

const typeDefs = gql`
input BookInput {
authors: [String]
description: String
bookId: ID!
image: String
link: String
title: String
}
type User {
id: ID
username: String
email: String
bookCount: Int
savedBooks: [Book]
}
type Book {
authors: [String]
description: String
bookId: ID!
image: String
link: String
title: String
}
type Auth {
token: ID!
user: User
}
type Query {
me: User
}
type Mutation {
login(email: String!, password: String!): Auth
addUser(username: String!, email: String!, password: String!): Auth
saveBook(input: BookInput): User
removeBook(bookId: ID!): User
}
`;
module.exports = typeDef