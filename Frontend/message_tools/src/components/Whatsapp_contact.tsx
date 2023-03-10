import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as API from '../API/API';
import { Contact_view } from './Contact_view';
import { contact } from '../Interfaces/contact.interface';
import { Button, Input, InputGroup, InputRightElement, Box, TagLabel } from '@chakra-ui/react';
import { Message_view } from './Message_view';
import { message } from '../Interfaces/message.interface';
import { media } from '../Interfaces/media.interface';

export function Whatsapp_contact(){
    const { number } = useParams<string>();
    const [contact, setContact] = useState<contact>({'number' : '0'});

    // for send a message
    const [message, setMessage] = useState<string>('');

    // for a image to send
    const [image, setImage] = useState<media>();

    // for recieve messages
    const [messages, setMessages] = useState<message[]>();

    const handleMessage = (e : React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
    const handleTextButton = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        API.sendMessage(contact.number, message)
        .then(console.log)
        .catch(console.warn);
    }


    const handleImageButton = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(image){
            API.sendMedia(image)
            .then(console.log)
            .catch(console.warn);
        }
    }
    
    useEffect(() => {
        if(number != undefined){
            API.getContactByNumber(number).then(setContact)
            API.getMessages(number).then(setMessages);
        }
    }, [number])


    return (
        <>
            { contact ? (
                <section>
                    <Contact_view {...contact} ></Contact_view>    
                    
                    <InputGroup>
                        <Input placeholder='write message' onChange={ handleMessage }></Input>
                        <InputRightElement>
                            <Button onClick={handleTextButton} >Send</Button>
                        </InputRightElement>
                    </InputGroup>

                    <Box w="100%" >
                        {
                            messages !== undefined ? (
                                messages.map(m => {
                                    return <Message_view {...m} ></Message_view>
                                })
                            ) 
                            
                            : (<p>Cannot find messages</p>)
                        }
                    </Box>
                </section>

                ) : (
                    <p>loading</p>
                )
            }
        </>
    )
}   