'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactPlayer from 'react-player'
import { addToCart } from '../store/cartSlice'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

interface ProductOffer {
  timestamp: number
  product: Product
}

const productOffers: ProductOffer[] = [
  {
    timestamp: 10,
    product: {
      id: 1,
      title: "Featured Product A",
      price: 19.99,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    }
  },
  {
    timestamp: 20,
    product: {
      id: 2,
      title: "Featured Product B",
      price: 29.99,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    }
  }
]

export default function InteractiveVideoPlayer() {
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [activeOffer, setActiveOffer] = useState<ProductOffer | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const offer = productOffers.find(offer => Math.abs(offer.timestamp - playedSeconds) < 0.5)
    if (offer) {
      setActiveOffer(offer)
      setTimeout(() => setActiveOffer(null), 5000)
    }
  }, [playedSeconds])

  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds)
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    setActiveOffer(null)
  }

  return (
    <div className="relative">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        controls
        width="100%"
        height="auto"
        onProgress={handleProgress}
      />
      {activeOffer && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-800  font-semibold mb-2">{activeOffer.product.title}</h3>
          <img src={activeOffer.product.image} alt={activeOffer.product.title} className="w-24 h-24 object-contain mb-2" />
          <p className="text-gray-600 mb-2">${activeOffer.product.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(activeOffer.product)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  )
}

