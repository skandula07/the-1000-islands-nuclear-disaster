import { useState } from "react";
import { Link } from "react-router";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import React from "react";


export default function Sidebar() {


    const [isShown, setIsShown] = useState(false)

    const handleSidebar = () => {
        if (isShown) {
            return setIsShown(false);
        } else {
            return setIsShown(true);
        }
    };

    const links = [
        {path:"/gear", title:"Gear Up!"},
        {path: "/repair", title:"regular maintanence procedures"},
        {path:"/containment", title:"Containment Breach"},
        {path:"/medic", title:"We need a medic"},
        {path:"/halflives", title:"clean up and aftermath."}];





    return (
        <div className=" float-left mr-10 z-0 p-6 min-h-screen">
            {isShown}

{/* className="hover:text-green-400" */}

            {!isShown && 
            <button onClick={handleSidebar}>
            <SlArrowRight style={{ color: 'white' }} className="float-right" />

            </button>
            }
            

            {isShown && 
            <div className="text-emerald-600 sidebar shadow-emerald-400/50">
            <div className="title">
            <h2 className="underline float-left text-lg">Chronology (minigames)</h2>
            
            <button onClick={handleSidebar} className="float-right">
            <SlArrowLeft style={{ color: 'white' }}  />
            </button>
            </div>
            <br />
            <br />
        <ol>
          {links.map((link) => (
            <li>
                <Link to={link.path} className="hover:text-emerald-300" onClick={handleSidebar}>{link.title}</Link><br />
            </li>
          ))}
        </ol>
        </div>
            }









        </div>
    );
} 