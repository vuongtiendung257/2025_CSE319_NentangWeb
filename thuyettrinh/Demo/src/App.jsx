import { useState } from 'react';
import './index.css';

const foodItems = [
  { id: 1, name: 'Nước mắm', price: 50000, image: './Images/a1a64c3c-5864-4613-bb0e-f787f9ad176f.png' },
  { id: 2, name: 'Gạo', price: 125000, image: '/Images/gao-ngoc-thuc-tui-5kg.png' },
  { id: 3, name: 'Đường', price: 40000, image: '/Images/Duong-tinh-luyen.png' },
  { id: 4, name: 'Muối', price: 15000, image: '/Images/DKS07496-scaled.jpg' },
  { id: 5, name: 'Dầu ăn', price: 45000, image: '/Images/vn-11134207-7r98o-lmhg5bb79azj35.jfif' },
  { id: 6, name: 'Trứng gà', price: 35000, image: '/Images/trung_ga_tuoi_ong_rau_1744969183965.jfif' },
  { id: 7, name: 'Sữa tươi', price: 32000, image: '/Images/nutimilk-stts-pack-3hop.png' },
  { id: 8, name: 'Thịt heo', price: 120000, image: '/Images/ba_r_i_1_0c1c8a892643457593b6a173db8aad09_1024x1024.webp' },
  { id: 9, name: 'Cá hồi', price: 220000, image: '/Images/phi-le-ca-hoi.png' },
  { id: 10, name: 'Rau cải', price: 18000, image: '/Images/8936200651174-1.jpg.webp' },
];

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Nhóm 1</h1>
        <nav className="nav">
          <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#cart">Giỏ hàng</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Liên hệ: tamthaitu666@gmail.com | 0937646521</p>
      <p>© 2025 . All rights reserved.</p>
      <div style={{ textAlign: 'center' }}>
        <img src="/Images/f48063b2-dc78-4715-b745-26b791036630 copy.png" alt="Logo" style={{ height: 150, width: 150 }} />
      </div>
    </footer>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const found = prevCart.find(i => i.id === item.id);
      if (found) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const found = prevCart.find(i => i.id === id);
      if (found.quantity > 1) {
        return prevCart.map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevCart.filter(i => i.id !== id);
      }
    });
  };

  // Hàm xóa hết một loại sản phẩm khỏi giỏ
  const removeAllFromCart = (id) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <h2 id="menu" className="menu-title">Menu</h2>
        <div className="food-grid">
          {foodItems.map(item => (
            <div key={item.id} className="food-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString('vi-VN')} VNĐ</p>
              <button 
                onClick={() => addToCart(item)}
                className="add-button"
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        <h2 id="cart" className="cart-title">Giỏ Hàng</h2>
        <div className="cart">
          {cart.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <span>
                    {item.name} - {item.price.toLocaleString('vi-VN')} VNĐ 
                    {' '}x {item.quantity}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => removeAllFromCart(item.id)}
                    className="remove-all-button"
                  >
                    Xóa hết
                  </button>
                </div>
              ))}
              <p className="cart-total">
                Tổng cộng: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;