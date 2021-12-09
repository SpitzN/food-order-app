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
      const existingItemToRemoveIndex = state.cartItems.findIndex(
        item => item.id === action.id
      );
      const ItemToRemove = state.cartItems[existingItemToRemoveIndex];

      const decreasedTotalAmount = state.totalAmount - ItemToRemove.price;

      let updatedCartItemsRemove;
      if (ItemToRemove.amount === 1) {
        updatedCartItemsRemove = state.cartItems.filter(
          item => item.id !== action.id
        );
      } else {
        const updatedItem = {
          ...ItemToRemove,
          amount: ItemToRemove.amount - 1,
        };
        updatedCartItemsRemove = [...state.cartItems];
        updatedCartItemsRemove[existingItemToRemoveIndex] = updatedItem;
      }

      return {
        cartItems: updatedCartItemsRemove,
        totalAmount: decreasedTotalAmount,
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

  const removeItemFromCart = id => {
    dispatchCartAction({
      type: 'REMOVE_FROM_CART',
      id,
    });
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
