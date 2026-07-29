import { useState, useCallback, useEffect } from 'react';
import { CryptoService } from '../services/cryptoService';
import { MultiChainWallet, WalletState } from '../types/wallet';

/**
 * useWalletCrypto Hook
 * React hook providing non-custodial wallet lifecycle management:
 * - Generate new 12-word seed phrase
 * - Derive EVM (Ethereum/Polygon) & Tron addresses
 * - Save & Load credentials from react-native-keychain
 * - Wipe wallet state
 */
export const useWalletCrypto = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isInitialized: false,
    isLoading: true,
    error: null,
    mnemonic: null,
    evmAddress: null,
    tronAddress: null,
  });

  /**
   * Helper to set error state cleanly
   */
  const setError = useCallback((errorMessage: string | null) => {
    setWalletState((prev) => ({
      ...prev,
      isLoading: false,
      error: errorMessage,
    }));
  }, []);

  /**
   * Loads existing saved credentials from react-native-keychain on launch
   */
  const loadExistingWallet = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const credentials = await CryptoService.loadWalletCredentials();
      if (credentials && credentials.mnemonic) {
        const derived = CryptoService.deriveMultiChainWallet(credentials.mnemonic);
        setWalletState({
          isInitialized: true,
          isLoading: false,
          error: null,
          mnemonic: derived.mnemonic,
          evmAddress: derived.evmWallet.address,
          tronAddress: derived.tronWallet.address,
        });
        return derived;
      } else {
        setWalletState((prev) => ({
          ...prev,
          isInitialized: false,
          isLoading: false,
        }));
        return null;
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load wallet credentials');
      return null;
    }
  }, [setError]);

  /**
   * 1. Creates a brand new wallet:
   * - Generates 12-word seed
   * - Derives EVM & Tron keys
   * - Saves credentials to Secure Keychain
   */
  const createNewWallet = useCallback(async (): Promise<MultiChainWallet | null> => {
    setWalletState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Step 1: Generate 12-word seed phrase
      const mnemonic = CryptoService.generateMnemonic();

      // Step 2 & 3: Derive EVM and Tron wallets
      const wallet = CryptoService.deriveMultiChainWallet(mnemonic);

      // Step 4: Persist securely in react-native-keychain
      await CryptoService.saveWalletCredentials({
        mnemonic: wallet.mnemonic,
        evmPrivateKey: wallet.evmWallet.privateKey,
        tronPrivateKey: wallet.tronWallet.privateKey,
        createdAt: Date.now(),
      });

      setWalletState({
        isInitialized: true,
        isLoading: false,
        error: null,
        mnemonic: wallet.mnemonic,
        evmAddress: wallet.evmWallet.address,
        tronAddress: wallet.tronWallet.address,
      });

      return wallet;
    } catch (error: any) {
      setError(error.message || 'Failed to create new wallet');
      return null;
    }
  }, [setError]);

  /**
   * 2. Imports an existing wallet using a 12 or 24-word seed phrase:
   * - Validates mnemonic
   * - Derives EVM & Tron keys
   * - Saves credentials to Secure Keychain
   */
  const importWallet = useCallback(
    async (mnemonicInput: string): Promise<MultiChainWallet | null> => {
      setWalletState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const cleanMnemonic = mnemonicInput.trim().toLowerCase();
        if (!CryptoService.validateMnemonic(cleanMnemonic)) {
          throw new Error('Frase mnemónica inválida. Asegúrate de ingresar 12 palabras válidas.');
        }

        const wallet = CryptoService.deriveMultiChainWallet(cleanMnemonic);

        await CryptoService.saveWalletCredentials({
          mnemonic: wallet.mnemonic,
          evmPrivateKey: wallet.evmWallet.privateKey,
          tronPrivateKey: wallet.tronWallet.privateKey,
          createdAt: Date.now(),
        });

        setWalletState({
          isInitialized: true,
          isLoading: false,
          error: null,
          mnemonic: wallet.mnemonic,
          evmAddress: wallet.evmWallet.address,
          tronAddress: wallet.tronWallet.address,
        });

        return wallet;
      } catch (error: any) {
        setError(error.message || 'Error al importar la billetera');
        return null;
      }
    },
    [setError]
  );

  /**
   * Wipes stored wallet credentials (Logout / Reset)
   */
  const resetWallet = useCallback(async (): Promise<boolean> => {
    setWalletState((prev) => ({ ...prev, isLoading: true }));
    try {
      await CryptoService.clearWalletCredentials();
      setWalletState({
        isInitialized: false,
        isLoading: false,
        error: null,
        mnemonic: null,
        evmAddress: null,
        tronAddress: null,
      });
      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to reset wallet credentials');
      return false;
    }
  }, [setError]);

  // Load existing wallet state on hook mount
  useEffect(() => {
    loadExistingWallet();
  }, [loadExistingWallet]);

  return {
    ...walletState,
    createNewWallet,
    importWallet,
    loadExistingWallet,
    resetWallet,
    validateMnemonic: CryptoService.validateMnemonic,
  };
};
