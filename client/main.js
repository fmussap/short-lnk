import React from 'react'
import ReactDom from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Tracker } from 'meteor/tracker'

import Signup from '../imports/ui/Signup'
import Link from '../imports/ui/Link'
import NotFound from '../imports/ui/NotFound'
import Login from '../imports/ui/Login'

const history = createBrowserHistory()
const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

const routes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/links' component={Link} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const pathname = history.location.pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
  }
})

Meteor.startup(() => {
  ReactDom.render(routes, document.getElementById('app'))
})

