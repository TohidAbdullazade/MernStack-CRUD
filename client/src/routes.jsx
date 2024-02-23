import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";

export const MainRoutes = () =>{
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<CreateUser/>}/>
      <Route path='/update/:id' element={<UpdateUser/>}/>
    </Routes>
  )
}