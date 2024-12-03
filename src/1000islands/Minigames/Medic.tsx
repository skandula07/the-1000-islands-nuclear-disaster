import React from "react";
import { Link } from "react-router";
import Cutscene from "../Nav/Cutscene.js";
import Exposure from "../Nav/Exposure.js";

export default function Medic() {
    return (
        <div>
            <div>
                <Cutscene />
                <Exposure percentage={82} />

            <div className="flex">
            <img src="/images/soutline.png" alt="operation" width="50%" className="align-self-center" />
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