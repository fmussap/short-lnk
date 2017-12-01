import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
// import { Accounts } from 'meteor/accounts-base'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      user: {}
    }

    this.handleSubmit = (e) => {
      const email = e.target.email.value
      const password = e.target.password.value

      e.preventDefault()
      Meteor.loginWithPassword({ email }, password, (error) => {
        if (error) {
          this.setState({
            error: 'Unable to login. Please check email and password'
          })
        } else {
          this.setState({
            user: Meteor.user(),
            error: ''
          })
        }
      })
    }

    this.loginWithGoogle = () => {
      Meteor.loginWithGoogle({
        requestPermissions: ['email']
      }, (error) => {
        if (error) {
          this.setState({
            error: 'Unable to login. Please check email and password'
          })
        } else {
          this.setState({
            user: Meteor.user(),
            error: ''
          })
        }
      })
    }
  }

  componentWillMount () {
    if (Meteor.userId()) {
      this.props.history.replace('/links')
    }
  }

  render () {
    return (
      <div>
        <h1>Short Lnk</h1>
        {this.state.error
          ? <p>{this.state.error}</p>
          : undefined
        }
        <button className='loginBtn loginBtn--google' onClick={this.loginWithGoogle}>
          Sign in with Google
        </button>
        <form onSubmit={this.handleSubmit}>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
        <Link to='/signup'>Don't have an account?</Link>
      </div>
    )
  }
}

export default Login
