/**
 * Copyright 2019 Google LLC
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
const MapsClient = require('@googlemaps/google-maps-services-js').Client;
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

/**
 * Gets the Acme opening hours.
 */
function acmeOpenHours(agent) {
  console.log(
      'acmeOpenHours: agent.parameters = ' + JSON.stringify(agent.parameters));
  var organization = agent.parameters.organization;
  // var geoCity = agent.parameters['geo-city'];
  var userAddress = agent.parameters['address'];

  if (!organization || !userAddress) {
    agent.add(`I didn't understand.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }

  const mapsClient = new MapsClient({});
  
  var name;
  return convertAddressToGeocode(mapsClient, userAddress)
      .then(response => {
        console.log('The returned latitude and longitude is ' + response);
        agent.add('The closest Acme bank is <address>333 Jackson blvd, Chicago IL</address> and the hours of operation are Monday - Friday 9AM - 4PM, Saturday 9AM - 12PM and closed on Sunday'); 
      })
      .catch(e => {
        if (!!name) {
          agent.add(`I'm sorry, I can't find opening hours for Acme Bank`);
        } else {
          agent.add(`I'm sorry, I can't find opening hours for the branch closest to ` + userAddress);
        }
        console.log(e);
           return;
      });
}

/**
 * Gets the Acme bank open branches.
 */
function acmeOpenBranches(agent) {
  console.log(
      'acmeOpenBranches: agent.parameters = ' + JSON.stringify(agent.parameters));
  var organization = agent.parameters.organization;
  var userAddress = agent.parameters['address'];

  if (!organization) { 
    agent.add(`I didn't understand the organization.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }
  if(!userAddress) {
    agent.add(`I didn't understand the location or address you entered.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }

  const mapsClient = new MapsClient({});
  
  var name;
  return convertAddressToGeocode(mapsClient, userAddress)
      .then(response => {
        console.log('The returned latitude and longitude is ' + response);
        console.log('I found some locations that are near by your address.');
        agent.add('I found some locations that are near by your address.');
        agent.add('<address>1234 Main Street Dallas, TX</address>');
        agent.add('<address>2234 Park Place Dallas, TX</address>');
        agent.add('<address>3678 Smith Way Dallas, TX</address>');
      })
      .catch(e => {
        if (!!name) {
          agent.add(`I'm sorry, I can't find any open branches for ` + name);
        } else {
          agent.add(`I'm sorry, I can't find any open branches near by ` + userAddress);
        }
        console.log(e);
        return;
      });
}

/**
 * Converts time to human a friendly format.
 */
function convertTimeFormat(hours, minutes) {
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;
  return hours + ':' + minutes + ' ' + AmOrPm;
}

/**
 * Converts time to human a friendly format.
 */
function convertAddressToGeocode(mapsClient, userAddress) {
  return mapsClient.geocode({
    params: {
      address: userAddress,
      key: process.env.GOOGLE_MAPS_API_KEY
    },
    timeout: 10000, // milliseconds
  })
  .then((r) => {
    if (r.data.status === 'OK') {
      var lat = r.data.results[0].geometry.location.lat;
      var lng = r.data.results[0].geometry.location.lng;
      var formattedGeocode = lat + ',' + lng;
      console.log(lat + ',' + lng);
      return Promise.resolve(formattedGeocode);
    } else {
      console.log(r.data.error_message);
      return Promise.reject(
        new Error('It seems the address is invalid. Please try another address'));
      
    }
  })
  .catch((e) => {
    console.log(e);
    return Promise.reject(
              new Error('It seems the address is invalid. Please try another address'));
  });
}

/**
 * Convert the JSON weekday_text array to a string.
 */
function formatWeekdayText(weekday_text ){
    console.log(weekday_text + ' type is ' + typeof weekday_text);
    //weekday_text 
    var weekdaystring = '';
    var i = 0; 
    for(i = 0; i < weekday_text.length; i++){
        if(i != weekday_text.length - 1){
            weekdaystring += weekday_text[i] + '\n';
        } else {
            weekdaystring += weekday_text[i];
        }   
    }
    return weekdaystring; 
}

/**
 * Gets the opening hours for the closest location near the provided address.
 */
function openHours(agent) {
  console.log(
      'openHours: agent.parameters = ' + JSON.stringify(agent.parameters));
  var organization = agent.parameters.organization;
  // var geoCity = agent.parameters['geo-city'];
  var userAddress = agent.parameters['address'];

  if (!organization || !userAddress) {
    agent.add(`I didn't understand.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }
  //Customer TODO - remove this code when going live.
  if(organization === 'Acme bank'){
      return acmeOpenHours(agent);
  }
  //End Customer TODO
  
  const mapsClient = new MapsClient({});
  const radius = 1000;
  var name;
  return convertAddressToGeocode(mapsClient, userAddress)
      .then(response => {
        console.log('The returned latitude and longitude is ' + response);
        return mapsClient.findPlaceFromText({
        params: {
          input: organization,
          inputtype: 'textquery',
          fields: 'place_id,formatted_address,name,opening_hours',
          locationbias: 'circle:' + radius + '@' + response,
          key: process.env.GOOGLE_MAPS_API_KEY
        },
        timeout: 5000  // milliseconds
      });
      })
      .then(resp => {
        var candidates = resp.data.candidates;
        console.log('Candidates = ' + JSON.stringify(candidates));
        if (!candidates || !candidates.length) {
          return Promise.reject(
              new Error('No candidate branches found near address: ' + userAddress));
        }
        var placeId = (candidates[0] || {}).place_id;
        name = (candidates[0] || {}).name;
        if (!placeId) {
          return Promise.reject(
              new Error('No place ID found for branch: ' + name + ' near address ' + userAddress));
        }
        return mapsClient.placeDetails({
          params: {
            place_id: placeId,
            //fields: 'opening_hours/periods,opening_hours/open_now',
            fields: 'name,formatted_address,opening_hours/periods,opening_hours/weekday_text,opening_hours/open_now',
            key: process.env.GOOGLE_MAPS_API_KEY
          },
          timeout: 5000  // milliseconds
        });
      })
      .then(resp => {
        var result = resp.data.result;
        if (!result) {
          console.error('No opening hours found for ' + organization + ' branch near address ' + userAddress);
          return Promise.reject(
              new Error('No opening hours found for ' + organization + ' branch near address ' + userAddress));
        }
        console.log('result is ' + JSON.stringify(result));
        agent.add('I found a ' + result.name + ' located at <address>' + result.formatted_address + '</address>.');
        var message = 'According to ' + result.name + ', ' +
              ' the hours for this address are ' + formatWeekdayText(result.opening_hours.weekday_text);
        console.log(message);
 		agent.add(message);
        return;
      })
      .catch(e => {
        if (!!name) {
          agent.add(`I'm sorry, I can't find opening hours for ` + name);
        } else {
          agent.add(`I'm sorry, I can't find opening hours for the branch closest to ` + userAddress);
        }
        console.log(e);
           return;
      });
}

/**
 * Gets the closest 3 operational branches based on the provided address.
 */
function openBranches(agent) {
  console.log(
      'openBranches: agent.parameters = ' + JSON.stringify(agent.parameters));
  var organization = agent.parameters.organization;
  var userAddress = agent.parameters['address'];

  if (!organization) { 
    agent.add(`I didn't understand the organization.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }
  if(!userAddress) {
    agent.add(`I didn't understand the location or address you entered.`);
    agent.add(`I'm sorry, can you try again?`);
    return;
  }
  //Customer TODO - remove this code when going live.
  if(organization === 'Acme bank'){
      return acmeOpenBranches(agent);
  }
  //End Customer TODO

  const mapsClient = new MapsClient({});
  
  var name;
  return convertAddressToGeocode(mapsClient, userAddress)
      .then(response => {
        console.log('The returned latitude and longitude is ' + response);
        // search for a list of branch locations and addresses
        return mapsClient.placesNearby({
        params: {
          keyword: organization,
          rankby: 'distance',
          //fields: 'place_id,formatted_address,name,opening_hours',
          location: response,
          key: process.env.GOOGLE_MAPS_API_KEY
        },
        timeout: 5000  // milliseconds
      })
      })
      .then(resp => {
        var candidates = resp.data.results;
        console.log('Candidates = ' + JSON.stringify(candidates));
        if (!candidates || !candidates.length) {
          return Promise.reject(
              new Error('No branches found near address: ' + userAddress));
        }
        console.log('I found some branches that are near by your address.');
        agent.add('I found some branches that are near by your address.');
        //need to process only the first three items.  
        var maxOperational = 3;
        var operationalCount = 0;  
        var i = 0;
        
        for(i = 0; i < candidates.length && operationalCount < maxOperational; i++){
           if(candidates[i].business_status === 'OPERATIONAL'){
               operationalCount += 1; 
               console.log(candidates[i].place_id + ' ' + candidates[i].vicinity);
               agent.add('<address>' + candidates[i].vicinity + '</address>');
           }
        }
        return;
      })
      .catch(e => {
        if (!!name) {
          agent.add(`I'm sorry, I can't find any open branches for ` + name);
        } else {
          agent.add(`I'm sorry, I can't find any open branches near by <address>` + userAddress + `</address>.`);
        }
        console.log(e);
        return;
      });
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

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

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
  intentMap.set('locations.hours_of_operation', openHours);
  intentMap.set('locations.open_branches', openBranches);
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});


