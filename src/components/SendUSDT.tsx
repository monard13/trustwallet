import React, { useState } from 'react';
import { TronLogo, AddressBookIcon, ScanQrIcon } from './icons';

interface SendUSDTProps {
  onBack: () => void;
  onSuccessTransaction?: (txHash: string) => void;
}

export const SendUSDT: React.FC<SendUSDTProps> = ({ onBack }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        setRecipientAddress(text);
      } else {
        setRecipientAddress('TNP25yGv12f3kX98qJz39mKLP89aXZt123');
      }
    } catch (e) {
      setRecipientAddress('TNP25yGv12f3kX98qJz39mKLP89aXZt123');
    }
  };

  const handleMaxAmount = () => {
    setAmount('2.085635');
  };

  return (
    <div style={styles.container}>
      {/* Status Bar */}
      <div style={styles.statusBar}>
        <span style={styles.timeText}>14:42</span>
        <div style={styles.statusIcons}>
          <span style={{ fontSize: 10 }}>📶</span>
          <span style={{ fontSize: 10 }}>📡</span>
          <span style={styles.batteryPill}>13</span>
        </div>
      </div>

      {/* Header Bar */}
      <div style={styles.headerBar}>
        <button style={styles.backBtn} onClick={onBack}>
          ←
        </button>

        <h2 style={styles.headerTitle}>Enviar USDT</h2>

        <button style={styles.closeBtn} onClick={onBack}>
          ✕
        </button>
      </div>

      {/* Form Content Area */}
      <div style={styles.formContainer}>
        {/* Field 1: Recipient Address */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Endereço ou nome do domínio</label>
          <div style={styles.inputBoxGreenBorder}>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Pesquisar ou inserir"
              style={styles.textInput}
              onFocus={() => setShowKeyboard(true)}
            />
            <div style={styles.inputRightActions}>
              <button style={styles.colarGreenBtn} onClick={handlePaste}>
                Colar
              </button>
              <button style={styles.iconActionBtn}>
                <AddressBookIcon size={18} color="#00D66B" />
              </button>
              <button style={styles.iconActionBtn}>
                <ScanQrIcon size={18} color="#00D66B" />
              </button>
            </div>
          </div>
        </div>

        {/* Field 2: Destination Network */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Rede de destino</label>
          <div style={styles.networkSelectorPill}>
            <TronLogo size={20} />
            <span style={styles.networkName}>Tron</span>
            <span style={{ fontSize: 10, color: '#8E8E93' }}>▼</span>
          </div>
        </div>

        {/* Field 3: Amount */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel}>Quantia</label>
          <div style={styles.inputBoxStandard}>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="USDT Quantia"
              style={styles.textInput}
              onFocus={() => setShowKeyboard(true)}
            />
            <div style={styles.amountRightGroup}>
              <span style={styles.usdtUnitText}>USDT</span>
              <button style={styles.maxGreenBtn} onClick={handleMaxAmount}>
                Máx.
              </button>
            </div>
          </div>
          <span style={styles.approxUsdText}>≈ ${amount ? (parseFloat(amount) * 0.9991).toFixed(2) : '0.00'}</span>
        </div>

        {/* Next Button */}
        <button style={styles.proximoBtn}>Próximo</button>
      </div>

      {/* Simulated iOS System Dark Keyboard (as in screenshot) */}
      {showKeyboard && (
        <div style={styles.keyboardContainer}>
          {/* Email suggestion bar */}
          <div style={styles.suggestionBar}>
            <div style={styles.suggestionItem}>Ocultar Meu E-mail</div>
            <div style={styles.suggestionDivider} />
            <div style={styles.suggestionItem}>Ocultar Meu E-mail</div>
          </div>

          {/* Key Rows */}
          <div style={styles.keyRow}>
            {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((k) => (
              <div key={k} style={styles.keyTile} onClick={() => setRecipientAddress((prev) => prev + k)}>
                {k}
              </div>
            ))}
          </div>

          <div style={styles.keyRowIndent}>
            {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((k) => (
              <div key={k} style={styles.keyTile} onClick={() => setRecipientAddress((prev) => prev + k)}>
                {k}
              </div>
            ))}
          </div>

          <div style={styles.keyRow}>
            <div style={{ ...styles.keyTileSpecial, flex: 1.2 }}>⇧</div>
            {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((k) => (
              <div key={k} style={styles.keyTile} onClick={() => setRecipientAddress((prev) => prev + k)}>
                {k}
              </div>
            ))}
            <div style={{ ...styles.keyTileSpecial, flex: 1.2 }} onClick={() => setRecipientAddress((prev) => prev.slice(0, -1))}>
              ⌫
            </div>
          </div>

          {/* Bottom Control Row */}
          <div style={styles.keyRowBottom}>
            <div style={{ ...styles.keyTileSpecial, flex: 1.5 }}>123</div>
            <div style={{ ...styles.keyTileSpace, flex: 4.5 }} onClick={() => setRecipientAddress((prev) => prev + ' ')}></div>
            <div style={{ ...styles.keyTileSpecial, flex: 1 }}>@</div>
            <div style={{ ...styles.keyTileSpecial, flex: 1 }}>.</div>
            <div style={styles.keyTileSubmitBlue}>✓</div>
          </div>

          {/* Mic Footer */}
          <div style={styles.keyboardFooter}>
            <span style={{ fontSize: 18, color: '#8E8E93' }}>🎙</span>
          </div>
        </div>
      )}
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
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px 4px',
  },
  timeText: {
    fontWeight: '600',
    fontSize: '14px',
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  batteryPill: {
    backgroundColor: '#3A3A3C',
    borderRadius: '4px',
    padding: '1px 5px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '22px',
    cursor: 'pointer',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: '700',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '18px',
    cursor: 'pointer',
  },
  formContainer: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  fieldGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: '10px',
  },
  inputBoxGreenBorder: {
    backgroundColor: '#1E1F23',
    border: '1.5px solid #00D66B',
    borderRadius: '14px',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBoxStandard: {
    backgroundColor: '#1E1F23',
    border: '1px solid #2C2D32',
    borderRadius: '14px',
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
  },
  inputRightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  colarGreenBtn: {
    background: 'none',
    border: 'none',
    color: '#00D66B',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  iconActionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  networkSelectorPill: {
    backgroundColor: '#1E1F23',
    borderRadius: '20px',
    padding: '8px 14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
    cursor: 'pointer',
  },
  networkName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  amountRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  usdtUnitText: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  maxGreenBtn: {
    background: 'none',
    border: 'none',
    color: '#00D66B',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  approxUsdText: {
    fontSize: '13px',
    color: '#8E8E93',
    marginTop: '8px',
    fontWeight: '500',
  },
  proximoBtn: {
    backgroundColor: '#2E7D52', // Matching exact green tone of Send button in image_1
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '26px',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '700',
    width: '100%',
    cursor: 'pointer',
    marginTop: '30px',
  },
  keyboardContainer: {
    backgroundColor: '#1C1C1E',
    padding: '6px 4px 20px',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  suggestionBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #2C2C2E',
    marginBottom: '8px',
  },
  suggestionItem: {
    fontSize: '13px',
    color: '#FFFFFF',
    padding: '0 12px',
    cursor: 'pointer',
  },
  suggestionDivider: {
    width: '1px',
    height: '14px',
    backgroundColor: '#3A3A3C',
  },
  keyRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    marginBottom: '8px',
  },
  keyRowIndent: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    padding: '0 15px',
    marginBottom: '8px',
  },
  keyTile: {
    flex: 1,
    backgroundColor: '#3A3A3C',
    color: '#FFFFFF',
    borderRadius: '5px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer',
  },
  keyTileSpecial: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    borderRadius: '5px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
  },
  keyRowBottom: {
    display: 'flex',
    gap: '5px',
    padding: '0 4px',
    marginBottom: '8px',
  },
  keyTileSpace: {
    backgroundColor: '#3A3A3C',
    borderRadius: '5px',
    height: '42px',
    cursor: 'pointer',
  },
  keyTileSubmitBlue: {
    flex: 1.5,
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    borderRadius: '5px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  keyboardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '16px',
  },
};
