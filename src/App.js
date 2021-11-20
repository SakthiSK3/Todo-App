import React from 'react'
import './App.css';
import Index from './views/index';
import './Todo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
       <Index />
       <ToastContainer />
    </div>
  );
}

export default App;
