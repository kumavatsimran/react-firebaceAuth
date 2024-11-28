import React from 'react';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import AuthForm from './component/AuthForm';
import Home from './component/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthForm/>}>
      </Route>
      <Route path='/home' element={<Home/>}></Route>



    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
