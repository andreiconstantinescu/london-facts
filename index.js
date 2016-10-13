'use strict'
const Alexa = require('alexa-sdk')
const FACTS = require('./facts.js')
const _ = require('lodash')
const SKILL_NAME = 'London Facts'
let APP_ID

const handlers = {
  LaunchRequest () {
    this.emit('GetFact')
  },

  GetNewFactIntent () {
    this.emit('GetFact')
  },

  GetFact () {
    const randomFact = FACTS[_.random(FACTS.length)]

    var speechOutput = `Here's your fact about London: ${randomFact}`

    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
  },

  ['AMAZON.HelpIntent'] () {
    const speechOutput = 'You can say tell me a London fact, or, you can say stop... What can I help you with?'
    const reprompt = 'Do you want a fact, dude?'
    this.emit(':ask', speechOutput, reprompt)
  },

  ['AMAZON.CancelIntent'] () {
    this.emit(':tell', 'Cancelled!')
  },

  ['AMAZON.StopIntent'] () {
    this.emit(':tell', 'Bye!')
  }
}

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  alexa.APP_ID = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}
