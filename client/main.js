import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import { routes, onAuthChange } from '../imports/routes'
import '../imports/startup/simple-schema-configuration'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  Session.set('showHidden', true)
  ReactDom.render(routes, document.getElementById('app'))
})
