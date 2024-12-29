import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { AuthContext } from './Store/Context';
import { auth } from './Firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './Store/PostContext'

import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
function App() {
  const {setUser}=useContext(AuthContext)
   useEffect(()=>{
   onAuthStateChanged (auth,(user)=>{
      setUser(user)
    })
    
  },[])
  return (
    <div>
      <BrowserRouter>
      <Post>
          <Routes>
   
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/view' element={<View/>}/>


          </Routes>
          </Post>
      </BrowserRouter>
    </div>
  );
}

export default App;
