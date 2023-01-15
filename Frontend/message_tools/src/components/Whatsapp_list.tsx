import { useEffect, useState } from 'react'
import * as API from '../API/API';
import { Heading } from '@chakra-ui/react'
import { Contact_view } from './Contact_view';
import { contact } from '../Interfaces/contact.interface';

export function Whatsapp_list(){
    
    const [contacts , setContact] = useState<contact[]>([]);

    useEffect(() => {
        API.getContacts().then(setContact);
    }, []);

        
    return(
        <>
            <Heading as={'h1'} > My Whatsapp Contact List </Heading>

            { contacts.length === 0 ? ( <div>loading ... </div> ) : 
                (
                    <section>
                    {
                        contacts.map((cont : contact) => { return (
                            <Contact_view  {...cont} key={cont.number}  view_tools = {true}  ></Contact_view>
                        )})
                    }      
                    </section>     
                )
            }
        </>
    )
}
