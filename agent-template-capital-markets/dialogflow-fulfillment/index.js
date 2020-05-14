/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

/**
 * Verify the users account.  
 */
function verifyAccount(agent) {
  var accountNumber = agent.parameters['account_number'];
  console.log(typeof accountNumber);
  console.log(accountNumber.length);
  
  if(isNaN(accountNumber)){
    console.log('The provided account number is not a number.');
    agent.add('I\'m sorry the account number you provided is invalid.');
  } else if(accountNumber.length != 5){    
    console.log('The account number must be 5 digits.');
	agent.add('I\'m sorry, but the account number must be 5 digits.');
  } else if(parseInt(accountNumber) === 55555){
    console.log('User provided a valid account number.');
    agent.add('Thank you. I have added you to our call back queue.  We will call you at the number ending in 5555.');
  } else {
    console.log('The account number you provided is invalid.');
	agent.add('The account number you entered is invalid.');
  }
}

/**
 * Handles the follow up intents for the call me question.  
 */
function actionMapper(agent) {
  if (agent.intent === 'general.call_me.yes') {
    console.log('User responded yes to call them back.');
  	agent.setContext({name: 'general_call_me_verify_account', lifespan: 1});
	agent.add('Can you provide me your account number?');
  } else {
    console.log('User responded no to call them back.');
    //agent.context.set({name: 'general.call_me.call_us', lifespan: 0});
	agent.add('Please call us at 1800-999-9999 then press option 1 and then 2.');
  }
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  /**
   * Handles the call me request.
   */
  function generalCallMe(agent) {
     console.log('User requested call me.');
     agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
     /*agent.add(new Card({
         title: `Title: Request a call back`,
         imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
         text: `Would you like us to call you back at the number on your account?`,
         buttonText: 'Yes',
         buttonUrl: 'https://assistant.google.com/'
       })
     );*/
     agent.add('Would you like us to call you back at the number on your account?');
     agent.add(new Suggestion(`Yes`));
     agent.add(new Suggestion(`No`));
     agent.setContext({ name: 'general_call_me', lifespan:2});
   }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('general.call_me', generalCallMe);
  intentMap.set('general.call_me.yes', actionMapper);
  intentMap.set('general.call_me.no', actionMapper);
  intentMap.set('general.call_me.verify_account', verifyAccount);
  agent.handleRequest(intentMap);
});
