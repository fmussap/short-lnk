import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('linksPub', function () {
    const userId = this.userId
    return Links.find({ userId })
  })
}

Meteor.methods({
  'links.insert' (url = 'new url') {
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('not-authorized')
    }

    const newUrl = new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    })

    newUrl.validate({ url })

    Links.insert({
      _id: shortid.generate(),
      url,
      userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },
  'links.visibility' (_id, visible) {
    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('not-authorized')
    }

    const visibility = new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    })
    visibility.validate({ _id, visible })

    Links.update({
      _id,
      userId
    }, {
      $set: {
        visible
      }
    })
  },
  'links.trackVisit' (_id) {
    Links.update({
      _id
    }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
})
