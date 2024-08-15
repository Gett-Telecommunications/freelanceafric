export interface I_Order {
  // Similar to the reference in the payments collection
  id: string;
  buyerUID: string;
  sellerUID: string;
  gigId: string;
  extras: { extraId: string; extraOptions: string[] }[];
  sellerStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  startDate?: string;
  endDate?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED' | 'FAILED';
  buyerFurtherDetails?: string;
  sellerRejectReason?: string;
}
