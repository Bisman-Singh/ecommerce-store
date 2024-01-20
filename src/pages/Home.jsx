import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '1.8rem', color: '#10b981', marginBottom: '1.5rem' },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  search: {
    flex: 1,
    minWidth: '200px',
    background: '#12121e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    color: '#e5e5e5',
    fontSize: '0.95rem',
    outline: 'none',
  },
  categories: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  catBtn: (active) => ({
    background: active ? '#10b981' : 'transparent',
    color: active ? 'white' : '#999',
    border: active ? 'none' : '1px solid #333',
    borderRadius: '20px',
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
  }),
  select: {
    background: '#12121e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    color: '#e5e5e5',
    fontSize: '0.9rem',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  empty: { textAlign: 'center', color: '#666', padding: '3rem', fontSize: '1.1rem' },
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, category, sort]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Products</h1>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={styles.catBtn(category === cat)}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        {filtered.length === 0 ? (
          <p style={styles.empty}>No products found.</p>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
