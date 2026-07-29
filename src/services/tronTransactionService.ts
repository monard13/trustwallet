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
   */
  public static async sendUsdtTransaction(
    senderPrivateKey: string,
    recipientAddress: string,
    amountUsdt: number
  ): Promise<SendTransactionResult> {
    try {
      const cleanRecipient = recipientAddress.trim();

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

      const rawPrivateKey = senderPrivateKey.startsWith('0x')
        ? senderPrivateKey.slice(2)
        : senderPrivateKey;

      const tronWeb = new TronWeb({
        fullHost: TRONGRID_FULL_NODE,
        privateKey: rawPrivateKey,
      });

      const amountSun = Math.floor(amountUsdt * 1000000);

      const parameter = [
        { type: 'address', value: cleanRecipient },
        { type: 'uint256', value: amountSun },
      ];

      const options = {
        feeLimit: 100000000,
      };

      const ownerHex = tronWeb.defaultAddress.hex ? String(tronWeb.defaultAddress.hex) : '';

      const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
        TRON_USDT_CONTRACT,
        'transfer(address,uint256)',
        options,
        parameter,
        ownerHex
      );

      if (!transaction.result || !transaction.result.result) {
        return {
          success: false,
          error: 'Error al construir la transacción TRC-20 en la red de Tron.',
        };
      }

      const signedTx = await tronWeb.trx.sign(transaction.transaction, rawPrivateKey);
      const broadcast = await tronWeb.trx.sendRawTransaction(signedTx);

      const isSuccess = broadcast.result || (broadcast as any).code === 'SUCCESS';

      if (isSuccess) {
        const txHash = broadcast.txid || transaction.transaction.txID;
        return {
          success: true,
          txHash,
        };
      } else {
        const errorMsg = broadcast.message
          ? Buffer.from(broadcast.message, 'hex').toString('utf8')
          : 'Error en la transmisión de la transacción.';

        return {
          success: false,
          error: `Error de red Tron: ${errorMsg}`,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || 'Error al enviar la transacción.',
      };
    }
  }
}
