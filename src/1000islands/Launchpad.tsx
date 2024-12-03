import React from "react";
import { useNavigate } from "react-router";
import Exposure from "./Nav/Exposure";
import TypingEffect from "./Nav/TypingText";

export default function Launchpad() {

    const navigate = useNavigate();
    const handleGo = () => {
        navigate("/gear");
    };
  return (
    <div className="p-20">

<Exposure percentage={3} />

    <h1 className="text-4xl align-middle">
      The Thousand Islands <br />
      Nuclear Disaster
      <br />
      <br />
    </h1>

  


    <p className="text-sm">
    <TypingEffect text="  It's another day at your grueling 5-9 job at the Thousand Islands Nuclear Power Plant.
        Today is no different than any other day, though you find yourself a little more tired than usual... 

        It's time to get to work, you can think about your loving wife and kids after the shift. 
        " />

      
        <br />
       
    </p>
    <br />
    <br />

    <button 
    className="bg-emerald-200 hover:bg-emerald-400 text-black font-bold py-2 px-4 rounded-full duration-100"
    onClick={handleGo}>
        Suit up for work!
    </button>

    

    </div>
  );
}
