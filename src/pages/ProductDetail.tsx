import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Download, CheckCircle, Box } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { mockProducts } from '../data/mockProducts';
import dbData from '../data/dbData.json';
import { ScrewModel } from '../components/ScrewModel';

export const ProductDetail: React.FC = () => {
  const { sku } = useParams<{ sku: string }>();
  
  // Try to find the product in mockProducts first, otherwise look in dbData
  let product = mockProducts.find(p => p.sku === sku);
  let isFromDB = false;
  
  if (!product) {
    const dbProduct = dbData.products.find((p: any) => p.partNumber === sku) as any;
    if (dbProduct) {
      isFromDB = true;
      product = {
        id: dbProduct.id,
        sku: dbProduct.partNumber,
        name: dbProduct.category?.name || 'McMaster Component',
        category: 'Database Products',
        subcategory: dbProduct.category?.slug || 'Misc',
        description: `This product was extracted from the PostgreSQL database orchestration run. It features dynamically scraped attributes for part number ${dbProduct.partNumber}.`,
        price: dbProduct.price ? parseFloat(dbProduct.price) : 0.00,
        packSize: 1,
        stockStatus: 'In Stock',
        specs: Object.entries(dbProduct.attributes || {}).map(([key, value]) => ({ label: key, value: String(value) }))
      };
    }
  }

  if (!product) {
    return <div className="dashboard">Product not found. Try searching for 91292A133 or a valid database part number.</div>;
  }

  const handleDownloadCAD = () => {
    const content = "ISO-10303-21;\nHEADER;\n/* Simulated McMaster-Carr CAD file */\nENDSEC;\nDATA;\nENDSEC;\nEND-ISO-10303-21;";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.sku}_3D_Model.step`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard" style={{ maxWidth: '1200px' }}>
      
      {/* Breadcrumbs */}
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ cursor: 'pointer', color: 'inherit' }}>Home</Link> <ChevronRight size={14} /> 
        <Link to="/category/fasteners" style={{ cursor: 'pointer', color: 'inherit' }}>{product.category}</Link> <ChevronRight size={14} /> 
        <span>{product.subcategory}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Main Info & 3D Viewer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{product.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Part No. <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.sku}</span></p>
            {isFromDB && <span style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Extracted from DB</span>}
          </div>

          <div className="viewer-3d-container" style={{ height: '450px', margin: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--panel-bg)', padding: '0.5rem 1rem', borderRadius: '8px', backdropFilter: 'blur(4px)', fontWeight: 600, fontSize: '0.875rem', opacity: 0.9 }}>
              <Box size={16} color="var(--accent-blue)" /> Interactive 3D WebGL Model
            </div>
            <div className="viewer-canvas" style={{ padding: 0, overflow: 'hidden' }}>
              <Canvas camera={{ position: [4, 2, 4], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                <Suspense fallback={null}>
                  <ScrewModel />
                  <Environment preset="city" />
                  <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                </Suspense>
                <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
              </Canvas>
            </div>
            <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '1rem', backgroundColor: 'var(--bg-color)', zIndex: 10 }}>
              <button onClick={handleDownloadCAD} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-blue)', cursor: 'pointer' }}>
                <Download size={16} /> Download Source CAD (.STEP)
              </button>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Description</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Technical Specifications</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <tbody>
                {product.specs.map((spec: any, index: number) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'var(--bg-color)' : 'var(--panel-bg)', borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem 1rem', width: '40%', fontWeight: 500, color: 'var(--text-secondary)' }}>{spec.label}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)' }}>{spec.value}</td>
                  </tr>
                ))}
                {product.specs.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: '1rem', color: 'var(--text-secondary)' }}>No specifications available.</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Action Panel */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div style={{ backgroundColor: 'var(--panel-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 600, marginBottom: '0.5rem' }}>
                <CheckCircle size={18} /> {product.stockStatus}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>${product.price.toFixed(2)}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>per pack of {product.packSize}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button style={{ backgroundColor: 'var(--accent-blue)', color: 'white', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                <Download size={20} /> Download Catalog Page
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
