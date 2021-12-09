import React, { useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const toggleShowCart = () => {
    setCartIsShown(true);
  };

  const toggleHideCart = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={toggleHideCart} />}
      <Header onShowCart={toggleShowCart}>Foofd App</Header>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
