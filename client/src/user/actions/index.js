export function handleAutoLogin(url, jwt, history) {
  return dispatch => {
    fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (data.user) return dispatch({
            type: 'LOGIN',
            payload: data
          });
        } else if (!data.success) {
          history.push('/users/login');
        }
      })
      .catch(err => {
        console.log(err, 'auto login catch err...');
      });
  }
}

export function handleUserLogin(url, user, history) {
  return dispatch => {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (data.token) localStorage.setItem('jwt', data.token);
          dispatch({
            type: 'LOGIN',
            payload: data
          });
          history.push('/');
        } else if (data && !data.success) {
          dispatch({
            type: 'LOGIN',
            payload: data.message
          });
          console.log('login user unsuccessfull...');
        }
      })
      .catch(err => {
        console.log(err, 'login user catch err...');
      });
  }
}

export function handleUserRegister(url, user, history) {
  return dispatch => {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data && data.user) {
            if (data.token) localStorage.setItem('jwt', data.token);

            dispatch({
              type: 'REGISTER',
              payload: data
            });

            history.push('/');
          }
        } else if (!data.success) {
          dispatch({
            type: 'LOGIN',
            payload: data.message
          });
          console.log('register user unsuccessful...');
        }
      })
      .catch(err => {
        console.log(err, 'register user catch err');
      });
  }
}