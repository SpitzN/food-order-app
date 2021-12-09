import CartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
  cartItems: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.item.id
      );
      const existingItem = state.cartItems[existingItemIndex];
      let updatedCartItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = updatedItem;
      } else {
        updatedCartItems = state.cartItems.concat(action.item);
      }
      return {
        cartItems: updatedCartItems,
        totalAmount: updatedTotalAmount,
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = item => {
    dispatchCartAction({
      type: 'ADD_TO_CART',
      item: item,
    });
  };

  const removeItemFromCart = item => {
    // dispatchCartAction({
    //   type: 'REMOVE_FROM_CART',
    //   payload: item,
    // });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    clearCart: () => {},
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
