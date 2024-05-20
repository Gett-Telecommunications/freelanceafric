export interface I_Category {
  id: string;
  icon: string;
  slug: string;
  name: string;
  cardIntro: string;
  description: string;
  image?: string;
  background: {
    style: string;
    image?: string;
  };
  action: {
    url: string;
    label: string;
  };
}
