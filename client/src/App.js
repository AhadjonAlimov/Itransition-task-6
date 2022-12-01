import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Mails from './pages/Mails';
import Layout from './components/Layout'
import Navbar from './components/Navbar';


function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Mails />} />
      </Routes>
    </Layout>
  );
}

export default App;
