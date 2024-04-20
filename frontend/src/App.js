import './App.css';
import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import UploadForm from './pages/UploadForm';

function App() {

  return (
  <BrowserRouter>
    <>
    <Routes>

        <Route path="/" element={<UploadForm/>}/>
      </Routes>
    </>

    </BrowserRouter>
  );
}

export default App;