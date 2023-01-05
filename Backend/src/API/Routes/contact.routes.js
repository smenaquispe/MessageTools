/**
 * 
 * that router is for contacts and groups
 * 
 */

const { Router } = require("express");
const { client } = require('../../Client/client.js');

const contact_route = new Router()

/**
 * Get All without parse
 */

contact_route.get('/contacts/all', async (req, res) => {
    try {
        const all = await client.getContacts();
        res.send(all);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

/**
 * Get contacts 
 */
contact_route.get('/contacts', async (req, res) => {
    try {
        const contacts_ = (await client.getContacts()).filter( contact => contact.isGroup === false && contact.isMyContact == true);
        const contacts = contacts_.map(async (contact) => {
            return ({
                number: contact.number,
                name: contact.name,
                pushname: contact.pushname,
                picture: await contact.getProfilePicUrl()
            })
        })
        const sent_contacts = await Promise.all(contacts);
        res.send(sent_contacts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


/**
 * Get numbers of people that arent my contact
 */

contact_route.get('/contacts/not', async (req, res) => {
    try {
        const contacts_ = (await client.getContacts()).filter( contact => contact.isGroup === false);
        const contacts = contacts_.map(async (contact) => {
            return ({
                number: contact.number,
                name: contact.name,
                pushname: contact.pushname,
                picture: await contact.getProfilePicUrl()
            })
        })
        const sent_contacts = await Promise.all(contacts);
        res.send(sent_contacts);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

/**
 *  Get contact by number
 */

contact_route.get('/contacts/:number', async (req, res) => {
    try {
        const contacts_ = (await client.getContacts()).filter( contact => contact.isGroup === false);
        const contact = contacts_.find(cont => cont.number == req.params.number);

        const sent_contact = {
            number: contact.number,
            name: contact.name,
            pushname: contact.pushname,
            picture: await contact.getProfilePicUrl()
        }

        res.send(sent_contact);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})



/**
 * Get groups
 */

contact_route.get('/groups', async (req, res) => {
    try {
        const groups_ = (await client.getContacts()).filter( group => group.isGroup === true);
        const groups = groups_.map(async (group) => {
            return ({
                id : group.id.user,
                name : group.name,
                picture: await group.getProfilePicUrl()
            })
        }) 

        const sent_groups = await Promise.all(groups);
        res.send(sent_groups);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

/**
 * Get group by id
 *
 */
contact_route.get('/groups/:id', async (req, res) => {
    try {
        const groups_ = (await client.getContacts()).filter( group => group.isGroup === true);
        const group = groups_.find(group => group.id.user == req.params.id);

        const sent_group = {
            id : group.id.user,
            name : group.name,
            picture : await group.getProfilePicUrl()
        }
        
        res.send(sent_group)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


exports.contact_route = contact_route;

