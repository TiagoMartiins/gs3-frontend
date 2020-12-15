import React, {useEffect} from 'react';
import {logout} from '../../services/auth'
import { Redirect} from 'react-router-dom';

const Logout = () => {

  useEffect(() => {
    logout();
  }, [])

  return (
    <Redirect to="/"/>
  )
}

export default Logout;