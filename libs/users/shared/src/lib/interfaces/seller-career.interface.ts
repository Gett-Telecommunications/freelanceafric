export interface I_SellerCareer {
  uid: string;
  occupation: string;
  overview: string;
  experience: string;
  skills: string;
  education: string;
  createdAt: string;
  updatedAt: string;
  isDraft?: boolean;
  isReview?: boolean;
  status: 'active' | 'inactive' | 'pending';
  requestReview?: boolean;
  approval?: {
    approvalStatus: 'approved' | 'rejected';
    approvedBy: string;
    approvedAt: string;
    message: string;
  };
}
