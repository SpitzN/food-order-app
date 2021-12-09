import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCardButton = props => {
  const cartContext = useContext(CartContext);
  const numberOfCartItems = cartContext.cartItems.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
