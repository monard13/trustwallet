import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AssetDetail } from './components/AssetDetail';
import { SendUSDT } from './components/SendUSDT';
import { BottomNav } from './components/BottomNav';
import { useWalletCrypto } from './hooks/useWalletCrypto';
import { useWalletBalances } from './hooks/useWalletBalances';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'assetDetail' | 'send'>('dashboard');
  const [selectedToken, setSelectedToken] = useState<string>('USDT');

  // Load Paso 1 Crypto Hook (Mnemonic & Derived EVM/Tron Keys)
  const wallet = useWalletCrypto();

  // Load Paso 2 Balance & CoinGecko Pricing Hook with balance editing
  const { portfolio, isLoading: isBalanceLoading, updateTokenBalance } = useWalletBalances(
    wallet.evmAddress,
    wallet.tronAddress
  );

  const handleSelectToken = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    setCurrentScreen('assetDetail');
  };

  const handleSendClick = () => {
    setCurrentScreen('send');
  };

  const selectedTokenData = portfolio?.tokens.find((t) => t.symbol === selectedToken) || null;

  return (
    <div style={{ backgroundColor: '#0A0A0C', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      {/* Phone Screen Frame Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#121315',
          minHeight: '100vh',
          position: 'relative',
          boxShadow: '0 0 40px rgba(0,0,0,0.8)',
        }}
      >
        {currentScreen === 'dashboard' && (
          <Dashboard
            portfolio={portfolio}
            isLoading={isBalanceLoading}
            onSelectToken={handleSelectToken}
            onSendClick={handleSendClick}
          />
        )}

        {currentScreen === 'assetDetail' && (
          <AssetDetail
            tokenData={selectedTokenData}
            onBack={() => setCurrentScreen('dashboard')}
            onSendClick={handleSendClick}
            onUpdateBalance={updateTokenBalance}
          />
        )}

        {currentScreen === 'send' && (
          <SendUSDT
            onBack={() => setCurrentScreen('dashboard')}
          />
        )}

        {/* Floating Pill Dock Navigation */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      </div>
    </div>
  );
};

export default App;
