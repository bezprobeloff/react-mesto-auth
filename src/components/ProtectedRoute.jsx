import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  path: pathTo,
  isLoggedIn,
  isTokenChecked,
  ...props
}) => {
  return (
    <Route path={pathTo}>
      {() => {
        // что отображаем до проверки токена
        if (!isTokenChecked) return <h2>Идет загрузка...</h2>;

        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/sign-in' />
        );
      }}
    </Route>
  );
};

export default ProtectedRoute;
