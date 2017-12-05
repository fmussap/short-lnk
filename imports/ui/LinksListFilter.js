import React, { Component } from 'react'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'

class LinksListFilter extends Component {
  constructor () {
    super()
    this.state = {
      visible: true
    }

    this.showHidden = (e) => {
      Session.set('showHidden', !e.target.checked)
    }
  }

  componentDidMount () {
    this.Tracker = Tracker.autorun(() => {
      this.setState({
        visible: Session.get('showHidden')
      })
    })
  }

  componentWillUnmount () {
    this.Tracker.stop()
  }
  render () {
    return (
      <div>
        <label className='checkbox'>
          <input className='checkbox__box' type='checkbox' onChange={this.showHidden} checked={!this.state.visible} />
          show hidden links
        </label>
      </div>
    )
  }
}

export default LinksListFilter
