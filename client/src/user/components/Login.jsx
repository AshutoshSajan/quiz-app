import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleUserLogin } from '../actions';

const BASE_URL = 'http://localhost:8000/api/v1';

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleLogin = e => {
    e.preventDefault();
    const { user } = this.state;

    this.props.dispatch(
      handleUserLogin(BASE_URL + '/users/login', user, this.props.history)
    );
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };

  render() {
    const { email, password } = this.state.user;

    return (
      <section className='hero is-primary is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                {this.state.errMsg ? (
                  <label
                    htmlFor=''
                    className='label'
                    style={{ textAlign: 'center' }}
                  >
                    {this.state.errMsg}
                  </label>
                ) : (
                  ''
                )}
                <form action='' className='box'>
                  <div className='field'>
                    <label htmlFor='email' className='label'>
                      Email
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        type='email'
                        placeholder='e.g. bobsmith@gmail.com'
                        className='input'
                        name='email'
                        required
                        value={email}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-envelope'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='password' className='label'>
                      Password
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        placeholder='*******'
                        className='input'
                        type='password'
                        name='password'
                        required
                        value={password}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-lock'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='checkbox'>
                      Don't have an account?
                    </label>
                    <Link to='/users/register'>
                      <span style={{ margin: '0 10px' }}>SignUp</span>
                    </Link>
                  </div>
                  <div className='field'>
                    <button
                      className='button is-success'
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect()(Login);
