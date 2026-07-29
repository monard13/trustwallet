import React from 'react';
import {
  TronLogo,
  USDTLogo,
  PolygonLogo,
  SendIcon,
  ReceiveIcon,
  SwapIcon,
  PlusIcon,
  WalletIcon,
  ScanQrIcon,
  HistoryIcon,
} from './icons';
import { StatusBar } from './StatusBar';
import { WalletPortfolio } from '../services/balanceService';

interface DashboardProps {
  portfolio?: WalletPortfolio | null;
  isLoading?: boolean;
  onSelectToken: (tokenSymbol: string) => void;
  onSendClick: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  portfolio,
  isLoading = false,
  onSelectToken,
  onSendClick,
}) => {
  const formattedTotal = portfolio
    ? `$${portfolio.totalUsd.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$40,85';

  const formattedChangeUsd = portfolio
    ? `$${portfolio.totalChange24hUsd.toLocaleString('es-ES', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`
    : '$0,1000';

  const formattedChangePct = portfolio
    ? `${portfolio.totalChange24hPercent.toFixed(2)}%`
    : '0.25%';

  const tronToken = portfolio?.tokens.find((t) => t.symbol === 'TRX');
  const usdtToken = portfolio?.tokens.find((t) => t.symbol === 'USDT');
  const polToken = portfolio?.tokens.find((t) => t.symbol === 'POL');

  return (
    <div style={styles.container}>
      {/* Real-time System Status Bar */}
      <StatusBar />

      {/* Top Header Bar */}
      <div style={styles.headerBar}>
        <div style={styles.walletPill}>
          <div style={styles.walletIconCircle}>
            <WalletIcon size={14} color="#FFC107" />
          </div>
          <span style={styles.walletName}>Carteira prin...</span>
          <span style={{ fontSize: 10, color: '#8E8E93', marginLeft: 2 }}>▼</span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.iconBtn}>
            <HistoryIcon size={18} color="#FFFFFF" />
          </button>
          <button style={styles.iconBtn}>
            <ScanQrIcon size={18} color="#FFFFFF" />
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div style={styles.promoBanner}>
        <span style={styles.promoAlertIcon}>!</span>
        <div style={styles.ondoLogoCircle}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: '#FFF' }}>O</span>
        </div>
        <div style={styles.promoTextContainer}>
          <span style={styles.promoTitle}>$100K Ondo trading competition live 🔥</span>
          <span style={styles.promoSubtitle}>Access eligible Ondo RWAs for 0% swap fees.</span>
        </div>
      </div>

      {/* Main Balance Display */}
      <div style={styles.balanceSection}>
        <h1 style={styles.totalBalance}>{isLoading ? '...' : formattedTotal}</h1>
        <div style={styles.changeBadge}>
          <span style={{ fontSize: 12, marginRight: 4 }}>▲</span>
          <span style={styles.changeText}>
            {formattedChangeUsd} ({formattedChangePct})
          </span>
        </div>
      </div>

      {/* Quick Action Buttons Row */}
      <div style={styles.actionRow}>
        <button style={styles.actionBtn} onClick={onSendClick}>
          <div style={styles.actionIconDark}>
            <SendIcon size={20} color="#FFFFFF" />
          </div>
          <span style={styles.actionLabel}>Enviar</span>
        </button>

        <button style={styles.actionBtn}>
          <div style={styles.actionIconDark}>
            <ReceiveIcon size={20} color="#FFFFFF" />
          </div>
          <span style={styles.actionLabel}>Receber</span>
        </button>

        <button style={styles.actionBtn}>
          <div style={{ ...styles.actionIconDark, backgroundColor: '#00D66B' }}>
            <SwapIcon size={20} color="#000000" />
          </div>
          <span style={styles.actionLabel}>Swap</span>
        </button>

        <button style={styles.actionBtn}>
          <div style={styles.actionIconDark}>
            <PlusIcon size={20} color="#FFFFFF" />
          </div>
          <span style={styles.actionLabel}>Compra</span>
        </button>
      </div>

      {/* Tokens List Section */}
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>Tokens</span>
        <span style={{ fontSize: 14, color: '#8E8E93' }}>›</span>
      </div>

      <div style={styles.tokenList}>
        {/* Tron */}
        <div style={styles.tokenRow} onClick={() => onSelectToken('TRX')}>
          <div style={styles.tokenLeft}>
            <TronLogo size={38} />
            <div style={styles.tokenNames}>
              <span style={styles.tokenTitle}>Tron</span>
              <span style={styles.tokenSub}>
                {tronToken ? `${tronToken.balanceFormatted.toLocaleString('es-ES', { maximumFractionDigits: 6 })} TRX` : '116,475056 TRX'}
              </span>
            </div>
          </div>
          <div style={styles.tokenRight}>
            <span style={styles.tokenValue}>
              {tronToken ? `$${tronToken.valueUsd.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$37,87'}
            </span>
            <span style={styles.tokenChangeGreen}>+$0,1115</span>
          </div>
        </div>

        {/* Tether USDT */}
        <div style={styles.tokenRow} onClick={() => onSelectToken('USDT')}>
          <div style={styles.tokenLeft}>
            <USDTLogo size={38} showBadge={true} />
            <div style={styles.tokenNames}>
              <span style={styles.tokenTitle}>Tether USDT</span>
              <span style={styles.tokenSub}>
                {usdtToken ? `${usdtToken.balanceFormatted.toLocaleString('es-ES', { maximumFractionDigits: 6 })} USDT` : '2,085635 USDT'}
              </span>
            </div>
          </div>
          <div style={styles.tokenRight}>
            <span style={styles.tokenValue}>
              {usdtToken ? `$${usdtToken.valueUsd.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$2,08'}
            </span>
            <span style={styles.tokenChangeGrey}>$0,00</span>
          </div>
        </div>

        {/* Polygon */}
        <div style={styles.tokenRow} onClick={() => onSelectToken('POL')}>
          <div style={styles.tokenLeft}>
            <PolygonLogo size={38} />
            <div style={styles.tokenNames}>
              <span style={styles.tokenTitle}>Polygon</span>
              <span style={styles.tokenSub}>
                {polToken ? `${polToken.balanceFormatted.toLocaleString('es-ES', { maximumFractionDigits: 8 })} POL` : '12,47961144 POL'}
              </span>
            </div>
          </div>
          <div style={styles.tokenRight}>
            <span style={styles.tokenValue}>
              {polToken ? `$${polToken.valueUsd.toLocaleString('es-ES', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}` : '$0,8921'}
            </span>
            <span style={styles.tokenChangeRed}>-$0,0102</span>
          </div>
        </div>
      </div>

      {/* Ver todos button */}
      <div style={{ padding: '8px 16px 20px' }}>
        <button style={styles.verTodosBtn}>
          Ver todos <span style={{ marginLeft: 4 }}>›</span>
        </button>
      </div>

      {/* Perps Section */}
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>Perps</span>
        <span style={{ fontSize: 14, color: '#8E8E93' }}>›</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#121315',
    color: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%',
    maxWidth: '430px',
    margin: '0 auto',
    minHeight: '100vh',
    paddingBottom: '90px',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
  },
  walletPill: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1F23',
    padding: '6px 12px',
    borderRadius: '20px',
    gap: '6px',
    cursor: 'pointer',
  },
  walletIconCircle: {
    backgroundColor: 'rgba(255,193,7,0.15)',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerActions: {
    display: 'flex',
    gap: '10px',
  },
  iconBtn: {
    backgroundColor: '#1E1F23',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  promoBanner: {
    margin: '8px 16px 16px',
    backgroundColor: '#1C1D21',
    borderRadius: '16px',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #2A2B30',
  },
  promoAlertIcon: {
    backgroundColor: '#2A2B30',
    color: '#8E8E93',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  ondoLogoCircle: {
    backgroundColor: '#0F2C59',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  promoTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  promoSubtitle: {
    fontSize: '11px',
    color: '#8E8E93',
  },
  balanceSection: {
    padding: '8px 16px',
  },
  totalBalance: {
    fontSize: '38px',
    fontWeight: '800',
    margin: '0 0 4px 0',
    letterSpacing: '-0.5px',
  },
  changeBadge: {
    display: 'flex',
    alignItems: 'center',
    color: '#00D66B',
    fontWeight: '600',
    fontSize: '14px',
  },
  changeText: {
    letterSpacing: '0.2px',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px 16px',
    gap: '12px',
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
  },
  actionIconDark: {
    width: '56px',
    height: '56px',
    backgroundColor: '#1E1F23',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    transition: 'transform 0.1s ease',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '500',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '16px 16px 8px',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
  },
  tokenList: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokenRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
  },
  tokenLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  tokenNames: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokenTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tokenSub: {
    fontSize: '12px',
    color: '#8E8E93',
    marginTop: '2px',
  },
  tokenRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  tokenValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tokenChangeGreen: {
    fontSize: '12px',
    color: '#00D66B',
    marginTop: '2px',
  },
  tokenChangeGrey: {
    fontSize: '12px',
    color: '#8E8E93',
    marginTop: '2px',
  },
  tokenChangeRed: {
    fontSize: '12px',
    color: '#FF453A',
    marginTop: '2px',
  },
  verTodosBtn: {
    backgroundColor: '#1E1F23',
    border: 'none',
    color: '#FFFFFF',
    padding: '8px 16px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  },
};
