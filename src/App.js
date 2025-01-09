import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <div className='w-full min-h-screen bg-richblack-900 flex flex-col font-inter
    overflow-x-hidden overflow-y-auto'>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
