import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1a1a2e',
    borderBottom: '1px solid #2a2a3e',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#10b981',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#ccc',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  cartBadge: {
    background: '#10b981',
    color: 'white',
    borderRadius: '50%',
    padding: '0.1rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    marginLeft: '0.25rem',
  },
};

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>ShopVite</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>
          Cart
          {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </Link>
        <Link to="/checkout" style={styles.link}>Checkout</Link>
      </div>
    </nav>
  );
}
