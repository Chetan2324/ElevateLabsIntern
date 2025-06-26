const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book storage
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(400).json({ message: 'Please provide id, title, and author' });
  }
  books.push({ id, title, author });
  res.status(201).json({ message: 'Book added successfully', books });
});

// PUT (Update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json({ message: 'Book updated successfully', book });
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Book API server is running on http://localhost:${PORT}`);
});