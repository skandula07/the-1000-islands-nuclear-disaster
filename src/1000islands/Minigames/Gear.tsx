import React, { useState } from "react";
import { Link } from "react-router";
import Cutscene from "../Nav/Cutscene.js";
import Exposure from "../Nav/Exposure.js";
import TypingEffect from "../Nav/TypingText.js";


export default function Geear() {

    const [suit, setSuit] = useState(false);
    const handleSuit = (event) => {
        console.log(suit);

        setSuit(event.target.checked);
        // return(<div>{JSON.stringify(suit)}</div>);
      };
    const [gloves, setGloves] = useState(false);
    const [dosimeter, setDosimeter] = useState(false);

    return (
        <div className="pb-96">
            <Cutscene />
            <Exposure percentage={12} />

              <TypingEffect text={`You need to don personal protective gear before you enter any units near the reactor.
              \n
              Make sure you wear all your safety equipment before going close to the radioactive cylinders, or you might get radiation poisoning!
              
              
               `} />
           

           
             
            <div className="flex float-right">
            <div>
            <input type="checkbox" name="gear" id="suit"  onChange={handleSuit} />
            <label htmlFor="suit"> suit
                <img src="/images/gear/hazmat.png" alt="hazmat suit" /> </label>
                </div>
            <div>
            
            <input type="checkbox" name="gloves" id="golves" onChange={() => setGloves(true)} />
            <label htmlFor="golves">   gloves  <img src="/images/gear/gloves.png" alt="hazmat gloves"  /></label>
          
                </div>
                <div>
            <input type="checkbox" name="gear" id="dosimeter" onChange={() => setDosimeter(true)}  />
            <label htmlFor="dosimeter">   radiation dosimeter <img src="/images/gear/dosimeter.png" alt="radiation dosimeter" /></label>
                </div>
            
            </div>
            <br />
            <br />
            <br />
            <br />

                         
            {suit && gloves && dosimeter &&
            <Link to="/repair" className="float-right mb-10 direction">Next &nbsp;            </Link>}
            {/* <br /> */}
            
           
            

        </div>

    );
}