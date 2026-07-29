import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { TronWeb } from 'tronweb';
import {
  DerivedWallet,
  MultiChainWallet,
  NetworkType,
  StoredWalletCredentials,
} from '../types/wallet';

const EVM_DERIVATION_PATH = "m/44'/60'/0'/0/0";
const TRON_DERIVATION_PATH = "m/44'/195'/0'/0/0";
const KEYCHAIN_SERVICE_NAME = 'com.trustwallet.app.credentials';

export class CryptoService {
  /**
   * 1. Generates a new 12-word BIP-39 mnemonic seed phrase in English.
   */
  public static generateMnemonic(): string {
    try {
      const mnemonic = bip39.generateMnemonic(128);
      if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Generated mnemonic failed validity check.');
      }
      return mnemonic;
    } catch (error: any) {
      throw new Error(`Failed to generate mnemonic: ${error.message}`);
    }
  }

  /**
   * Validates if a phrase is a valid BIP-39 mnemonic.
   */
  public static validateMnemonic(mnemonic: string): boolean {
    if (!mnemonic || typeof mnemonic !== 'string') return false;
    const cleanMnemonic = mnemonic.trim().toLowerCase();
    return bip39.validateMnemonic(cleanMnemonic);
  }

  /**
   * 2. Derives an EVM wallet (Ethereum & Polygon) from a mnemonic phrase.
   * Path: m/44'/60'/0'/0/0
   */
  public static deriveEvmWallet(mnemonic: string): DerivedWallet {
    try {
      const cleanMnemonic = mnemonic.trim().toLowerCase();
      if (!this.validateMnemonic(cleanMnemonic)) {
        throw new Error('Invalid BIP-39 mnemonic phrase supplied.');
      }

      const hdWallet = ethers.HDNodeWallet.fromPhrase(
        cleanMnemonic,
        '',
        EVM_DERIVATION_PATH
      );

      return {
        network: NetworkType.ETHEREUM,
        address: hdWallet.address,
        publicKey: hdWallet.publicKey,
        privateKey: hdWallet.privateKey,
        derivationPath: EVM_DERIVATION_PATH,
      };
    } catch (error: any) {
      throw new Error(`EVM wallet derivation failed: ${error.message}`);
    }
  }

  /**
   * 3. Derives a Tron wallet from the same mnemonic phrase.
   * Path: m/44'/195'/0'/0/0
   */
  public static deriveTronWallet(mnemonic: string): DerivedWallet {
    try {
      const cleanMnemonic = mnemonic.trim().toLowerCase();
      if (!this.validateMnemonic(cleanMnemonic)) {
        throw new Error('Invalid BIP-39 mnemonic phrase supplied.');
      }

      const hdWallet = ethers.HDNodeWallet.fromPhrase(
        cleanMnemonic,
        '',
        TRON_DERIVATION_PATH
      );

      const rawPrivateKey = hdWallet.privateKey.startsWith('0x')
        ? hdWallet.privateKey.slice(2)
        : hdWallet.privateKey;

      const tronAddress = TronWeb.address.fromPrivateKey(rawPrivateKey);

      if (!tronAddress || typeof tronAddress !== 'string' || !tronAddress.startsWith('T')) {
        throw new Error('Generated Tron address is invalid.');
      }

      return {
        network: NetworkType.TRON,
        address: tronAddress,
        publicKey: hdWallet.publicKey,
        privateKey: hdWallet.privateKey,
        derivationPath: TRON_DERIVATION_PATH,
      };
    } catch (error: any) {
      throw new Error(`Tron wallet derivation failed: ${error.message}`);
    }
  }

  /**
   * Helper: Derives all supported chain wallets (EVM & Tron) from a seed phrase.
   */
  public static deriveMultiChainWallet(mnemonic: string): MultiChainWallet {
    const cleanMnemonic = mnemonic.trim().toLowerCase();
    const evmWallet = this.deriveEvmWallet(cleanMnemonic);
    const tronWallet = this.deriveTronWallet(cleanMnemonic);

    return {
      mnemonic: cleanMnemonic,
      evmWallet,
      tronWallet,
    };
  }

  /**
   * 4. Secure Storage: Native Keychain with Web LocalStorage fallback
   */
  public static async saveWalletCredentials(credentials: StoredWalletCredentials): Promise<boolean> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(KEYCHAIN_SERVICE_NAME, JSON.stringify(credentials));
      return true;
    }
    return false;
  }

  /**
   * Loads wallet credentials securely
   */
  public static async loadWalletCredentials(): Promise<StoredWalletCredentials | null> {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = window.localStorage.getItem(KEYCHAIN_SERVICE_NAME);
      if (item) {
        return JSON.parse(item);
      }
    }
    return null;
  }

  /**
   * Clears stored wallet credentials
   */
  public static async clearWalletCredentials(): Promise<boolean> {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(KEYCHAIN_SERVICE_NAME);
    }
    return true;
  }
}
