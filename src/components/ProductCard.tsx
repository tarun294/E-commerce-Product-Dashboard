import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types/product';
import { cn, formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <div className="relative pt-[100%]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center">
            <Star
              className={cn(
                'w-4 h-4',
                product.rating.rate >= 4 ? 'text-yellow-400' : 'text-gray-300'
              )}
              fill="currentColor"
            />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.rate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}