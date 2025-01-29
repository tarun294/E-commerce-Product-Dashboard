export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc';
}

export type SortOption = {
  label: string;
  value: FilterState['sortBy'];
};