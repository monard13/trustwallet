import React from 'react';

interface BottomNavProps {
  currentScreen: 'dashboard' | 'assetDetail' | 'send';
  onNavigate: (screen: 'dashboard' | 'assetDetail' | 'send') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === 'send') return null; // Don't show on full send screen

  return (
    <div style={styles.floatingDock}>
      {/* Home Icon */}
      <button
        style={{
          ...styles.dockItem,
          backgroundColor: currentScreen === 'dashboard' ? '#2C2D32' : 'transparent',
        }}
        onClick={() => onNavigate('dashboard')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={currentScreen === 'dashboard' ? '#FFFFFF' : '#8E8E93'}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </button>

      {/* Chart Icon */}
      <button style={styles.dockItem}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      </button>

      {/* Swap / Infinity Icon */}
      <button style={styles.dockItem}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
          <path d="M12 12c-2-2.5-4-4-6-4s-4 1.5-4 4 2 4 4 4 4-1.5 6-4zm0 0c2 2.5 4 4 6 4s4-1.5 4-4-2-4-4-4-4 1.5-6 4z" />
        </svg>
      </button>

      {/* Compass / Discover Icon */}
      <button style={styles.dockItem}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      </button>

      {/* Search Icon */}
      <button style={styles.dockItem}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  floatingDock: {
    position: 'fixed',
    bottom: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1E1F23',
    borderRadius: '30px',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
    border: '1px solid #2A2B30',
    zIndex: 1000,
  },
  dockItem: {
    border: 'none',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
};
