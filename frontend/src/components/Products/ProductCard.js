import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded shadow-md p-4">
            <img src={`/images/${product.name.toLowerCase().replace(' ', '-')}-image.jpg`} alt={product.name} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-xl mb-2">{product.name}</h3>
            <p className="text-lg text-gray-600 mb-4">{product.price}</p>
            <button className="w-full bg-blue-500 text-white p-2 rounded">Buy Now</button>
        </div>
    );
};

export default ProductCard;
