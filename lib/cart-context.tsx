"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { Product } from "./products"

export interface CartItem {
  productId: number
  slug: string
  name: string
  image: string
  presentation: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number; presentation: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; presentation: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.presentation === action.payload.presentation
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.payload.quantity
        return { ...state, items: updatedItems, isOpen: true }
      }

      return { ...state, items: [...state.items, action.payload], isOpen: true }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.presentation === action.payload.presentation
            )
        ),
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.productId === action.payload.productId &&
                item.presentation === action.payload.presentation
              )
          ),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.presentation === action.payload.presentation
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "LOAD_CART":
      return { ...state, items: action.payload }

    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, presentation: string, price: number, quantity?: number) => void
  removeItem: (productId: number, presentation: string) => void
  updateQuantity: (productId: number, presentation: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("almatech-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch {
        console.error("Error loading cart from localStorage")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("almatech-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product, presentation: string, price: number, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        presentation,
        price,
        quantity,
      },
    })
  }

  const removeItem = (productId: number, presentation: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, presentation } })
  }

  const updateQuantity = (productId: number, presentation: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, presentation, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
