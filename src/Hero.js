import React from "react";
import "./App.js";
const Hero = ({handleLogout}) =>{
    return(
        <section className="hero">
        <nav>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
        
        </section>
    );
}
export default Hero;