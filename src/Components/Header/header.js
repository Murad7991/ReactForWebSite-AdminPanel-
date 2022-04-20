import React from "react";
import "./header.scss";
import { Link} from "react-router-dom";


export default function Header() {
    return <>
        <div className= "header">
            <div className="logo">
                <Link to="/"><img src={require("../../Assets/logo2.png")} alt="Logo"/></Link>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/rooms">Rooms</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/entertainment">Entertainment</Link></li>
                <li><Link to="/our-blog">Our-Blog</Link></li>
            </ul>
        </div>
    </>
}
