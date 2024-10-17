export interface I_Gig {
  id: string;
  imageId: string;
  title: string;
  categories: string[];
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'deleted';
  createdAt: string;
  updatedAt: string;
  sellerUID: string;
  isDraft?: boolean;
  isReview?: boolean;
  approval?: {
    approvalStatus: 'pending' | 'approved' | 'rejected' | 'revoked';
    approvedBy: string;
    approvedAt: string;
    message?: string;
  };
}
