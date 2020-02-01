import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleUserRegister } from '../actions';

const BASE_URL = 'http://localhost:8000/api/v1';

class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    error: ''
  };

  handleRegister = e => {
    const { name, email, password, confirmPassword } = this.state.user;

    e.preventDefault();
    if (
      name.trim() &&
      name.length >= 3 &&
      email &&
      email.length >= 8 &&
      (email.includes('@gmail.com') || email.includes('@yahoo.com')) &&
      password.trim() &&
      confirmPassword.trim() &&
      password.length >= 8 &&
      password === confirmPassword
    ) {
      const user = { name, email, password };

      this.props.dispatch(
        handleUserRegister(
          BASE_URL + '/users/register',
          user,
          this.props.history
        )
      );
    } else {
      this.setState(
        {
          error: 'Required field is missing'
        },
        () => setTimeout(() => this.setState({ error: '' }), 2000)
      );
    }
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
    const { name, email, password, confirmPassword } = this.state.user;

    return (
      <section className='hero is-primary is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                {this.state.error ? (
                  <label
                    htmlFor=''
                    className='label'
                    style={{ textAlign: 'center' }}
                  >
                    {this.state.error}
                  </label>
                ) : (
                  ''
                )}
                <form className='box' onSubmit={this.handleRegister}>
                  <div className='field'>
                    <label htmlFor='' className='label'>
                      Username
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        className='input'
                        type='text'
                        name='name'
                        placeholder='bob'
                        required
                        value={name}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-user'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='label'>
                      Email
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        className='input'
                        type='email'
                        name='email'
                        placeholder='exapmle@gmail.com'
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
                    <label htmlFor='' className='label'>
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
                    <label htmlFor='' className='label'>
                      Confirm Password
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        placeholder='*******'
                        className='input'
                        type='password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-lock'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='checkbox'>
                      Already have an account?
                    </label>
                    <Link to='/users/login'>
                      <span style={{ margin: '0 10px' }}>Login</span>
                    </Link>
                  </div>
                  <div className='field'>
                    <button className='button is-success'>Sign Up</button>
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

export default connect()(Register);
