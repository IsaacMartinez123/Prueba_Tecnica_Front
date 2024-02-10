import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './components/index.jsx';
import CreateProduct from './components/CreateProduct.jsx';
import EditProduct from './components/EditProduct.jsx';
import Nav from './components/Nav.jsx';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/create" element={<CreateProduct/>} />
        <Route path="/edit/:id" element={<EditProduct/>} />
      </Routes>
    </div>  
  );
}

export default App;
