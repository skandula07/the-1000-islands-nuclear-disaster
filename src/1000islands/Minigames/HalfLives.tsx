import React from "react";
import { Link } from "react-router";
import Exposure from "../Nav/Exposure";
import "./radiation.css"

export default function HalfLives() {

    return(
        <div >
             <Exposure percentage={39} />


             <div className="flex">
             <div className="card h-2/5 shadow-emerald-800 shadow-3xl mr-10">
                <h2><b>Uranium</b></h2>
                <h2 className="text-9xl"><b>U</b>
                <span className="text-4xl">235</span>
                </h2>
                <h2 className="text-2xl"><b>Half-Life: </b>
                <br />
                703.8 <i>million</i> years</h2>

                <p className="text-black text-sm">
                    <br />
                    Uranium is much easier to find than in nature than diamond, but Uranium-235 is extremely rare, but the most often used radioactive element in reactors. 
                    </p>
             </div>

             <div className="text-xs w-3/5">

             <h1 className="text-lg">High-level waste: </h1>
             High-level waste includes used nuclear fuel from nuclear reactors and waste generated from the reprocessing of spent nuclear fuel from power plants and military projects.
             <br />
             <br />
             <h1 className="text-lg">Transuranic waste: </h1>
Transuranic wastes refer to man-made radioactive elements that have an atomic number of 92 (uranium) or higher. Most of the transuranic waste in the United States is from nuclear weapons production facilities. This waste includes common items such as rags, tools, and laboratory equipment contaminated during the early age of nuclear weapons research and development. Transuranic waste is currently being stored at several federal facilities across the country. 
<br />
<br />

<h1 className="text-lg">Uranium or thorium mill tailings:  </h1>
Mill tailings are radioactive wastes that remain after the mining and milling of uranium or thorium ore. Mill tailings are stored at the production-sites in specially designed ponds called impoundments.
<br />
<br />

<h1 className="text-lg">Low-level waste:  </h1>
Low-level waste is radioactively contaminated industrial or research waste that is not high-level waste, transuranic waste,  or uranium or thorium mill tailings. Much of this waste looks like common items such as paper, rags, plastic bags, protective clothing, cardboard, and packaging material. These items are considered waste once they come into contact with radioactive materials. Low-level waste can be generated by any industry using radioactive material, including government, utility, manufacture, medical and research facilities. There are disposal facilities that specialize in the near-surface disposal of low-level waste..
             </div>

             </div>

             <div>
            <Link to="/medic" className="float-left mb-10 direction">Previous</Link>
            <Link to="/theEnd" className="float-right mb-10 direction">Next</Link>
             <br /> <br />
            </div>



        </div>

    );
}