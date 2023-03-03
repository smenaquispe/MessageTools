const { Router } = require('express');
const { MessageMedia } = require('whatsapp-web.js');
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

/**
 * 
 * send a message to a list of contacts
 */
message_route.post('/message/send/list', async (req, res) => {
    try {
        const { list, message } = req.body;

        const sending_respone = {}

        list.forEach(async (dest) => {
            try{
                const chat = (await client.getChats()).find(ch => ch.id.user == dest);
                const chatId = chat.id.user + "@c.us";
                await client.sendMessage(chatId,message);
                sending_respone[dest] = 'send correctly';
            }catch(error){
                sending_respone[dest] = `error send message: ${error}`
            }
        });

        res.send(sending_respone)
        return sending_respone

    } catch (error) {
        res.send({'error' : error})
        return {'error' : error}        
    }
})

/**
 * send media (image) to a contact
 */
message_route.post('/message/media/send', async (req, res) => {
    try {
        const { destinatary, data, type } = req.body;

        const sending_respone = {
            'message' : 'the message sent correctly',
            'status' : 'sent to a current chat'
        }

        const msg = new MessageMedia(type ,data);
        const chat = (await client.getChats()).find(ch => ch.id.user == destinatary);
        if(chat === undefined)  sending_respone['status'] = 'sent to a new chat';

        const chatId = chat.id.user + "@c.us";
        await client.sendMessage(chatId,msg);
        res.send(sending_respone);
        return sending_respone;

    } catch (error) {
        console.log(error)
        res.send({'error' : error})
        return {'error' : error};
    }
})


exports.message_route = message_route