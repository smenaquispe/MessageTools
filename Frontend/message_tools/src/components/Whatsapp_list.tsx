import { useEffect, useState } from 'react'
import * as API from '../API/API';
import { Center, Flex, Heading, InputGroup, Input } from '@chakra-ui/react'
import { Contact_view } from './Contact_view';
import { contact } from '../Interfaces/contact.interface';
import { fileFrom } from 'node-fetch';

export function Whatsapp_list(){
    
    const [contacts , setContact] = useState<contact[]>([]);
    const [search, setSearch] = useState<string>('');

    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filterContacts = () => {
        const conts = Array.from(
            document.getElementsByClassName('contact_view') as HTMLCollectionOf<HTMLElement>
        )

        conts.forEach(c => {
            const number = c.querySelector('.phone_number')?.textContent?.split('51')[1];
            const name  = c.querySelector('.name')?.textContent?.split(': ')[1];
            const pushname = c.querySelector('.push_name')?.textContent?.split(': ')[1];


            if(number?.toUpperCase().includes(search.toUpperCase())){
                c.style.visibility = 'visible';
                c.style.display = 'flex'                
            } else if(name?.toUpperCase().includes(search.toUpperCase())){
                c.style.visibility = 'visible';
                c.style.display = 'flex'
            } else if(pushname?.toUpperCase().includes(search.toUpperCase())){
                c.style.visibility = 'visible';
                c.style.display = 'flex'
            } else{
                c.style.visibility = 'hidden';
                c.style.display = 'none'
            }
        })
    }

    useEffect(() => {
        API.getContacts().then(setContact);
    }, []);

    useEffect(() => {
        filterContacts()
    }, [search])

        
    return(
        <>
            <Center>
                <Heading as={'h1'} color={'green.500'} marginTop={'10'}> My Whatsapp Contact List </Heading>

                                

            </Center>
            
            <InputGroup>
                <Input placeholder='filter...' value={search} onChange={ handleSearch } ></Input>
            </InputGroup>

                { contacts.length === 0 ? ( <div>loading ... </div> ) : 
                    (
                        <Flex width={'full'} alignContent={'space-around'} wrap={'wrap'} alignItems={'center'} padding={'10'} >
                        {
                            contacts.map((cont : contact) => { return (
                                <Contact_view {...cont} key={cont.number}  view_tools = {true}  ></Contact_view>
                            )})
                        }      
                        </Flex>
                    )
                }
        </>
    )
}
