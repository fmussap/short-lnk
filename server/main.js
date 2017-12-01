import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'
import { googleClientID, googleClientSecret } from '../imports/config/keys'

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: googleClientID,

        secret: googleClientSecret

      }
    }
  )
})
