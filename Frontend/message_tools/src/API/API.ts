import { contact } from "../Interfaces/contact.interface";
import { media } from "../Interfaces/media.interface";
import { message } from "../Interfaces/message.interface";

/**
 * Class allow to consume whatsapp api
 * 
 */

const port = 3000;

/** get all contacts */
export async function getContacts() {
    try {
        const contacts_ = await fetch(`http://localhost:${port}/contacts`);
        const contacts : contact[] = await contacts_.json();
        return contacts;
    } catch (error) {
        console.log(error)
        const c : contact[] = [ { number : "1" } ];
        return c;
    }
}

/** get just one contact by number */
export async function getContactByNumber(number : string){
    try {
        const contact_ = await fetch(`http://localhost:${port}/contacts/${number}`);
        const contact : contact = await contact_.json();
        return contact;
    } catch (error) {
        console.log(error)
        const c : contact = {'number':'0'}
        return c;
    }
}

/** send a message to a contact */
export async function sendMessage(destinatary : string, message : string) {
    try {
        const returned = await fetch(`http://localhost:${port}/message/send`, {
            method: 'POST',
            body: JSON.stringify({
                'destinatary': destinatary,
                'message': message
            }),
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
        })
        return returned.json() ;
    } catch(error) {
        console.log(error)
    } 
}

/** get messages */
export async function getMessages(number : string) {
    try {
        const messages_ = await fetch(`http://localhost:${port}/chats/${number}/messages`);
        const messages : message[] = await messages_.json();
        return messages;
    } catch (error) {
        const c : message[] = [];       
        return c;
    }
}

/** send media */
export async function sendMedia(file : media){
    try {
        const returned = await fetch(`http://localhost:${port}/message/media/send`, {
            method: 'POST',
            body: JSON.stringify(file),
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
        })
        return returned.json() ;

    } catch (error) {
        return error
    }
}