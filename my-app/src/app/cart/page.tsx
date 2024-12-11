'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import CartItem from '../../components/CartItem'
import Link from 'next/link'

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty. <Link href="/" className="text-blue-500 hover:underline">Start shopping</Link></p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="text-2xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  )
}

