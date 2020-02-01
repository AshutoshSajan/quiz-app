import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../../user/components/Login.jsx';
import Register from '../../user/components/Register.jsx';

export default function PublicRoutes() {
  return (
    <Switch>
      <Route exact path='/users/login' component={Login} />
      <Route path='/users/register' component={Register} />
    </Switch>
  );
}
