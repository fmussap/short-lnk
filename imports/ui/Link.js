import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

class Link extends Component {
  constructor () {
    super()
    this.onLogout = () => {
      Accounts.logout()
    }
  }

  componentWillMount () {
    if (!Meteor.userId()) {
      this.props.history.replace('/')
    }
  }
  render () {
    return (
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout}>Logout</button>
      </div>
    )
  }
}

export default Link
