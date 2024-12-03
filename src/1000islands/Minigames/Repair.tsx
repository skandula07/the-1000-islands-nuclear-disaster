import React from "react";
import Iframe from "react-iframe";
import { Link } from "react-router-dom"; // Make sure you're using 'react-router-dom' instead of 'react-router'
import Cutscene from "../Nav/Cutscene";
import Exposure from "../Nav/Exposure";
import TypingEffect from "../Nav/TypingText";

const Repair: React.FC = () => {


    function MyComponent() {
        return (
          <div>
            <Iframe 
              url="https://www.google.com/maps"
              width="1100px"
              height="600px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              
            />
          </div>
        );
      }
      
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

      {/* Embed the iframe */}
      {/* <iframe
        src="https://google.com"
        title="Dalton NRS"
        width="100%"  // Correct JSX syntax: no comments here
        height="600"  // Correct JSX syntax
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-forms"
      /> */}


      {MyComponent()}



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
