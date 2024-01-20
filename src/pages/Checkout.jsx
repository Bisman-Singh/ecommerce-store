import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const fieldStyle = {
  background: '#12121e',
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '0.7rem 1rem',
  color: '#e5e5e5',
  fontSize: '0.95rem',
  outline: 'none',
  width: '100%',
};

const errorStyle = { color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' };

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '1.8rem', color: '#10b981', marginBottom: '1.5rem' },
  form: {
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #2a2a3e',
  },
  group: { marginBottom: '1rem' },
  label: { display: 'block', color: '#ccc', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 },
  row: { display: 'flex', gap: '1rem' },
  btn: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '0.8rem 2rem',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
    width: '100%',
    marginTop: '0.5rem',
  },
  summary: { color: '#aaa', marginBottom: '1.5rem', padding: '1rem', background: '#12121e', borderRadius: '8px' },
  success: { textAlign: 'center', padding: '3rem' },
};

const INITIAL = { name: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '' };

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.zip.trim() || !/^\d{5}/.test(form.zip)) errs.zip = 'Valid ZIP code is required';
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = '16-digit card number is required';
    if (!form.expiry.trim() || !/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = 'MM/YY format required';
    if (!form.cvv.trim() || !/^\d{3,4}$/.test(form.cvv)) errs.cvv = '3 or 4 digit CVV required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      clearCart();
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.success}>
          <h1 style={{ color: '#10b981', marginBottom: '1rem' }}>Order Placed!</h1>
          <p style={{ color: '#aaa' }}>Thank you for your purchase, {form.name}.</p>
          <Link to="/" style={{ color: '#10b981', display: 'inline-block', marginTop: '1rem' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Checkout</h1>
        <div style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: '#10b981' }}>Continue shopping</Link>
        </div>
      </div>
    );
  }

  const Field = ({ label, field, type = 'text', placeholder }) => (
    <div style={styles.group}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[field]}
        onChange={handleChange(field)}
        style={{ ...fieldStyle, borderColor: errors[field] ? '#ef4444' : '#333' }}
      />
      {errors[field] && <div style={errorStyle}>{errors[field]}</div>}
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <div style={styles.summary}>
        <strong>{cart.length} item(s)</strong> — Total: <strong style={{ color: '#10b981' }}>${cartTotal.toFixed(2)}</strong>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <Field label="Full Name" field="name" placeholder="John Doe" />
        <Field label="Email" field="email" type="email" placeholder="john@example.com" />
        <Field label="Address" field="address" placeholder="123 Main St" />
        <div style={styles.row}>
          <Field label="City" field="city" placeholder="New York" />
          <Field label="ZIP Code" field="zip" placeholder="10001" />
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #2a2a3e', margin: '1rem 0' }} />
        <Field label="Card Number" field="cardNumber" placeholder="1234 5678 9012 3456" />
        <div style={styles.row}>
          <Field label="Expiry" field="expiry" placeholder="MM/YY" />
          <Field label="CVV" field="cvv" placeholder="123" />
        </div>
        <button type="submit" style={styles.btn}>Place Order — ${cartTotal.toFixed(2)}</button>
      </form>
    </div>
  );
}
