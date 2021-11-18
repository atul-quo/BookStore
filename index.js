const http = require('http')

const express = require('express')
const app = express()

app.use(express.json())

// Add a new book.
// Delete existing book.
// Update book details.
// Get book details by id
// Get all the books details

let books = [
    {
        book_id: 1,
        book_name: 'a',
        author_name: 'a',
        publish_date: 'datea',
        genre: 'a'
    },
    {
        book_id: 2,
        book_name: 'b',
        author_name: 'b',
        publish_date: 'dateb',
        genre: 'b'
    },
    {
        book_id: 3,
        book_name: 'c',
        author_name: 'c',
        publish_date: 'datec',
        genre: 'c'
    },
    {
        book_id: 4,
        book_name: 'd',
        author_name: 'd',
        publish_date: 'dated',
        genre: 'd'
    }
]

app.get('/api/books', (request, response) => {
    response.json(books)
})

app.get('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    const book = books.find(book => book.book_id === id)
    console.log(book)
    if (book) {
        response.json(book)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    books = books.filter(book => book.book_id !== id)
    console.log('** delete', {books})
    response.status(204).end()
})

app.post('/api/books', (request, response) => {
    // const book = request.body
    // console.log(book)
    // response.json(book)
    console.log('** here', request.body)
    const maxId = books.length > 0
    ? Math.max(...books.map(n => n.book_id)) 
    : 0
    const book = request.body
    book.book_id = maxId + 1
    books = books.concat(book)
    console.log('**', {books})
    response.json(book)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
