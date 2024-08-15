export interface I_Payment {
  id: string;
  senderUID: string;
  amount: number;
  currency: string;
  country: 'KE';
  status: 'INITIATED' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  type:
    | 'ORDER'
    | 'PARTIAL_PAYMENT'
    | 'REFUND'
    | 'CHARGE_BACK'
    | 'PAYMENT_REQUEST'
    | 'REVERSAL'
    | 'AUTHORIZATION'
    | 'CANCEL'
    | 'REVERSAL_REQUEST'
    | 'TRANSFER';
  createdAt: string;
  // For the first payment (type: ORDER), the reference is the same as the id but it changes for all other types to reflect the original order
  // This value is also the ID for the order in the DB
  reference: string;
}
