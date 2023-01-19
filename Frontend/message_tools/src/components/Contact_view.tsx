import { Card, CardHeader, CardBody, CardFooter, Image, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { contactV } from '../Interfaces/contactV.interface';
import profile_default from '../assets/profile_default.jpg'

export function Contact_view(contact : contactV){    
    return (
        <>
            <Card className='contact_view' align={'center'} width={'60'} bg={'green.100'} margin={'8'} height={'480'} >
                <CardHeader>
                    {
                        contact.picture ? ( <Image src={contact.picture} width='200' height='200' ></Image> )
                        : <Image src={profile_default} width='200' height='200' ></Image>
                    }
                </CardHeader>
                <CardBody>
                    <p className='phone_number' >Phone number: {contact.number} </p>
                    <p className='name' >Name: {contact.name}</p>
                    <p className='push_name' >Push name: {contact.pushname}</p>
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