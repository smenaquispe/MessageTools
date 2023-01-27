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
    try {
        const chat_ = (await client.getChats()).find(chat => req.params.id == chat.id.user);
        const chat = await chat_.fetchMessages({limit: 50});
    

        const promise_messages = chat.map(async (m) => {
            
            let media = '';
            if(m.hasMedia && m.type.includes('image')){
                media = (await m.downloadMedia()).data;
            }


            return ({
                date: formatDate(m.timestamp),
                body: m.body,
                type: m.type,
                from: m.fromMe ? 'Me' : (await m.getContact()).number,
                media : media
            })
        })
    
        const messages = await Promise.all(promise_messages)
        res.send(messages);
        return messages;
    } catch (error) {
        res.send(error);
        console.warn(error);
        return error;
    }

})

exports.chat_route = chat_route;