# Atlas Web GraphQL Project

## Overview

Atlas Web GraphQL is a project that leverages GraphQL to provide a flexible and efficient API for web applications. This project aims to simplify data fetching and manipulation by allowing clients to specify their data requirements precisely.

## Features

- GraphQL API with query, mutation, and subscription capabilities
- User authentication and authorization
- Real-time data updates with GraphQL subscriptions
- Integration with various data sources

## Requirements

- Node.js
- npm or yarn package manager
- MongoDB or another database system supported by Mongoose

## Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/BradenE19/atlas-web_graphql.git](https://github.com/BradenE19/atlas-web_graphql.git)
    ```

2. Navigate to the project directory:
    ```bash
    cd atlas-web_graphql
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/atlas_web
    SECRET_KEY=your_secret_key
    ```

## Usage

Start the development server:

```bash
npm run dev
```

Open your web browser and navigate to `http://localhost:3000/graphql` to access the GraphQL playground.

## Examples

### Query Example

```graphql
{
  users {
    id
    name
    email
  }
}
```

### Mutation Example

```graphql
mutation {
  createUser(input: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123"
  }) {
    id
    name
    email
  }
}
```

### Subscription Example

```graphql
subscription {
  newUser {
    id
    name
    email
  }
}
```

## Challenges

This was my first GraphQL project, so of course challenges included:

1. Learning new programming language.
2. Developing an understanding of how the GraphQL works.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b new-feature`)
3. Make your changes and commit them
4. Push to the branch (`git push origin new-feature`)
5. Create a pull request


## License



## Contact
[LinkedIn](https://www.linkedin.com/in/braden-earnest/)
[Github Repo](https://github.com/BradenE19/atlas-web_graphql)
