import React from 'react';
import InputMask from 'react-input-mask';
 
const Input = (props) => (
  <InputMask mask="99999-999" value={props.value} onChange={props.onChange} />
);

export default Input;