export interface I_SellerProfile {
  uid: string;
  displayName: string;
  intro: string;
  country: string;
  city: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  website?: string;
  profileImageID: string;
  categoryIds?: string[];
  status: 'active' | 'inactive' | 'pending' | 'revision';
  createdAt: string;
  updatedAt: string;
  isDraft?: boolean;
  isReview?: boolean;
  requestReview?: boolean;
  workHistory?: string[];
  approval?: {
    approvalStatus: 'pending' | 'approved' | 'rejected' | 'revoked';
    approvedBy?: string;
    approvedAt?: string;
    message?: string;
  };
}
