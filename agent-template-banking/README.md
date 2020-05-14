<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
# Banking Rapid Response Virtual Agent Template 
Google has launched a sample Dialogflow 
template for banking institutions enabling chat or voice bots to 
answer questions about branch locations and office hours. This should help banking institutions
understand how to integrate Dialogflow into their backend systems.

It can:
* Answer questions about open branches
* Return the hours of operation for the closest branch
* Return generic responses regarding late payments and refinancing your mortgage

You can:
* Launch your bot faster with this agent
* Customize it to match your website and add content to address your organization 
and community needs  

## Requirements
**The answers provided in this Dialogflow agent are generic and do not constitute medical, legal or financial advice. Furthermore, it is expected that the customer changes the answers to ALL questions
to suit their specific situation.**

Additionally, there are two questions that require you to enable additional APIs (Geocoding API, Maps Places Details API) in your Google Cloud Platform project for the agent 
to respond to your question correctly.
1. `BANK_NAME` open branches?
2. What are the hours of operation for `BANK_NAME`?

We have provided a fulfillment service that allows the agent to answer the two questions above.  It uses a custom entity named `organization`, which recognizes
when a user enters a `valid bank name`.  The agent is equiped with a small subset of bank names for which it can list open branches and hours of operation using 
the Google Maps Details and Geocoding APIs.
However, customers **must** remove all banks listed in the [`organization entity`](./agent-template/entities/organization_entries_en.json) and list only 
their bank name and synonmyms for their bank name.
This will restrict the agent to reply with branches and hours of operation for your institution only. 

## Deploy the Agent
Follow the steps outlined in the [Agent Deployment section in the parent README](../README.md#agent-deployment).

## Agent Questions
The agent is able to handle variations in the questions below, so these are sample questions.  

### General Questions
#### 1. Can I refinance my mortgage?

The agent will respond with the default text response.  This question does not use fulfillment.  

##### Agent Response
```
Generally, you should consider refinancing if interest rates are falling or home prices are rising.  
If you are interested in refinancing, then please start the online application process here.
```

#### 2. I will miss my credit card payment, how can you help?

The agent will respond with the default text response.  This question does not use fulfillment.  

##### Agent Response
```
If you want to formally request that your credit card payment be delayed for yourself or your business, 
then please enroll online for the fastest service.
```

#### 3. How are you assisting banking customers affected by the pandemic?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
We are here to help in any way we can.  We offer a variety of mobile services such as banking online, 
transferring money via our mobile application, depositing checks from your home by phone or our app, 
and the ability to make purchases with our digital wallet.  These service should help you maintain social 
distancing.  We are also limiting our branch office hours and allowing drive through service, when available.
```

#### 4. What is the best way to bank if I am sheltering in place?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
We offer expanded services through the use of drive-up teller windows, 
or provide assistance at ATMs located outside of the branch office. 
Please visit our website and register for online banking or download our mobile app.  
You can complete transactions such as depositing a check to your bank account or paying bills. 
In addition, you may want to consider signing up for direct deposit so that a paycheck or public 
benefits payment goes directly into your account.
```

#### 5. Are you waiving late charges?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
We understand during this time that you may be seriously affected by this pandemic and we may be able to 
assist you with your payment. We can provide some options depending on if it is a loan or credit card.  
If it's a loan, then we may allow you to skip loan payments with no adverse consequences for you, 
extend loan terms, or restructure the loan.  If it is a credit card then we may be able to waive the 
late charge and possibly the interest for a set time period.  Please use our website to request more information.
```

#### 6. Can I defer loan payments because of the pandemic?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
If you are unable to make a loan payment due to the current pandemic, then we may be able to assist you. 
Please contact us for more information or visit our website for more information.
```

#### 7. How are you assisting mortgage customers affected by the pandemic?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
A new federal law, the CARES Act, puts in place two 
protections for homeowners with federally backed mortgages:

First, your lender or loan servicer may not foreclose on you for 60 days after March 18, 2020. Specifically, 
the CARES Act prohibits lenders and servicers from beginning a judicial or non-judicial foreclosure against you, 
or from finalizing a foreclosure judgment or sale, during this period of time.

Second, if you experience financial hardship due to the pandemic, you have a right to 
request a forbearance for up to 180 days. You also have the right to request an extension for up to another 180 days. 
You must contact your loan servicer to request this forbearance. There will be no additional fees, penalties or 
additional interest (beyond scheduled amounts) added to your account. You do not need to submit additional documentation 
to qualify other than your claim to have a pandemic-related financial hardship.  

If your loan is not federally backed then there may be other options available for your state and servicer.
```

### Query an actual banks hours of operation or branch locations
#### 1. What are the hours of operation for `BANK_NAME`?

The agent will send the request to the Google Cloud Function which will convert your address to a Geocode using the **Geocoding API** and then search for the closest
location near your address with the **Google Places API**.  Enter an actual address for best results.  

##### Agent Follow-up Prompt

`What is your address?`

##### User Response

`500 W Madison St Chicago, IL`

##### Agent Response

`The closest BANK_NAME is ADDRESS and the hours of operation are LOCATION_HOURS_OF_OPERATION`

#### 2. `BANK_NAME` open branches?

The agent will send the request to the Google Cloud Function, which will convert your address to a Geocode using the **Geocoding API** and then search for the 3 closest
operational locations near your address with the **Google Places API**.  Enter an actual address for best results.  This will return the 
vicinity, not the actual address.  

##### Agent Follow-up Prompt

`What is your address?`

##### User Response

`1600 Amphitheatre Pwky, Mountain View CA`

##### Agent Response

```
I found some locations that are near by your address.
ADDRESS_1
ADDRESS_2
ADDRESS_3
```


### Acme Bank Questions
You can query a fictious bank that will fulfill the request with a Google Cloud Function.

#### 1. What are the hours of operation for Acme bank?

This is will always return a default response using fulfillment.  

##### Agent Follow-up Prompt

`What is your address?`

##### User Response

`Chicago, IL`

##### Agent Response

```
The closest Acme bank is 333 Jackson blvd, Chicago IL and the hours of operation are 
Monday - Friday 9AM - 4PM, Saturday 9AM - 12PM and closed on Sunday
```

#### 2. Acme bank open branches?

This is will always return a default response using fulfillment.

##### Agent Follow-up Prompt

`What is your address?`

##### User Response

`Dallas, TX`

##### Agent Response

```
I found some locations that are near by your address.
1234 Main Street Dallas, TX
2234 Park Place Dallas, TX
3678 Smith Way Dallas, TX
```

### Release Notes


## Google Cloud Disclaimer: 
The contents of this GitHub repository are provided under the Apache 2.0 license. 
