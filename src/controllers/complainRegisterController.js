const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");
const { Client } = require("../models/client");
const { complainRegister, validSchema } = require("../models/complainRegister")

const arr = ['File a complain', "Check complain status"]

module.exports = {
    complainRegister(req, res) {
        const agent = new WebhookClient({ request: req, response: res });

        const welcome = agent => {
            agent.add(`Welcome to Home`);
            arr.map(x => agent.add(new Suggestion(x)))
        }
        const fallback = agent => {
            agent.add(`I'm sorry, can you try again?`)
            arr.map(x => agent.add(new Suggestion(x)))
        }
        const fileComplain = agent => {
            agent.add(`Enter your email`);
        }
        const fileComplainVerification = async (agent, next) => {
            //check if client is alredy signup
            try {
                const client = await Client.exists({ email: agent.parameters.email });
                if (client) {
                    agent.add(`Email found------------complain`);
                }
                else {
                    agent.add(`Email not found`);
                }
            } catch (err) {
                return next(err);
            }
        }
        const issue = async (agent, next) => {
            try {
                const data = new complainRegister({
                    clientEmail: agent.parameters.email,
                    issue: agent.parameters.issue
                });
                await data.save();
                agent.add(`your complain has been registered.Thank You!`);
            } catch (err) {
                return next(err);
            }

        }
        const CheckStatus = agent => {
            agent.add(`Enter your email`);
        }

        const CheckStatusVerification = async (agent, next) => {
            //check if client is alredy signup
            try {
                const client = await Client.exists({ email: agent.parameters.email });
                if (client) {
                    agent.add(`Email found------------complain`);
                }
                else {
                    agent.add(`Email not found`);

                }
            } catch (err) {
                return next(err);
            }
        }

        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        intentMap.set('Default Fallback Intent', fallback);
        intentMap.set('File a complain', fileComplain);
        intentMap.set('File a complain - emailVerification', fileComplainVerification);
        intentMap.set('File a complain - enterComplain', issue);
        intentMap.set('Check complain status', CheckStatus);
        intentMap.set('Check complain status - emailVerification', CheckStatusVerification);

        agent.handleRequest(intentMap);

    }
}