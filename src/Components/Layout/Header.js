import React, { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Header meals</h1>
        <HeaderCardButton onClick={props.onShowCart}>Cart</HeaderCardButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='table with food' />
      </div>
    </Fragment>
  );
};

export default Header;
