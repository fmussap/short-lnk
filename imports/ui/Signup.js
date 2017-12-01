import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      user: {}
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value

      if (password.length < 8) {
        return this.setState({ error: 'Password must contain at lest 8 characters long' })
      }

      Accounts.createUser({ email, password }, (error) => {
        if (error) {
          this.setState({
            error: error.reason
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

  render () {
    return (
      <div>
        <h1>Join Short Lnk</h1>
        {this.state.error
          ? <p>{this.state.error}</p>
          : undefined
        }
        <form onSubmit={this.handleSubmit} noValidate>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button type='submit'>Create account</button>
        </form>
        <Link to='/'>Have an account?</Link>
      </div>
    )
  }
}

export default Signup
