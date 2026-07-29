import { TronWeb } from 'tronweb';

const TRONGRID_FULL_NODE = 'https://api.trongrid.io';
const TRON_USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

export interface SendTransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export class TronTransactionService {
  /**
   * Validates if a string is a valid Tron Base58 address starting with 'T'.
   */
  public static validateTronAddress(address: string): boolean {
    if (!address || typeof address !== 'string') return false;
    const clean = address.trim();
    return clean.startsWith('T') && clean.length === 34;
  }

  /**
   * Sends TRC-20 USDT token transaction on Tron network.
   * 1. Validates recipient address
   * 2. Creates smart contract transfer transaction
   * 3. Signs with private key
   * 4. Broadcasts to Tron network
   * 5. Handles energy/bandwidth errors gracefully
   */
  public static async sendUsdtTransaction(
    senderPrivateKey: string,
    recipientAddress: string,
    amountUsdt: number
  ): Promise<SendTransactionResult> {
    try {
      const cleanRecipient = recipientAddress.trim();

      // 1. Validate Recipient Address
      if (!this.validateTronAddress(cleanRecipient)) {
        return {
          success: false,
          error: 'Dirección de destino de Tron inválida. Debe comenzar por "T".',
        };
      }

      if (amountUsdt <= 0) {
        return {
          success: false,
          error: 'El monto ingresado debe ser mayor a cero.',
        };
      }

      // Initialize TronWeb instance with full node
      const rawPrivateKey = senderPrivateKey.startsWith('0x')
        ? senderPrivateKey.slice(2)
        : senderPrivateKey;

      const tronWeb = new TronWeb({
        fullHost: TRONGRID_FULL_NODE,
        privateKey: rawPrivateKey,
      });

      // Amount in SUN units (USDT has 6 decimals: 1 USDT = 1,000,000 SUN)
      const amountSun = Math.floor(amountUsdt * 1000000);

      // 2. Trigger smart contract transfer
      const parameter = [
        { type: 'address', value: cleanRecipient },
        { type: 'uint256', value: amountSun },
      ];

      const options = {
        feeLimit: 100000000, // 100 TRX fee limit for TRC-20 execution
      };

      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        TRON_USDT_CONTRACT,
        'transfer(address,uint256)',
        options,
        parameter,
        tronWeb.defaultAddress.hex
      );

      if (!transaction.result || !transaction.result.result) {
        return {
          success: false,
          error: 'Error al construir la transacción TRC-20 en la red de Tron.',
        };
      }

      // 3. Sign transaction
      const signedTx = await tronWeb.trx.sign(transaction.transaction, rawPrivateKey);

      // 4. Broadcast transaction
      const broadcast = await tronWeb.trx.sendRawTransaction(signedTx);

      if (broadcast.result || broadcast.code === 'SUCCESS') {
        const txHash = broadcast.txid || transaction.transaction.txID;
        return {
          success: true,
          txHash,
        };
      } else {
        const errorMsg = broadcast.message
          ? Buffer.from(broadcast.message, 'hex').toString('utf8')
          : 'Error en la transmisión de la transacción.';

        if (errorMsg.includes('BANDWITH') || errorMsg.includes('ENERGY')) {
          return {
            success: false,
            error: 'Recursos insuficientes (Energía o Ancho de banda). Necesitas más TRX en tu balance.',
          };
        }

        return {
          success: false,
          error: `Error de red Tron: ${errorMsg}`,
        };
      }
    } catch (error: any) {
      const msg = error?.message || 'Error inesperado al enviar la transacción.';
      if (msg.includes('energy') || msg.includes('bandwidth')) {
        return {
          success: false,
          error: 'Falta Energía o Ancho de banda en Tron. Por favor congela TRX o recarga tu saldo.',
        };
      }
      return {
        success: false,
        error: msg,
      };
    }
  }
}
