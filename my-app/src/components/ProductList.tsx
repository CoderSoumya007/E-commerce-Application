'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { Product } from '../types/product'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const dispatch = useDispatch()
  const { isVisible, message, showToast, hideToast } = useToast()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    showToast(`${product.title} added to cart!`)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-background-light rounded-lg p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-contain mb-4 cursor-pointer" 
              onClick={() => setSelectedProduct(product)}
            />
            <h3 className="text-lg font-semibold mb-2 flex-grow">{product.title}</h3>
            <p className="text-secondary mb-4">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-background-light p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:flex-row">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full md:w-1/2 object-contain mb-4 md:mb-0 md:mr-4" />
              <div>
                <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                <p className="text-2xl text-secondary mb-4">${selectedProduct.price.toFixed(2)}</p>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toast message={message} isVisible={isVisible} onClose={hideToast} />
    </>
  )
}

