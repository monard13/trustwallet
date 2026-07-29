import { useState, useCallback, useEffect } from 'react';
import { BalanceService, WalletPortfolio } from '../services/balanceService';

export interface UseWalletBalancesResult {
  portfolio: WalletPortfolio | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateTokenBalance: (symbol: string, newBalance: number) => void;
  customBalances: Record<string, number>;
}

const CUSTOM_BALANCES_KEY = 'trust_wallet_custom_balances';

export const useWalletBalances = (
  evmAddress: string | null,
  tronAddress: string | null
): UseWalletBalancesResult => {
  const [portfolio, setPortfolio] = useState<WalletPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load custom balances override from storage, defaulting to 998,416.13 USDT and 137.93 TRX
  const [customBalances, setCustomBalances] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(CUSTOM_BALANCES_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // Fallback
        }
      }
    }
    return { USDT: 998416.13, TRX: 137.93 };
  });

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await BalanceService.getWalletPortfolio(evmAddress, tronAddress);

      if (data && data.tokens) {
        let newTotalUsd = 0;
        data.tokens = data.tokens.map((token) => {
          if (customBalances[token.symbol] !== undefined) {
            const customBal = customBalances[token.symbol];
            const customValueUsd = customBal * token.priceUsd;
            newTotalUsd += customValueUsd;
            return {
              ...token,
              balanceRaw: customBal.toString(),
              balanceFormatted: customBal,
              valueUsd: customValueUsd,
            };
          }
          newTotalUsd += token.valueUsd;
          return token;
        });
        data.totalUsd = newTotalUsd;
      }

      setPortfolio(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener los balances de la red.');
    } finally {
      setIsLoading(false);
    }
  }, [evmAddress, tronAddress, customBalances]);

  /**
   * Updates a token's balance manually
   */
  const updateTokenBalance = useCallback((symbol: string, newBalance: number) => {
    const updated = {
      ...customBalances,
      [symbol]: newBalance,
    };
    setCustomBalances(updated);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CUSTOM_BALANCES_KEY, JSON.stringify(updated));
    }
  }, [customBalances]);

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 30000);
    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  return {
    portfolio,
    isLoading,
    error,
    refetch: fetchPortfolio,
    updateTokenBalance,
    customBalances,
  };
};
