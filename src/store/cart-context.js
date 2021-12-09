import React from 'react';

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  clearCart: () => {},
  addToCart: item => {},
  removeFromCart: id => {},
});

export default CartContext;
