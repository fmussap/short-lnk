import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

Accounts.validateNewUser((user) => {
  if (user.emails) {
    const email = user.emails[0].address
    try {
      const newUser = new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      })

      newUser.validate({ email })
    } catch (e) {
      throw new Meteor.Error(500, e.message)
    }
  }
  return true
})
