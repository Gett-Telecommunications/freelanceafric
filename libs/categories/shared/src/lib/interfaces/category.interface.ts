export interface I_Category {
  id: string;
  icon: string;
  slug: string;
  name: string;
  cardIntro: string;
  description: string;
  imageId?: string;
  background: {
    style: string;
    imageId?: string;
  };
  action: {
    link: string;
    label: string;
  };
}
