export type T_FavoriteTypes = 'gig' | 'seller';

export interface I_Favorite {
  id: string;
  type: T_FavoriteTypes;
  itemId: string;
  createdAt: string;
  comment?: string;
}
