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
# Capital Markets Rapid Response Virtual Agent Template 
Google has launched a sample Dialogflow 
template for capital market institutions enabling chat or voice bots to 
answer general questions. This agent should help these institutions
understand how to integrate Dialogflow into their backend systems and respond with default
text responses.

You can:
* Launch your bot faster with this agent
* Customize it to match your website and add content to address your organization 
and community needs  

## Requirements
**The answers provided in this Dialogflow agent are generic and do not constitute legal or financial advice. 
Furthermore, it is expected that the customer updates the answers to ALL questions
to suit their specific situation.**

The first question has fufillment enabled and it does not use any Google APIs.  Therefore, be sure to deploy the fulfillment code as a Cloud Function.  This 
fulfillment service responds with an additional follow-up questions and sets the appropriate Dialogflow context.  It demonstrates how to configure Dialogflow to 
generate dynamic responses.

## Deploy the Agent
Follow the steps outlined in the [Agent Deployment section in the parent README](../README.md#agent-deployment).

## Agent Questions
The agent is able to handle variations in the questions below, so these are sample questions.

#### 1. Can a broker please call me?
This question uses [Fulfillment](https://cloud.google.com/dialogflow/docs/quick/fulfillment) to ask follow-up questions, which demonstrates how to generate dynamic responses.

##### Agent Response
```
Would you like us to call at the number we have on file?
```

##### User Response
```
Yes
```

##### Agent Response
```
Can you provide me your account number?
```

##### User Response
You must enter `55555` to receive a valid response from the agent. 
```
55555
```

##### Agent Response
```
Thank you. I have added you to our call back queue.  We will call you at the number ending in 5555.
```

#### 2. What is a margin call?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
A margin call occurs when the value of an investor's margin account falls below the 
broker's required amount. A margin call is the broker's demand that an investor 
deposit additional money or securities so that the account is brought up to the minimum 
value, known as the maintenance margin.
```

#### 3. How do I stop a margin call?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
The only way to stop a margin call is to fulfill the requirements of the margin.  
Your funds have gone below the required minimum so you need to sell assests to bring your account back into balance.
```

#### 4. How do I cover a margin call?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
You can cover a margin call a couple of ways. First, you can sell your existing 
assets held in your margin account to cover the short fall. Second, If you don't 
have enough assets to sell to cover your loss, then you can deposit more money into 
your account to cover the balance requirements.
```

#### 5. When do I have to file my federal income tax return?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
We suggest that you check your taxing authority's website to answer that question. 
```

#### 6. When is the deadline for 2019 IRA and health savings account (HSA) contributions?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
The IRS confirmed that July 15, 2020, will be the deadline to make 2019 contributions 
to IRAs and health savings accounts (HSAs). Deadlines associated with contributions 
to workplace savings plans are not affected.
```

#### 7. How do I stop my automatic required minimum distribution (RMD)?

The agent will respond with the default text response; no fulfillment.

##### Agent Response
```
You can stop RMDs by filing a request to stop them on our website. 
However, If you do not take any distributions, or if the distributions are 
not large enough, you may have to pay a 50% excise tax on the amount not 
distributed as required.  You should consult a tax professional or financial planner before you make this decision.
```

### Release Notes


## Google Cloud Disclaimer: 
The contents of this GitHub repository are provided under the Apache 2.0 license. 
