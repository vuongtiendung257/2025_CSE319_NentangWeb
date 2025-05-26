import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    {id: 1, title: 'React cơ bản', author: 'Nguyễn Văn A', year: 2003},
    {id: 2, title: 'JavaScript nâng cao', author: 'Trần Thị B', year: 2022},
  ]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) setBooks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="container">
      <h1>📚 Quản Lý Sách</h1>
      <BookForm
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editingBook={editingBook}
      />
      <BookList
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;
