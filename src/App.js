import { Route, Routes } from 'react-router-dom';
import './App.css';
import Docs from './components/Docs'
import {db} from './firbase'
import Edit from './components/Edit';
function App() {
  return (
    <div className='w-100'>
     <Routes>
      <Route path="/" element={<Docs db={db}/>}/>
      <Route path="/edit/:id" element={<Edit db={db}/>}/>
     </Routes>
     
    </div>
  );
}

export default App;
