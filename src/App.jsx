import {Route, Routes, BrowserRouter} from "react-router-dom"
import Admin from "./components/Admin"
import NotFound from './components/NotFound'
import Home from './components/Home'
import Store from './components/Store'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="admin" element ={<Admin/>}/>
        <Route path="store" element ={<Store/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
