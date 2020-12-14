import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './styles';
import { Link } from "react-router-dom";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="/lista"> 
        <span role="img" aria-label="about us">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        Lista de Clientes
      </a>
      
      <a href="/signup">
        <span role="img" aria-label="price">&#x1f4b8;</span>
        Cadastrar Cliente
      </a>

      <a href="/">
        <span role="img" aria-label="price">&#x1f4b8;</span>
        Login
      </a>
      
      <a href="/">
        <span role="img" aria-label="contact">&#x1f4e9;</span>
        Log out
      </a>
      
    </StyledMenu>
  )
}
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu;