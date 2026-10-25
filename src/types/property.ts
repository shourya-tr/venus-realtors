export type Property = {
  id: string;
  created_at: string;
  name: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  youtube_url: string | null;
  photo_urls: string[];
  is_active: boolean;
};

export type Lead = {
  id: string;
  created_at: string;
  property_id: string | null;
  name: string;
  phone: string;
};
