import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Cutscene() {


    const location = useLocation().pathname;


    
    const [showSplash, setShowSplash] = useState(true);

    const images = [{path: "/gear", img: '1'},
                    {path: "/repair", img: '2'},
                    {path: "/containment", img: '3'},
                    {path: "/medic", img: '4'},
                    {path: "/halflives", img: '5'},
                    {path: "/theEnd", img: '6'}
                  ];
    function getImage() {
      return (images.find((e) => e.path === location).img);
    }


    // Use useEffect to hide the splash screen after 5 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplash(false);  // Hide splash screen after 5 seconds
      }, 1500);
  
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);





    return (
        <div className="">
        
{/* <div className={`relative h-screen overflow-hidden`}> */}
       {showSplash && (
      <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 w-screen h-screen">
      <div className="flex flex-col justify-center items-center rounded-lg shadow-lg">
        <img
          src={`images/cutscenes/${getImage()}.png`}
          alt="cutscene"
          className="rounded-lg"
        />
      </div>
    </div>
      )}
  

        </div>
        // </div>
    );
}
export default Cutscene;
