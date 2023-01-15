import * as API from '../API/API';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { key } from 'localforage';
import { contactV } from '../Interfaces/contactV.interface';

export function Contact_view(contact : contactV){    
    return (
        <>
            <Card>
                <CardHeader>
                    <Image src={contact.picture} width='200' height='200' ></Image>
                </CardHeader>
                <CardBody>
                    <p>Phone number: {contact.number}</p>
                    <p>Name: {contact.name}</p>
                    <p>Push name: {contact.pushname}</p>
                </CardBody>
                <CardFooter>
                    { contact.view_tools ? (
                        <Link to={`/contacts/${contact.number}`}>
                            <Button>Tools</Button>
                        </Link>
                    ) : (
                        <div>Aqui ira más opciones</div>
                    )
                    }
                </CardFooter>
            </Card> 
        
        </>
    )


}   