import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = props => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = event => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const numericalEnteredAmount = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      isNaN(numericalEnteredAmount) ||
      numericalEnteredAmount < 1 ||
      numericalEnteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(numericalEnteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Please Enter A Valid Amount</p>}
    </form>
  );
};

export default MealItemForm;
