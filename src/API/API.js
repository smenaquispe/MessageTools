const { route } = require("./Routes/contact.routes.js");
const { client } = require('../Client/client.js');
const express = require('express');

const app = express()

app.use(route);

client.initialize();

app.listen(3000, () => {
    console.log('listenning at port 3000')
})
