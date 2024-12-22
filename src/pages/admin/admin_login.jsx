import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../layouts/admin_login.module.scss';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      router.push('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to login. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['form-container']}>
        <p className={styles.title}>Admin Login</p>
        {error && <p className={styles['error-message']}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            
          </div>
          <button className={styles.sign} disabled={loading}>
            {loading ? 'Logging in...' : 'Sign in'}
          </button>
        </form>
        <div className={styles['social-message']}>
       
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
