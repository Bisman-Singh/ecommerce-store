import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '1.8rem', color: '#10b981', marginBottom: '1.5rem' },
  empty: { textAlign: 'center', color: '#666', padding: '3rem' },
  item: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '0.75rem',
    border: '1px solid #2a2a3e',
  },
  image: { width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', background: '#2a2a3e' },
  info: { flex: 1 },
  name: { fontWeight: 600, color: '#f0f0f0' },
  price: { color: '#10b981', fontWeight: 600 },
  controls: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  qtyBtn: {
    background: '#2a2a3e',
    color: '#e5e5e5',
    border: 'none',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 700,
  },
  qty: { minWidth: '24px', textAlign: 'center', fontWeight: 600 },
  removeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
  },
  summary: {
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '1.5rem',
    marginTop: '1.5rem',
    border: '1px solid #2a2a3e',
  },
  total: { fontSize: '1.4rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' },
  checkoutBtn: {
    display: 'inline-block',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '0.8rem 2rem',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
  },
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: '#10b981' }}>Continue shopping</Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.info}>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.price}>${item.price.toFixed(2)}</div>
              </div>
              <div style={styles.controls}>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div style={{ fontWeight: 700, color: '#f0f0f0', minWidth: '70px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div style={styles.summary}>
            <div style={styles.total}>Total: ${cartTotal.toFixed(2)}</div>
            <Link to="/checkout" style={styles.checkoutBtn}>Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
