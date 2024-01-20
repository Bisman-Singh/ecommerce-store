import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' },
  back: { color: '#10b981', fontSize: '0.9rem', display: 'inline-block', marginBottom: '1.5rem' },
  layout: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '12px',
    background: '#2a2a3e',
    objectFit: 'cover',
  },
  info: { flex: 1, minWidth: '280px' },
  category: { color: '#10b981', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600 },
  name: { fontSize: '1.8rem', fontWeight: 700, color: '#f0f0f0', margin: '0.5rem 0' },
  rating: { color: '#eab308', fontSize: '1rem', marginBottom: '1rem' },
  desc: { color: '#aaa', lineHeight: 1.7, marginBottom: '1.5rem' },
  price: { fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: '1.5rem' },
  btn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '0.8rem 2rem',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
  },
  notFound: { textAlign: 'center', padding: '4rem', color: '#666' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.notFound}>
          <h2>Product not found</h2>
          <Link to="/" style={styles.back}>Back to products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>← Back to products</Link>
      <div style={styles.layout}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.name}>{product.name}</h1>
          <div style={styles.rating}>
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} {product.rating}
          </div>
          <p style={styles.desc}>{product.description}</p>
          <div style={styles.price}>${product.price.toFixed(2)}</div>
          <button style={styles.btn} onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
