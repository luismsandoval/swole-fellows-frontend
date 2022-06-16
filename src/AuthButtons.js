import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "./login";
import LogoutButton from './logout';

function AuthButtons() {

  const {
    isAuthenticated,
  } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />
}

export default AuthButtons;
