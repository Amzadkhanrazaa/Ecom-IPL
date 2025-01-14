import React from 'react';
import ProductCard from './ProductCard';

const products = [
    { id: 1, name: 'RCB Jersey', price: '₹999' },
    { id: 2, name: 'MI Cap', price: '₹599' },
    { id: 3, name: 'CSK Mug', price: '₹299' },
    // Add more products as needed
];

const ProductList = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;

