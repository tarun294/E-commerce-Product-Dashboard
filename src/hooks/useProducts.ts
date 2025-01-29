import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, FilterState } from '../types/product';

const PRODUCTS_PER_PAGE = 8;

async function fetchProducts(
  page: number,
  filters: FilterState
): Promise<Product[]> {
  const response = await fetch('https://fakestoreapi.com/products');
  let products: Product[] = await response.json();

  // Apply filters
  if (filters.category) {
    products = products.filter((p) => p.category === filters.category);
  }
  if (filters.minPrice > 0) {
    products = products.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice > 0) {
    products = products.filter((p) => p.price <= filters.maxPrice);
  }
  if (filters.minRating > 0) {
    products = products.filter((p) => p.rating.rate >= filters.minRating);
  }

  // Apply sorting
  products.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  // Simulate pagination
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  return products.slice(start, end);
}

export function useProducts(filters: FilterState) {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam, filters),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PRODUCTS_PER_PAGE ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });
}