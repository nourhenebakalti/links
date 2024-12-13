// src/pages/admin/dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      router.push('/admin/admin_login');
    } else {
      setLoading(false); // Token exists, allow loading to finish
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    router.push('/admin/admin_login'); // Redirect to the login page
  };

  if (loading) {
    return <div>Loading...</div>; // A loading indicator or spinner
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>

      {/* Dashboard Cards */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div className="card" style={{ flex: 1, padding: '20px', marginRight: '10px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Orders</h2>
          <p>152</p>
          <small>24 new since last visit</small>
          <div className="icon">🛒</div>
        </div>

        <div className="card" style={{ flex: 1, padding: '20px', marginRight: '10px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Revenue</h2>
          <p>$2,100</p>
          <small>+52% since last week</small>
          <div className="icon">💰</div>
        </div>

        <div className="card" style={{ flex: 1, padding: '20px', marginRight: '10px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Customers</h2>
          <p>28,441</p>
          <small>520 newly registered</small>
          <div className="icon">👥</div>
        </div>

        <div className="card" style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Comments</h2>
          <p>152 Unread</p>
          <small>85 responded</small>
          <div className="icon">💬</div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="recent-sales" style={{ marginTop: '20px' }}>
        <h2>Recent Sales</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Image</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="bamboo-watch.jpg" alt="Bamboo Watch" style={{ width: '50px' }} /></td>
              <td>Bamboo Watch</td>
              <td>$65.00</td>
              <td><button style={{ padding: '5px 10px' }}>View</button></td>
            </tr>
            <tr>
              <td><img src="black-watch.jpg" alt="Black Watch" style={{ width: '50px' }} /></td>
              <td>Black Watch</td>
              <td>$72.00</td>
              <td><button style={{ padding: '5px 10px' }}>View</button></td>
            </tr>
            <tr>
              <td><img src="blue-band.jpg" alt="Blue Band" style={{ width: '50px' }} /></td>
              <td>Blue Band</td>
              <td>$79.00</td>
              <td><button style={{ padding: '5px 10px' }}>View</button></td>
            </tr>
            <tr>
              <td><img src="blue-tshirt.jpg" alt="Blue T-Shirt" style={{ width: '50px' }} /></td>
              <td>Blue T-Shirt</td>
              <td>$29.00</td>
              <td><button style={{ padding: '5px 10px' }}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
