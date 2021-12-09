import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCardButton = props => {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;
  const [buttonHighlight, setButtonHighlight] = useState(false);

  const numberOfCartItems = cartItems.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonHighlight ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setButtonHighlight(true);

    // set timeout to remove highlight after 300 ms
    const cleanup = setTimeout(() => {
      setButtonHighlight(false);
    }, 300);

    return () => {
      clearTimeout(cleanup);
    };
  }, [cartItems]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
