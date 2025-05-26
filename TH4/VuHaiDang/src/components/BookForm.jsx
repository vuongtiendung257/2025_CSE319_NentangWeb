import React, { useState, useEffect } from 'react';

function BookForm({ onAdd, onUpdate, editingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !year) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const parsedYear = parseInt(year, 10);
    if (isNaN(parsedYear) || parsedYear < 0) {
      alert('Năm xuất bản không hợp lệ!');
      return;
    }

    const bookData = {
      id: editingBook ? editingBook.id : Date.now(),
      title,
      author,
      year: parsedYear,
    };

    editingBook ? onUpdate(bookData) : onAdd(bookData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>{editingBook ? 'Sửa Sách' : 'Thêm Sách'}</h2>
      <div>
        <label>Tiêu đề: 
        <input value={title} onChange={e => setTitle(e.target.value)} />
        </label>
      </div>
      <div>
        <label>Tác giả: 
        <input value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>Năm XB: 
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
        </label>
      </div>
      <button type="submit">{editingBook ? 'Cập nhật' : 'Thêm'}</button>
    </form>
  );
}

export default BookForm;
