import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as API from '../API/API';
import { Contact_view } from './Contact_view';
import { contact } from '../Interfaces/contact.interface';

export function Whatsapp_contact(){
    const { number } = useParams<string>();
    const [contact, setContact] = useState<contact>({'number' : '0'});
    
    useEffect(() => {
        if(number != undefined)
            API.getContactByNumber(number).then(setContact)
    }, [number])

    return (
        <>
            { contact ? (
                <Contact_view {...contact} ></Contact_view>    
                ) : (
                    <p>loading</p>
                )
            }
        </>
    )


}   