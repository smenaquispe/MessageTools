import { contact } from "../Interfaces/contact.interface";

/**
 * Class allow to consume whatsapp api
 * 
 */

const port = 3000;


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
