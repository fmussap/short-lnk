import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { routes, onAuthChange } from '../imports/routes'
import { Links } from '../imports/api/links'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Tracker.autorun(() => {
  const links = Links.find().fetch()
  console.log('links', links)
})

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'))
})
