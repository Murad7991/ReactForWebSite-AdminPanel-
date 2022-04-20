import './App.css';
import React from "react";
import Header from "./Components/Header/header";
import  {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/home";
import Rooms from "./Pages/Rooms/rooms";
import Testimonials from "./Pages/Testimonials/testimonials";
import Entertainment from "./Pages/Entertainment/entertainment";
import OurBlog from "./Pages/Our-blog/our-blog";
function App() {
  return (
      <>
          <Header/>
              <div className="app">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/rooms" element={<Rooms/>}/>
                      <Route path="/testimonials" element={<Testimonials/>}/>
                      <Route path="/entertainment" element={<Entertainment/>}/>
                      <Route path="/our-blog" element={<OurBlog/>}/>
                  </Routes>
              </div>
      </>
  );
}

export default App;
