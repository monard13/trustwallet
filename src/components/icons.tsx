import React from 'react';

export const TronLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#EF0027" />
    <path
      d="M23.5 9.5L7.5 12.8L17.2 24.5L23.5 9.5Z"
      fill="white"
      stroke="white"
      strokeWidth="0.5"
    />
    <path d="M7.5 12.8L15.4 16.5L17.2 24.5L7.5 12.8Z" fill="#EF0027" />
    <path d="M15.4 16.5L23.5 9.5L17.2 24.5L15.4 16.5Z" fill="white" fillOpacity="0.8" />
  </svg>
);

export const USDTLogo = ({ size = 24, showBadge = false }: { size?: number; showBadge?: boolean }) => (
  <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex' }}>
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        d="M17.9 14.8V12.8H22.7V9.5H9.3V12.8H14.1V14.8C10.7 15 8.2 15.6 8.2 16.4C8.2 17.2 10.7 17.8 14.1 18V22.5H17.9V18C21.3 17.8 23.8 17.2 23.8 16.4C23.8 15.6 21.3 15 17.9 14.8ZM16 17.1C13.2 17.1 11.2 16.6 11.2 16.4C11.2 16.2 13.2 15.7 16 15.7C18.8 15.7 20.8 16.2 20.8 16.4C20.8 16.6 18.8 17.1 16 17.1Z"
        fill="white"
      />
    </svg>
    {showBadge && (
      <div
        style={{
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: size * 0.45,
          height: size * 0.45,
          borderRadius: '50%',
          backgroundColor: '#1E1F23',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 2px rgba(0,0,0,0.5)',
        }}
      >
        <TronLogo size={size * 0.38} />
      </div>
    )}
  </div>
);

export const PolygonLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#8247E5" />
    <path
      d="M21.1 12.3L17.2 10.1C16.5 9.7 15.6 9.7 14.9 10.1L11 12.3C10.3 12.7 9.9 13.4 9.9 14.2V18.6C9.9 19.4 10.3 20.1 11 20.5L14.9 22.7C15.6 23.1 16.5 23.1 17.2 22.7L21.1 20.5C21.8 20.1 22.2 19.4 22.2 18.6V14.2C22.2 13.4 21.8 12.7 21.1 12.3ZM16 14.5L18.8 16.1V17.9L16 16.3L13.2 17.9V16.1L16 14.5Z"
      fill="white"
    />
  </svg>
);

export const SendIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const ReceiveIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17" />
    <polyline points="17 17 7 17 7 7" />
  </svg>
);

export const SwapIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 2L21 6M21 6L17 10M21 6H3" />
    <path d="M7 22L3 18M3 18L7 14M3 18H21" />
  </svg>
);

export const PlusIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const WalletIcon = ({ size = 18, color = '#FFC107' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="3" fill={color} fillOpacity="0.2" />
    <path d="M2 10H22" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="14" r="1.5" fill={color} />
  </svg>
);

export const ScanQrIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <rect x="7" y="7" width="3" height="3" fill={color} />
    <rect x="14" y="7" width="3" height="3" fill={color} />
    <rect x="7" y="14" width="3" height="3" fill={color} />
    <rect x="14" y="14" width="3" height="3" fill={color} />
  </svg>
);

export const HistoryIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

export const AddressBookIcon = ({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
