const { Router } = require('express');
const { client } = require('../../Client/client.js');
const { formatDate } = require('../../Utils/date.js');


const chat_route = new Router();


/**
 * 
 * get all information of chats
 */
chat_route.get('/chats/all', async (req, res) => {
    const chats = await client.getChats()
    res.send(chats);
})

/**
 * get name and id of the chat
 */
chat_route.get('/chats', async (req, res) => {
    const chats_ = await client.getChats()
    const chats = chats_.map(chat => {
        return ({
            id: chat.id.user,
            name: chat.name
        })
    })

    res.send(chats);
})

/**
 * Get chat by id
 */

 chat_route.get('/chats/:id', async (req, res) => {
    const chats_ = (await client.getChats()).map(chat => {
        return ({
            id: chat.id.user,
            name: chat.name
        })
    })

    const chat = chats_.find(ch => ch.id == req.params.id)
    res.send(chat);
})


/**
 * fetch messages from chat
 */

 chat_route.get('/chats/:id/messages', async (req, res) => {
    const limit = 5; // es una constante random por ahora para obtener la cantidad de mensajes
    const chat = (await client.getChats()).find(chat => req.params.id == chat.id.user);
    const messages = await chat.fetchMessages(limit);
    res.send(messages.map(m => {
        return ({
            date: formatDate(new Date(m.timestamp)),
            body: m.body,
            type: m.type,
            from: m.fromMe ? 'Me' : 'Contact' 
        })
    }));
})


exports.chat_route = chat_route;