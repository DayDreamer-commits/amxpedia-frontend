import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Filter, ChevronRight } from 'lucide-react';
import dbData from '../data/dbData.json';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  // For the mockup, we will display products from the DB export
  const products = dbData.products || [];

  return (
    <div className="dashboard" style={{ display: 'flex', gap: '2rem', maxWidth: '1400px' }}>
      
      {/* Faceted Filter Sidebar */}
      <aside style={{ width: '250px', flexShrink: 0 }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={20} />
          Filters
        </h2>
        
        <div className="filter-group" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Attribute Filter</h3>
          {['Standard', 'Metric', 'Custom'].map(size => (
            <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked={size === 'Metric'} />
              {size}
            </label>
          ))}
        </div>
      </aside>

      {/* Main Data Table */}
      <div style={{ flex: 1, backgroundColor: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            Catalog Data <ChevronRight size={14} /> Database Query Results
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{categoryId ? `Products in ${categoryId}` : 'All Extracted Products'}</h1>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Part Number</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Specs (Attributes)</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => {
                const attrs = Object.entries(product.attributes || {}).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(', ');
                return (
                  <tr 
                    key={product.id} 
                    style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${product.partNumber}`)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-light)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--accent-blue)' }}>{product.partNumber}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{product.category?.name?.substring(0, 40)}...</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{attrs}</td>
                    <td style={{ padding: '1rem' }}>
                      <button style={{ backgroundColor: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }} onClick={(e) => { e.stopPropagation(); alert('Added to cart'); }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
