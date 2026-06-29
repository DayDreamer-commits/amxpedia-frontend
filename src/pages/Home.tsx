import React from 'react';
import { Box, Search, ArrowRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dbData from '../data/dbData.json';

// Take the first 24 categories from the exported DB data
const realCategories = dbData.categories[0]?.children?.slice(0, 24) || [];

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* 3D Interactive Viewer Placeholder */}
      <section className="viewer-3d-container">
        <div className="viewer-header">
          <h2 className="viewer-title">
            <Box size={20} color="var(--accent-blue)" />
            Interactive Assembly Viewer
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <Search size={16} />
            </button>
            <button style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <Box size={16} />
            </button>
          </div>
        </div>
        <div className="viewer-canvas">
          <div style={{ textAlign: 'center' }}>
            <Box size={64} color="var(--border-color)" style={{ marginBottom: '1rem', margin: '0 auto' }} />
            <p>3D WebGL Context Initialization...</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Select a category to view interactive CAD models.</p>
          </div>
        </div>
      </section>

      {/* Database Populated Category Grid */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', marginTop: '1rem' }}>Browse McMaster Catalog Data</h2>
      <section className="category-grid">
        {realCategories.map((sub: any) => (
          <div 
            key={sub.id} 
            className="category-card"
            onClick={() => navigate(`/category/${sub.slug}`)}
          >
            <div className="category-icon-wrapper">
              {/* Default icon for DB populated categories */}
              <Layers size={32} strokeWidth={1.5} />
            </div>
            <h3 className="category-title" style={{ fontSize: '1rem' }}>{sub.name}</h3>
            <div className="view-products">
              Explore Subcategories <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
