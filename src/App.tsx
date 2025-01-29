import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Filters } from './components/Filters';
import { useProducts } from './hooks/useProducts';
import { Product, FilterState } from './types/product';

const queryClient = new QueryClient();

function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 0,
    minRating: 0,
    sortBy: 'price-asc',
  });

  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProducts(filters);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const categories = React.useMemo(() => {
    if (!data) return [];
    const allCategories = new Set<string>();
    data.pages.forEach((page) => {
      page.forEach((product) => allCategories.add(product.category));
    });
    return Array.from(allCategories);
  }, [data]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Product Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Filters
              filters={filters}
              categories={categories}
              onFilterChange={setFilters}
            />
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.pages.map((page, i) => (
                    <React.Fragment key={i}>
                      {page.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={setSelectedProduct}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>

                <div
                  ref={ref}
                  className="flex justify-center mt-8"
                >
                  {isFetchingNextPage && (
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;