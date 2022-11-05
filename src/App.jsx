import {Route, Routes, BrowserRouter} from "react-router-dom"
import Admin from "./components/Admin"
import NotFound from './components/NotFound'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="admin" element ={<Admin/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
