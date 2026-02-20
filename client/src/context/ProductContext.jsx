import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const searchProducts = (query) => {
        if (!query) return [];
        return products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
    };

    return (
        <ProductContext.Provider value={{ products, loading, searchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
