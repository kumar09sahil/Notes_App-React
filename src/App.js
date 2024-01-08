import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


function App() {
  const [alert, setalert]= useState(null)
  const showalert = (message,type)=>{
    setalert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert alert={alert} showalert={showalert}/>
            <div className="container my-3">
              <Routes>
                <Route exact path="/" element={<Home showalert={showalert}/>} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login showalert={showalert} />} />
                <Route exact path="/signup" element={<Signup showalert={showalert}/>} />
              </Routes>
            </div>
          </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
