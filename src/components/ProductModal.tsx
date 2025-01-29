import { X, Star } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../lib/utils';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}