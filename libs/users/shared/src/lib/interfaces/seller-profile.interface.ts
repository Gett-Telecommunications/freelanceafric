export interface I_SellerProfile {
  uid: string;
  displayName: string;
  intro: string;
  country: string;
  city: string;
  profileImageID: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  draft?: I_SellerProfile;
  requestReview?: boolean;
  approval?: {
    approvalStatus: 'pending' | 'approved' | 'rejected' | 'revoked';
    approvedBy?: string;
    approvedAt?: string;
    message?: string;
  };
}
