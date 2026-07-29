/**
 * Wallet Data Structures & Types
 */

export enum NetworkType {
  ETHEREUM = 'ETHEREUM',
  POLYGON = 'POLYGON',
  TRON = 'TRON',
}

export interface DerivedWallet {
  network: NetworkType;
  address: string;
  publicKey: string;
  privateKey: string;
  derivationPath: string;
}

export interface MultiChainWallet {
  mnemonic: string;
  evmWallet: DerivedWallet; // Serves both Ethereum & Polygon (EVM compatible)
  tronWallet: DerivedWallet;
}

export interface StoredWalletCredentials {
  mnemonic: string;
  evmPrivateKey: string;
  tronPrivateKey: string;
  createdAt: number;
}

export interface WalletState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  mnemonic: string | null;
  evmAddress: string | null;
  tronAddress: string | null;
}
