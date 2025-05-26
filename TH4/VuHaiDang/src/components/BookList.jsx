import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  return (
    <div>
      <h2>📖 Danh sách sách</h2>
      {books.length === 0 ? (
        <p>Chưa có sách nào trong danh sách.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <span>
                <strong>{book.title}</strong> - {book.author} ({book.year})
              </span>
              <span>
                <button type="button" onClick={() => onEdit(book)}>Sửa</button>
                <button type="button" onClick={() => onDelete(book.id)}>Xóa</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
