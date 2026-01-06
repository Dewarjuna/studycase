import { memo } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = memo(function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isNew={index < 3}
        />
      ))}
    </div>
  );
});

export default ProductGrid;