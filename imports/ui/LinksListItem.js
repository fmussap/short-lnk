import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import moment from 'moment'

class LinksList extends Component {
  constructor () {
    super()
    this.state = {
      justCopied: false
    }
    this.onHide = () => {
      Meteor.call('links.visibility', this.props._id, !this.props.visible)
    }
    this.onDelete = () => {
      Meteor.call('links.removeLink', this.props._id)
    }
  }

  renderStats () {
    const visitMessage = this.props.visitedCount <= 1 ? ' visit' : ' visits'
    const visitedAt = this.props.lastVisitedAt ? ` (visited ${moment(this.props.lastVisitedAt).fromNow()})` : this.props.lastVisitedAt
    return <p className='item__message'>{this.props.visitedCount}{visitMessage}{visitedAt}</p>
  }
  componentDidMount () {
    this.clipboard = new Clipboard(this.refs.copy)
    this.clipboard.on('success', () => {
      this.setState({
        justCopied: !this.state.justCopied
      })
    }).on('error', () => {
      console.log('Unable to copy.')
    })
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }
  render () {
    const { shortUrl, url } = this.props
    return (
      <div className='item'>
        <h2>{url}</h2>
        <p className='item__message'>{shortUrl}</p>
        {this.renderStats()}
        <a className='button button--border button--link' href={shortUrl} target='_blank'>Visit</a>
        <button className='button button--border' ref='copy' data-clipboard-text={shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button className='button button--border' onClick={this.onHide}>
          {this.props.visible ? 'Hide' : 'UnHide'}
        </button>
        <button className='button button--border--danger' onClick={this.onDelete}>
          Delete
        </button>
      </div>
    )
  }
}

LinksList.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}

export default LinksList
