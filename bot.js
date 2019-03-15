// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, MessageFactory } = require('botbuilder');

/**
 * A bot that responds to input from suggested actions.
 */
class SuggestedActionsBot {
    let order;
    let type;
    let address;

    /**
     * Every conversation turn for our SuggestedActionsbot will call this method.
     * There are no dialogs used, since it's "single turn" processing, meaning a single request and
     * response, with no stateful conversation.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            const text = turnContext.activity.text;

            // Create an array with the valid color options.
            const validOptions = ['Cardapio', 'Pedido'];
            const validOrders;
            const validTypes;

            // If the `text` is in the Array, a valid color was selected and send agreement.
            if (validOptions.includes(text)) {
                if (text === 'Cardapio') {
                    await turnContext.sendActivity('Cardapio do dia Combos (Lanche + batata + refrigerante)');
                    await turnContext.sendActivity('Combo Burger - R$ 15.00 (simples), R$18.00 (duplo)');
                    await turnContext.sendActivity('Combo Calabresa - R$ 16.00 (simples), R$19.00 (duplo)');
                    await turnContext.sendActivity('Combo Lombo - R$ 17.00 (simples), R$19.00 (duplo)');
                    await turnContext.sendActivity('Combo Bacon - R$ 18.00 (simples), R$19.00 (duplo)');
                    await turnContext.sendActivity('Combo Americano - R$ 18.00 (simples), R$20.00 (duplo)');
                }
                else {
                    await this.sendOrderActions(turnContext);
                }
            }
            else if (validOrders.includes(text)){
                this.order = text;
                var reply = MessageFactory.suggestedActions(['Lanche Simples', 'Lanche Duplo'], 'Qual o tipo do lanche?')
                await this.sendActivity(reply);
            }
            else if (validTypes.includes(text)){
                this.type = text;
                await this.sendActivity('Por favor me diga seu endereço:');
            }
            else {
                if(order && type && address){
                    aw
                }
                await turnContext.sendActivity('Por favor escolha uma opção válida');
            }

            // After the bot has responded send the suggested actions.
            await this.sendSuggestedActions(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            await this.sendWelcomeMessage(turnContext);
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected.]`);
        }
    }

    /**
     * Send a welcome message along with suggested actions for the user to click.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendWelcomeMessage(turnContext) {
        const activity = turnContext.activity;
        if (activity.membersAdded) {
            // Iterate over all new members added to the conversation.
            for (const idx in activity.membersAdded) {
                if (activity.membersAdded[idx].id !== activity.recipient.id) {
                    const welcomeMessage = `Welcome to suggestedActionsBot ${ activity.membersAdded[idx].name }. ` +
                        `This bot will introduce you to Suggested Actions. ` +
                        `Please select an option:`;
                    await turnContext.sendActivity(welcomeMessage);
                    await this.sendSuggestedActions(turnContext);
                }
            }
        }
    }

    /**
     * Send suggested actions to the user.
     * @param {TurnContext} turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async sendSuggestedActions(turnContext) {
        var options = ['Cardapio', 'Pedido'];
        var reply = MessageFactory.suggestedActions(options, 'Lanchin do Bujatin o que vc deseja?');
        await turnContext.sendActivity(reply);
    }

    async sendOrderActions(turnContext) {
        var orders = ['Combo Burger', 'Combo Calabresa', 'Combo Lombo', 'Combo Americano'];
        
        var reply = MessageFactory.suggestedActions(orders, 'Escolha seu pedido:');
        await turnContext.sendActivity(reply);
    }
}

module.exports.SuggestedActionsBot = SuggestedActionsBot;
