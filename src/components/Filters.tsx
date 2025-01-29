import React from 'react';
import { FilterState, SortOption } from '../types/product';

interface FiltersProps {
  filters: FilterState;
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

const sortOptions: SortOption[] = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating-desc' },
];

export function Filters({ filters, categories, onFilterChange }: FiltersProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: name.includes('Price') ? Number(value) : value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="flex gap-4 mt-1">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Rating
        </label>
        <input
          type="number"
          name="minRating"
          value={filters.minRating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sort By</label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}