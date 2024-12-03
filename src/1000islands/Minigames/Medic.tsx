import React, { useState } from "react";
import { Link } from "react-router";
import Cutscene from "../Nav/Cutscene.js";
import Exposure from "../Nav/Exposure.js";

export default function Medic() {


    const poisoning = [
        {"ailment" : "Leukemia", "color": "bg-red-600", "desc" : "Leukemia is a cancer of the blood. Ionizing radiation can be the cause of almost all types of leukemias"},
        {"ailment" : "Immunocompromised", "color": "bg-blue-600", "desc" : "Radiation can completely ruin a person's immune system when dosed in large amounts. This makes you highly suceptible to all sorts of viruses and infections waiting to strike."},
        {"ailment" : "Nausea", "color": "bg-violet-600", "desc" : ""},
        {"ailment" : "Skin Burns", "color": "bg-orange-600", "desc" : "Radiation can completely ruin a person's immune system when dosed in large amounts. This makes you highly suceptible to all sorts of viruses and infections waiting to strike."},
    ]

    const [ailment, setAilment] = useState();






    return (
        <div>
            <div>
                <Cutscene />
                <Exposure percentage={82} />

            <div className="flex">
            <img src="/images/soutline.png" alt="operation" width="50%" className="align-self-center" />
            <p className="text-xs">
            The amount of time between exposure and when these symptoms develop is a clue to how much radiation a person has absorbed.

After the first round of symptoms, a person with radiation sickness may have a brief period with no noticeable illness, followed by the onset of new, more-serious symptoms.

If you've had a mild exposure, it may take hours to weeks before symptoms begin. But with high exposure, symptoms can begin minutes to days after exposure.
            </p>
            
            </div>

            <div>

                {poisoning.map((p) => 
                <div>
                   <button className={`${p.color} hover:text-white text-black font-bold py-2 px-4 rounded-full duration-100`}
                   onClick={() => setAilment(p)}
                   >
                    {/* {p.ailment} */}
                    ?
                </button>  
                </div>
                )}
                {ailment &&
                <div>

                    <div className={`${ailment.ailment}`}></div>

                </div>
                }
               

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