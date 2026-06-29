import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Bell, 
  Box,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Zap,
  Layers
} from 'lucide-react';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import dbData from './data/dbData.json';
import './index.css';

// Extract real categories from the DB export (take top 15 for sidebar)
const realCategories = dbData.categories[0]?.children?.slice(0, 15).map(c => ({
  id: c.slug,
  name: c.name,
  icon: Layers, // Default icon for all imported categories
  active: false
})) || [];

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);
  }, []);

  const resize = useCallback((mouseMoveEvent: MouseEvent) => {
    if (isResizingRef.current) {
      const newWidth = mouseMoveEvent.clientX;
      if (newWidth > 200 && newWidth < 600) {
        setSidebarWidth(newWidth);
        if (isCollapsed) setIsCollapsed(false);
      } else if (newWidth <= 200 && newWidth > 100) {
        setSidebarWidth(200);
        if (isCollapsed) setIsCollapsed(false);
      } else if (newWidth <= 100) {
        setIsCollapsed(true);
      }
    }
  }, [isCollapsed]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar Navigation */}
        <aside 
          className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isResizing ? 'resizing' : ''}`}
          style={{ width: isCollapsed ? undefined : `${sidebarWidth}px` }}
        >
          <Link to="/" className="brand-header" style={{ textDecoration: 'none' }}>
            <Box className="brand-logo" size={28} />
            <span className="brand-name">AMxPEDIA</span>
          </Link>
          <nav className="sidebar-nav">
            <Link to="/" className="nav-item" style={{ textDecoration: 'none' }}>
              <div className="nav-item-left">
                <User size={18} />
                <span>Home</span>
              </div>
            </Link>
            <div className="nav-item" style={{ marginBottom: '1rem', cursor: 'default' }}>
              <div className="nav-item-left" style={{ width: '100%' }}>
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Browse Categories" 
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', marginLeft: '8px' }}
                />
              </div>
            </div>
            
            {realCategories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className={`nav-item ${cat.active ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
                title={cat.name}
              >
                <div className="nav-item-left">
                  <cat.icon size={18} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
                </div>
                {!isCollapsed && <ChevronDown size={16} />}
              </Link>
            ))}
          </nav>
          
          {/* Drag Handle for Resizing */}
          {!isCollapsed && (
            <div 
              className={`sidebar-resizer ${isResizing ? 'active' : ''}`}
              onMouseDown={startResizing}
            />
          )}
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Topbar */}
          <header className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
              <button 
                onClick={toggleSidebar}
                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
              </button>
              <div className="ai-search-container" style={{ margin: 0, maxWidth: '500px' }}>
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  className="ai-search-input" 
                  placeholder="Describe your project or part needed..." 
                />
                <button className="search-button">
                  <Zap size={16} />
                  AI Find
                </button>
              </div>
            </div>
            
            <div className="topbar-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <img src="https://ui-avatars.com/api/?name=User&background=040273&color=fff&rounded=true" alt="User" width={32} height={32} />
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Account</span>
              </div>
              <ShoppingCart className="action-icon" size={20} />
              <Bell className="action-icon" size={20} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontWeight: 600 }}>
                EN <ChevronDown size={16} />
              </div>
            </div>
          </header>

          {/* Page Routing */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/product/:sku" element={<ProductDetail />} />
          </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;
