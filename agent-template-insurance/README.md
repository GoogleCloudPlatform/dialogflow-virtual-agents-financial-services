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
# Insurance Rapid Response Virtual Agent Template 
Google has launched a sample Dialogflow 
template for insurance institutions enabling chat or voice bots to 
answer general questions. This agent should help these institutions
understand how to integrate Dialogflow into their backend systems and respond with default
text responses.

You can:
* Launch your bot faster with this agent
* Customize it to match your website and add content to address your organization 
and community needs  

## Requirements
**The answers provided in this Dialogflow agent are generic and do not constitute legal or financial advice. Furthermore, it is expected that the customer changes the answers to ALL questions
to suit their specific situation.**

The first question has fufillment enabled and it does not use any Google APIs.  Therefore, be sure to deploy the fulfillment code as a Cloud Function.  
This fulfillment service responds with a default text response, but it demonstrates how to configure Dialogflow to 
generate dynamic responses.

## Deploy the Agent
Follow the steps outlined in the [Agent Deployment section in the parent README](../README.md#agent-deployment).

## Agent Questions
The agent is able to handle variations in the questions below, so these are sample questions.

#### 1. Are you waiving any fees right now?
This question uses [Fulfillment](https://cloud.google.com/dialogflow/docs/quick/fulfillment) to respond with a static response.  It demonstrates how to generate
dynamic responses.    

##### Agent Response
```
Yes, in some cases we may waive fees and issue partial refunds. For example, people 
are not driving as often as they were before the COVID-19 outbreak, so in this case 
we may evaluate whether we can issue a refund and whether or not we need more information 
from our customers.  There is no need to contact us directly on this matter as we are 
already evaluating waiving fees.  We will also reach out to you if we need additional information.
```

#### 2. What resources are available for employees with Travel Insurance/Assistance coverage?

The agent will respond with the default text response.  This question does not use fulfillment.  

##### Agent Response
```
If you are an employee with travel assistance through your employer, then please check with your 
employer on cancelling business travel and refund policies.  If you are traveling for pleasure, 
then please review our travel insurance policy guidelines for what types of events are covered. 
```

#### 3. If I'm using my car less, can I temporarily adjust my coverage for a lower rate?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
Given the current shelter-in-place orders from a variety of states, then fewer 
people are driving, which means that there are fewer accidents. Given this decline, 
personal auto insurance customers will receive 20% back, based on their monthly premiums 
starting in April through the time period when the shelter-in-place orders are lifted. 
We will automatically deposit into your bank account or credit the card on file. Make sure 
your payment information is up-to-date. 
```

#### 4. Is It worth switching to a pay-per-mile insurance policy?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
Yes, you can switch your policy to a pay per mile option if it is available.  
Please contact your agent via our mobile application for more information.
```

#### 5. Will I lose my student discount if schools are closed?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
No, you will not lose your student discount if your school is closed. 
```

#### 6. Am I able to file a claim during the pandemic?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
Yes, you can still file a claim during this time.  Please use our mobile 
application or website to start the claims process.  Most of the process can be completed online.  
```

### Release Notes


## Google Cloud Disclaimer: 
The contents of this GitHub repository are provided under the Apache 2.0 license. 
