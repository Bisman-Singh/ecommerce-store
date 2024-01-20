import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const styles = {
  card: {
    background: '#1a1a2e',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #2a2a3e',
    transition: 'border-color 0.2s, transform 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    background: '#2a2a3e',
  },
  body: {
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  category: {
    fontSize: '0.75rem',
    color: '#10b981',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#f0f0f0',
    marginBottom: '0.5rem',
  },
  rating: {
    fontSize: '0.85rem',
    color: '#eab308',
    marginBottom: '0.5rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '0.75rem',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#10b981',
  },
  btn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} style={styles.image} loading="lazy" />
      </Link>
      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>
        <span style={styles.rating}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} {product.rating}</span>
        <div style={styles.footer}>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
          <button style={styles.btn} onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
