import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

import { Links } from '../api/links'

class Link extends Component {
  constructor () {
    super()
    this.onLogout = () => {
      Accounts.logout()
    }
    this.handleSubmit = (e) => {
      e.preventDefault()
      const url = e.target.url.value.trim()
      Links.insert({
        url
      })
      e.target.url.value = ''
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
        <p>Add Link</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='url' placeholder='URL' />
          <button type='submit'>Add Link</button>
        </form>
      </div>
    )
  }
}

export default Link
