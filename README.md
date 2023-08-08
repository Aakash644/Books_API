# Books REST API 

This documentation provides information about the Books API built using Node.js, MongoDB, and Express. The API consists of two main endpoints: '/books' and '/authors', each supporting various HTTP methods for CRUD operations.
![api](https://github.com/Aakash644/Books_API/assets/92630714/36661103-a07a-4aa0-8515-72a2ec8f5ba0)


## Prerequisites

To run this API, ensure you have the following installed:

- Node.js
- MongoDB
- Postman


## Installation

1. Clone the repository:
   ```
   git clone <repository_url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the MongoDB connection in the `.env` file:
   ```
   MONGODB_URI=<your_mongodb_uri>
   ```

4. Start the server:
   ```
   node api.js
   ```

## API Endpoints

### `/books`

#### GET `/books`

Retrieve a list of all books.

#### POST `/books`

Create a new book. Send book details in the request body.

#### PUT `/books/:book_id`

Update details of a specific book by its ID. Send updated book details in the request body.

#### DELETE `/books/:param`

Delete a specific book by its book_id or bookname.

### `/authors`

#### GET `/authors`

Retrieve a list of all authors.

#### GET `/authors/:param`

Retrieve details of a specific author by their author_id or authorname.

#### POST `/authors`

Create a new author. Send author details in the request body.

#### PUT `/authors/:author_id`

Update details of a specific author by their author_id. Send updated author details in the request body.

#### DELETE `/authors/:param`

Delete a specific author by their author_id or authorname.

## Request and Response Formats

### Book
#### *price must be a number.
```json
{
  "bookname": "Bookname",
  "author": "Author Name",
  "genre": "Genre",
  "price": "XXXX"
}
```

### Author

```json
{
  "authorname": "Author Name",
  "genre": "genre",
  "about": "about",
  "books": "books"
}
```

## Request and Response Formats

### Book
#### *price must be a number.
```json
{ 
  "book_id":"XXXX",
  "bookname": "Bookname",
  "author": "Author Name",
  "genre": "Genre",
  "price": "XXXX",
  "published_date": "date"
}
```

### Author

```json
{
  "author_id": "author_id",
  "authorname": "Author Name",
  "genre": "genre",
  "about": "about",
  "books": "books",
}
```

## Demo API Endpoint
 Api Endpoint-https://books-api-kycb.onrender.com

## Error Handling

The API follows standard HTTP error codes and returns JSON responses with error details when applicable.

## Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## License

This project is licensed under the MIT License.

---
