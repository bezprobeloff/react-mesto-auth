import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path: pathTo,
  isLoggedIn,
  ...props
}) => {
  return (
    <Route path={pathTo}>
      {() =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
    </Route>
  );
};

export default ProtectedRoute;
