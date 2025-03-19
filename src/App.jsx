import Table2 from './Table/Table2.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Table from './Table/Table.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App(){
  return(

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path='/register' element={<SignUp />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Table2 />}></Route>
      
    </Routes>
    </BrowserRouter>


  );
}


// {/* <>
// <Table2 /> 
// <SignUp />

// </> */}

