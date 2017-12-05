import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

class AddLink extends Component {
  constructor () {
    super()
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }

    this.handleSubmit = (e) => {
      e.preventDefault()
      Meteor.call('links.insert', this.state.url, (err, resp) => {
        if (!err) {
          this.setState({
            url: '',
            isOpen: false,
            error: ''
          })
        } else {
          this.setState({
            error: err.reason
          })
        }
      })
    }

    this.handleUrl = (e) => {
      this.setState({
        url: e.target.value
      })
    }

    this.handleOpenModal = () => {
      this.setState({
        isOpen: true
      })
    }

    this.handleCloseModal = () => {
      this.setState({
        isOpen: false,
        error: '',
        url: ''
      })
    }

    this.handleFocus = () => this.refs.url.focus()
  }

  componentWillMount () {
    Modal.setAppElement('body')
  }

  render () {
    return (
      <div>
        <button className='button' onClick={this.handleOpenModal}>Add link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel='Add link'
          shouldReturnFocusAfterClose={false}
          onAfterOpen={this.handleFocus}
          onRequestClose={this.handleCloseModal}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
        >
          <h1>Add Link</h1>
          <div className='error-message'>{this.state.error ? <p>{this.state.error}</p> : undefined}</div>
          <form className='boxed-view__form' onSubmit={this.handleSubmit}>
            <input
              type='text'
              ref='url'
              placeholder='URL'
              value={this.state.url}
              onChange={this.handleUrl}
            />
            <button className='button' type='submit'>Add Link</button>
            <button type='button' className='button button--danger' onClick={this.handleCloseModal}>Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default AddLink
