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
 * Fetches retrieves the response using fulfillment. This function can be modified to call your backend API. 
 */
function generalWaiveFees(agent) {
	agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
	/*agent.add(new Card({
		title: `General: Waive Fees`,
		imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
		text: `Yes, in some cases we may waive fees and issue partial refunds. For example, people are not driving as often as they were before the COVID-19 outbreak, so in this case we may evaluate whether we can issue a refund and whether or not we need more information from our customers.  There is no need to contact us directly on this matter as we are already evaluating waiving fees.  We will also reach out to you if we need additional information.`,
		buttonText: 'Ok',
		buttonUrl: 'https://assistant.google.com/'
	})
	);*/
     agent.add('Yes, in some cases we may waive fees and issue partial refunds. For example, people are not driving as often as they were before the COVID-19 outbreak, so in this case we may evaluate whether we can issue a refund and whether or not we need more information from our customers.  There is no need to contact us directly on this matter as we are already evaluating waiving fees.  We will also reach out to you if we need additional information.');
     agent.add(new Suggestion(`Ok`));
     agent.add(new Suggestion(`Thank you`));
     //agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
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
  intentMap.set('general.waive_fees', generalWaiveFees);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
