import { ParsedConfirmedTransaction, ParsedInstruction } from "@solana/web3.js";
import { Marketplace, NFTSale, Transfer } from "./types";
import { LamportPerSOL } from "../solana";

export function getTransfersFromInnerInstructions(
  innerInstructions: any
): Transfer[] {
  if (!innerInstructions) {
    return [];
  }
  const instructions = innerInstructions.instructions as ParsedInstruction[];
  if (!instructions[0]?.parsed) {
    return [];
  }

  return instructions
    .filter((i: any) => {
      return Boolean(i.parsed.info.lamports) && i.parsed.type === "transfer";
    })
    .map<Transfer>((i: any) => {
      const { info } = i.parsed;
      return {
        from: info.source,
        to: info.destination,
        revenue: {
          amount: info.lamports,
          symbol: "lamport",
        },
      };
    });
}

export function parseNFTSaleOnTx(
  txResp: ParsedConfirmedTransaction,
  marketplace: Marketplace,
  transferInstructionIndex: number = 0
): NFTSale | null {
  if (!txResp.meta?.logMessages) {
    return null;
  }
  const transactionExecByMarketplaceProgram = txResp.meta.logMessages.filter(
    (msg) => msg.includes(marketplace.programId)
  ).length;

  if (!transactionExecByMarketplaceProgram) {
    return null;
  }
  const { innerInstructions } = txResp.meta;
  if (
    !innerInstructions ||
    innerInstructions.length < transferInstructionIndex + 1
  ) {
    return null;
  }
  if (!txResp?.blockTime) {
    return null;
  }
  if (!txResp.meta?.preTokenBalances) {
    return null;
  }

  const token = txResp.meta?.preTokenBalances[0]?.mint;
  if (!token) {
    return null;
  }

  const transfers = getTransfersFromInnerInstructions(
    innerInstructions[transferInstructionIndex]
  );
  if (!transfers.length) {
    return null;
  }

  return {
    transaction: txResp.transaction.signatures[0],
    transfers,
    token,
    soldAt: new Date(txResp.blockTime * 1000),
    getPriceInLamport(): number {
      return this.transfers.reduce<number>((prev, current) => {
        return prev + current.revenue.amount;
      }, 0);
    },
    getPriceInSOL() {
      // There are many cases that lamport stored contains floating points
      // For example: https://explorer.solana.com/tx/5YHfVoe9jSBTa3FWcYV11i6MNtPALTpot1ca6PydLx4nGNyCPc7cghwbz6VXgAyMrxUZDkkp2QoYfot74ckLsUYG
      // Generally, there should be no reason for the last digit of lamport not to be 0
      // Rounding it here ensures we get a more accurate result for sale.
      // That's what the explorers do.
      const rounded = Math.round(this.getPriceInLamport() / 10) * 10;

      return rounded / LamportPerSOL;
    },
    marketplace,
  };
}
