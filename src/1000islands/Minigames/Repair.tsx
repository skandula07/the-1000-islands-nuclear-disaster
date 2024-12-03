import React from "react";
import { Link } from "react-router-dom"; // Make sure you're using 'react-router-dom' instead of 'react-router'
import Cutscene from "../Nav/Cutscene";
import Exposure from "../Nav/Exposure";
import TypingEffect from "../Nav/TypingText";

const Repair: React.FC = () => {

      
  return (
    <div>
      <Exposure percentage={50} />
      <Cutscene />

      <p>
        Every day you need to do <b>Maintenance</b> on the machinery.
        <br />
        <TypingEffect text="Lets go over how the reactor works!" />
      </p>

      <hr />
      <br />



      <img src="/images/reactor.png" alt="operation" width="100%" height="600" className="align-self-center rounded" />




      <br />
      <br />
      <br />

      {/* Navigation links */}
      <div className="pb-10">
        <Link to="/gear" className="float-left direction">Previous</Link>
        <Link to="/containment" className="float-right mb-10 direction">Next</Link>
      </div>
    </div>
  );
};

export default Repair;
