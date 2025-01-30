import { useInfiniteQuery } from "@tanstack/react-query";
import { Product, FilterState } from "../types/product";

const PRODUCTS_PER_PAGE = 8;

async function fetchProducts(
  page: number,
  filters: FilterState
): Promise<{ products: Product[]; total: number }> {
  // FakeStore API supports limit and page parameters
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${PRODUCTS_PER_PAGE}&offset=${
      (page - 1) * PRODUCTS_PER_PAGE
    }`
  );
  const products: Product[] = await response.json();

  // Get total count for proper pagination
  const totalResponse = await fetch("https://fakestoreapi.com/products");
  const allProducts: Product[] = await totalResponse.json();

  // Apply filters
  let filteredProducts = products;
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === filters.category
    );
  }
  if (filters.minPrice > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= filters.minPrice
    );
  }
  if (filters.maxPrice > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= filters.maxPrice
    );
  }
  if (filters.minRating > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => p.rating.rate >= filters.minRating
    );
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  // Calculate total filtered items for pagination
  const filteredTotal = allProducts.filter((p) => {
    let passes = true;
    if (filters.category) passes = passes && p.category === filters.category;
    if (filters.minPrice > 0) passes = passes && p.price >= filters.minPrice;
    if (filters.maxPrice > 0) passes = passes && p.price <= filters.maxPrice;
    if (filters.minRating > 0)
      passes = passes && p.rating.rate >= filters.minRating;
    return passes;
  }).length;

  return {
    products: filteredProducts,
    total: filteredTotal,
  };
}

export function useProducts(filters: FilterState) {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchProducts(pageParam, filters);
      return {
        products: result.products,
        nextPage: pageParam + 1,
        total: result.total,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / PRODUCTS_PER_PAGE);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}
