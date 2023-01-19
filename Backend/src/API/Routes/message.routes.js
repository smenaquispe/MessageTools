const { Router } = require('express');
const { client } = require('../../Client/client.js');

const message_route = new Router()

/**
 * send a message to a contact
 */
message_route.post('/message/send', async (req, res) => {
    try {
        const { destinatary, message } = req.body;

        const sending_respone = {
            'message' : 'the message sent correctly',
            'status' : 'sent to a current chat'
        }

        const chat = (await client.getChats()).find(ch => ch.id.user == destinatary);
        if(chat === undefined)  sending_respone['status'] = 'sent to a new chat';

        const chatId = chat.id.user + "@c.us";
        await client.sendMessage(chatId,message);
        res.send(sending_respone);
        return sending_respone;

    } catch (error) {
        console.log(error)
        res.send({'error' : error})
        return {'error' : error};
    }
})

exports.message_route = message_route