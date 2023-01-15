import { Routes, Route, Link } from 'react-router-dom'
import { Whatsapp_list } from './components/Whatsapp_list'
import { Whatsapp_contact } from './components/Whatsapp_contact' 


function App(){
  return (
    <>
    <Routes>
      <Route path='/contacts' element={ <Whatsapp_list /> } ></Route> 
      <Route path='/contacts/:number' element={ <Whatsapp_contact /> } ></Route> 
    </Routes>
    </>
  )
}

export default App
