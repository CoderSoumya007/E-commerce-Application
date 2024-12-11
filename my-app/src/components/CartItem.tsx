import { useDispatch } from 'react-redux'
import { removeFromCart } from '../store/cartSlice'
import { CartItem as CartItemType } from '../types/product'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
      >
        Remove
      </button>
    </div>
  )
}

