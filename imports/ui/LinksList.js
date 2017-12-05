import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Links } from '../api/links'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'

import LinksListItem from './LinksListItem'

class LinksList extends Component {
  constructor () {
    super()
    this.state = {
      links: []
    }
  }

  renderLinksListItem () {
    if (this.state.links.length === 0) {
      return (
        <div className='item'>
          <p className='item__status-message'>No links found</p>
        </div>
      )
    }
    return this.state.links.map(({ _id, ...link }) => (
      <LinksListItem shortUrl={Meteor.absoluteUrl(_id)} _id={_id} key={_id} {...link} />
    ))
  }

  componentWillMount () {
    if (!Meteor.userId()) {
      this.props.history.replace('/')
    }
  }

  componentDidMount () {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub')
      const links = Links.find({
        visible: Session.get('showHidden')
      }).fetch()
      this.setState({
        links
      })
    })
  }

  componentWillUnmount () {
    this.linksTracker.stop()
  }
  render () {
    return (
      <div>
        <FlipMove maintainContainerHeight>
          {this.renderLinksListItem()}
        </FlipMove>
      </div>
    )
  }
}

export default LinksList
