import React, { useState } from 'react';
import { USDTLogo, SendIcon, ReceiveIcon, SwapIcon } from './icons';
import { StatusBar } from './StatusBar';
import { TokenBalanceData } from '../services/balanceService';

interface AssetDetailProps {
  tokenData?: TokenBalanceData | null;
  onBack: () => void;
  onSendClick: () => void;
  onUpdateBalance?: (symbol: string, newBalance: number) => void;
}

export const AssetDetail: React.FC<AssetDetailProps> = ({
  tokenData,
  onBack,
  onSendClick,
  onUpdateBalance,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1H' | '1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');
  const [isEditing, setIsEditing] = useState(false);
  const [editAmount, setEditAmount] = useState(tokenData ? tokenData.balanceFormatted.toString() : '2.085635');

  const currentUsdtBalance = tokenData ? tokenData.balanceFormatted : 2.085635;
  const currentUsdValue = tokenData ? tokenData.valueUsd : 2.08;

  const handleSaveBalance = () => {
    const parsed = parseFloat(editAmount);
    if (!isNaN(parsed) && parsed >= 0) {
      if (onUpdateBalance) {
        onUpdateBalance('USDT', parsed);
      }
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveBalance();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Real-time System Status Bar */}
      <StatusBar />

      {/* Header */}
      <div style={styles.headerBar}>
        <button style={styles.backCircleBtn} onClick={onBack}>
          ‹
        </button>
        <button style={styles.iconBtn}>
          <span style={{ fontSize: 18, color: '#8E8E93' }}>☆</span>
        </button>
      </div>

      {/* Token Price Block */}
      <div style={styles.priceHeader}>
        <div style={styles.tokenTitleLeft}>
          <USDTLogo size={36} showBadge={false} />
          <div style={styles.tokenTitleText}>
            <span style={styles.tokenSymbol}>USDT</span>
            <span style={styles.networkSub}>Tron</span>
          </div>
        </div>

        <div style={styles.priceRight}>
          <span style={styles.currentPrice}>$0.9991</span>
          <span style={styles.priceChangeGreen}>+$0.000256 (0.0%)</span>
        </div>
      </div>

      {/* Price Chart SVG */}
      <div style={styles.chartContainer}>
        <svg width="100%" height="130" viewBox="0 0 350 130" fill="none">
          <path
            d="M 0 60 
               C 15 50, 30 75, 45 65 
               C 60 70, 75 90, 90 100 
               C 105 115, 120 70, 135 60 
               C 150 55, 165 80, 180 50 
               C 195 45, 210 90, 225 80 
               C 240 70, 255 100, 270 75 
               C 285 85, 300 50, 315 65 
               C 330 30, 340 40, 350 20"
            fill="none"
            stroke="#00D66B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Timeframe Selector Pills */}
        <div style={styles.timeframeRow}>
          {(['1H', '1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => {
            const isActive = selectedTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                style={{
                  ...styles.timeframePill,
                  backgroundColor: isActive ? '#1E1F23' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#8E8E93',
                  fontWeight: isActive ? '700' : '500',
                }}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      {/* Your Balance Section (Exact UI matching image_2.png, double-click to edit) */}
      <div style={styles.balanceCard}>
        <span style={styles.balanceLabel}>Your balance</span>

        {isEditing ? (
          <div style={styles.editBox}>
            <div style={styles.editInputRow}>
              <input
                type="number"
                step="any"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                onKeyDown={handleKeyDown}
                style={styles.editInput}
                autoFocus
              />
              <button style={styles.saveGreenBtn} onClick={handleSaveBalance}>
                Guardar
              </button>
            </div>
            <span style={styles.editHintText}>Presiona Enter o Guardar para confirmar</span>
          </div>
        ) : (
          <div
            style={styles.balanceValues}
            onDoubleClick={() => {
              setEditAmount(currentUsdtBalance.toString());
              setIsEditing(true);
            }}
            title="Doble clic para editar el saldo"
          >
            <span style={styles.balanceUsd}>
              ${' '}
              {currentUsdValue.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span style={styles.balanceTokenAmount}>
              {currentUsdtBalance.toLocaleString('es-ES', { maximumFractionDigits: 6 })} USDT
            </span>
          </div>
        )}
      </div>

      {/* Enviar & Receber Quick Buttons */}
      <div style={styles.actionButtonsRow}>
        <button style={styles.actionPillBtn} onClick={onSendClick}>
          <SendIcon size={16} color="#FFFFFF" />
          <span>Enviar</span>
        </button>

        <button style={styles.actionPillBtn}>
          <ReceiveIcon size={16} color="#FFFFFF" />
          <span>Receber</span>
        </button>
      </div>

      {/* Tron Resources Section */}
      <div style={styles.resourcesSection}>
        <div style={styles.resourcesHeader}>
          <span style={styles.resourcesTitle}>Recursos</span>
          <span style={{ fontSize: 13, color: '#8E8E93' }}>ⓘ</span>
        </div>

        <div style={styles.resourcesCardsRow}>
          <div style={styles.resourceCard}>
            <span style={styles.resourceLabel}>Energia</span>
            <div style={styles.resourceValueRow}>
              <span style={styles.resourceNum}>0</span>
              <div style={styles.resourceCircle} />
            </div>
          </div>

          <div style={styles.resourceCard}>
            <span style={styles.resourceLabel}>Largura de banda</span>
            <div style={styles.resourceValueRow}>
              <span style={styles.resourceNum}>600</span>
              <div style={styles.resourceCircle} />
            </div>
          </div>
        </div>

        <div style={styles.resourceInfoBanner}>
          <span style={{ fontSize: 13, color: '#8E8E93', marginRight: 6 }}>ⓘ</span>
          <span style={styles.resourceInfoText}>
            Agora você pode ganhar energia TRON e pontos de largura de banda com TRX para economizar na taxa de gas das transações TRON.
          </span>
        </div>
      </div>

      {/* Resumo da IA Section */}
      <div style={styles.aiSummarySection}>
        <div style={styles.aiHeader}>
          <span style={{ color: '#00D66B' }}>✨</span>
          <span style={styles.aiTitle}>Resumo da IA</span>
        </div>
      </div>

      {/* Bottom Fixed Trade Button */}
      <div style={styles.bottomTradeContainer}>
        <button style={styles.tradeGreenBtn}>
          <SwapIcon size={18} color="#000000" />
          <span>Trade</span>
        </button>
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
    paddingBottom: '100px',
    boxSizing: 'border-box',
    position: 'relative',
    userSelect: 'none',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
  },
  backCircleBtn: {
    backgroundColor: '#1E1F23',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    color: '#FFFFFF',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    paddingBottom: '2px',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  priceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px 8px',
  },
  tokenTitleLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  tokenTitleText: {
    display: 'flex',
    flexDirection: 'column',
  },
  tokenSymbol: {
    fontSize: '18px',
    fontWeight: '700',
  },
  networkSub: {
    fontSize: '12px',
    color: '#8E8E93',
  },
  priceRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: '22px',
    fontWeight: '800',
  },
  priceChangeGreen: {
    fontSize: '12px',
    color: '#00D66B',
    marginTop: '2px',
    fontWeight: '600',
  },
  chartContainer: {
    padding: '16px 16px 8px',
  },
  timeframeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    backgroundColor: '#18191C',
    borderRadius: '20px',
    padding: '3px',
  },
  timeframePill: {
    border: 'none',
    borderRadius: '16px',
    padding: '6px 14px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  balanceCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 16px 12px',
  },
  balanceLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceValues: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    cursor: 'pointer',
  },
  balanceUsd: {
    fontSize: '18px',
    fontWeight: '700',
  },
  balanceTokenAmount: {
    fontSize: '12px',
    color: '#8E8E93',
    marginTop: '2px',
  },
  editBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  editInputRow: {
    display: 'flex',
    gap: '6px',
  },
  editInput: {
    width: '110px',
    backgroundColor: '#1C1D21',
    border: '1.5px solid #00D66B',
    borderRadius: '8px',
    padding: '4px 8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '700',
    outline: 'none',
    textAlign: 'right',
  },
  saveGreenBtn: {
    backgroundColor: '#00D66B',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  editHintText: {
    fontSize: '10px',
    color: '#8E8E93',
  },
  actionButtonsRow: {
    display: 'flex',
    gap: '12px',
    padding: '12px 16px 20px',
  },
  actionPillBtn: {
    flex: 1,
    backgroundColor: '#1E1F23',
    border: 'none',
    borderRadius: '24px',
    padding: '14px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  resourcesSection: {
    padding: '12px 16px',
  },
  resourcesHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '12px',
  },
  resourcesTitle: {
    fontSize: '16px',
    fontWeight: '700',
    borderBottom: '1px dotted #8E8E93',
  },
  resourcesCardsRow: {
    display: 'flex',
    gap: '12px',
  },
  resourceCard: {
    flex: 1,
    backgroundColor: '#1E1F23',
    borderRadius: '16px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '64px',
  },
  resourceLabel: {
    fontSize: '12px',
    color: '#8E8E93',
    fontWeight: '500',
  },
  resourceValueRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  resourceNum: {
    fontSize: '15px',
    fontWeight: '700',
  },
  resourceCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #3A3A3C',
  },
  resourceInfoBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '12px',
  },
  resourceInfoText: {
    fontSize: '11px',
    color: '#8E8E93',
    lineHeight: '1.4',
  },
  aiSummarySection: {
    padding: '16px 16px',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  aiTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomTradeContainer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '430px',
    padding: '12px 16px 24px',
    boxSizing: 'border-box',
    backgroundColor: '#121315',
    borderTop: '1px solid #1E1F23',
  },
  tradeGreenBtn: {
    width: '100%',
    backgroundColor: '#00D66B',
    color: '#000000',
    border: 'none',
    borderRadius: '26px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
};
