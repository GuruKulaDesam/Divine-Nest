export interface ParsedTransaction {
  amount: number;
  transactionId: string;
  source: string;
  category: string;
  timestamp: Date;
  rawText: string;
}

const patterns = [
  // BHIM
  /Rs\.?\s?(\d+\.?\d*)\s.*?UPI.*?Txn ID[:\- ]?(\w+)/i,
  // PhonePe
  /Paid\s?₹?(\d+\.?\d*)\s.*?UPI.*?Txn ID[:\- ]?(\w+)/i,
  // Google Pay
  /sent\s?₹?(\d+\.?\d*)\s.*?UPI Ref[:\- ]?(\w+)/i,
];

export function parseUPISMS(message: string, timestamp: Date): ParsedTransaction | null {
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      return {
        amount: parseFloat(match[1]),
        transactionId: match[2],
        source: "SMS",
        category: "UPI",
        timestamp,
        rawText: message,
      };
    }
  }
  return null;
}
