import React from 'react';
import ProductCard from '../ProductCard';

export default ({ products }) => {
    return <div
        className={"recommendations-container"}
    >
        {products.map((product) => {
            return <ProductCard
                key={product.id}
                product={product}
            />
        })}
    </div>
}