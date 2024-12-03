import React, { useState } from "react";
import { Link } from "react-router";
import Cutscene from "../Nav/Cutscene.js";
import Exposure from "../Nav/Exposure.js";

export default function Medic() {


    const poisoning = [
        {"ailment" : "", "color": "", "desc" : ""},
        {"ailment" : "Leukemia", "color": "bg-red-600", "desc" : "Leukemia is a cancer of the blood. Ionizing radiation can be the cause of almost all types of leukemias"},
        {"ailment" : "Immunocompromised", "color": "bg-blue-600", "desc" : "Radiation can completely ruin a person's immune system when dosed in large amounts. This makes you highly suceptible to all sorts of viruses and infections waiting to strike."},
        {"ailment" : "Nausea", "color": "bg-violet-600", "desc" : "One of the first side effects of radiation poisoning can seem pretty typical, nausea. You may feel the world spinning and your stomach churning, but it's really the uranium ruining your body."},
        {"ailment" : "Skin Burns", "color": "bg-orange-600", "desc" : "One of the scariest and most painful symptoms is the gruesome skin burns and boils. It looks and feels almost like your skin is falling off."},
    ]

    const [ailment, setAilment] = useState("");

    function handleAilment(a) {
        return (
            setAilment(a)
        );
    }
    
    const [desc, setDesc] = useState("");

    function handleDesc(a) {
        return (
            setDesc(a)
        );
    }
    const [color, setColor] = useState("");

    function handlColor(a) {
        return (
            setColor(a)
        );
    }

    function handleClick(a, c, d) {
        handlColor(c);
        handleAilment(a);
        handleDesc(d);


    }






    return (
        <div>
            <div>
                <Cutscene />
                <Exposure percentage={82} />

            <div className="flex">
            <img src="/images/soutline.png" alt="operation" width="50%" className="align-self-center" />
            
            <div>
            <p className="text-xs">
            The amount of time between exposure and when these symptoms develop is a clue to how much radiation a person has absorbed.

After the first round of symptoms, a person with radiation sickness may have a brief period with no noticeable illness, followed by the onset of new, more-serious symptoms.

If you've had a mild exposure, it may take hours to weeks before symptoms begin. But with high exposure, symptoms can begin minutes to days after exposure.
            </p>
            
            

            <div>

                <div className="flex m-3">
                {poisoning.map((p) => 
                <div>

                   <button id={p.ailment} className={`${p.color} hover:text-white text-black font-bold py-2 px-4 rounded-full duration-100 m-2`}
                   onClick={() => handleClick(p.ailment, p.color, p.desc) }
                   >
                    {/* <label htmlFor={p.ailment} className="p-1 text-white"> {p.ailment} </label> */}
                </button>  
                </div>
                )}
                </div>
                <div>

                    <div className={`rounded ${color} p-9 m-3`}>
                        <h1 className="text-3xl underline text-white"> {ailment} </h1>
                        <p className="text-md"> {desc} </p>
                    </div>

                </div>
                </div>
              
               

            </div>
            </div>
            

            <div>
            <Link to="/containment" className="float-left mb-10 direction">Previous</Link>
            <Link to="/halflives" className="float-right mb-10 direction">Next</Link>
             <br /> <br />
            </div>
            
            </div>
            


        </div>
    );
}