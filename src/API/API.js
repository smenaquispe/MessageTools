const { contact_route } = require("./Routes/contact.routes.js");
const { chat_route } = require("../API/Routes/chat.routes.js");
const { message_route } = require('../API/Routes/message.routes.js')
const { client } = require('../Client/client.js');
const express = require('express');

const app = express()

app.use(express.json());

app.use(contact_route);
app.use(chat_route);
app.use(message_route);

client.initialize();

app.listen(3000, () => {
    console.log('listenning at port 3000')
})
