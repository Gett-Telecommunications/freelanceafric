export interface I_Gig {
  id: string;
  title: string;
  categories: string[];
  description: string;
  price: number;
  duration: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  sellerUid: string;
  approval?: {
    approvalStatus: 'pending' | 'approved' | 'rejected' | 'revoked';
    approvedBy: string;
    approvedAt: string;
    message?: string;
  };
}
