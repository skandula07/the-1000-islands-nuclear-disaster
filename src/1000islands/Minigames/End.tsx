import React from "react";
import Exposure from "../Nav/Exposure";
import TypingEffect from "../Nav/TypingText";

export default function End() {

    const text = "Hey! it seems like you managed to survived acute radiation poisoning! Recover well and treat yourself with a nice salad with Thousand Islands Dressing!";
return(
    <div>
         <Exposure percentage={12} />
        <TypingEffect text={text} />

        <div className="flex items-center place-content-evenly">
        <img src="/images/DRESSING.png" alt="ranch" width="200px" className="align-self-center" />
        <img src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_391,q_75,w_588/v1/clients/newyorkstate/GettyImages_522155047_TIDressing_618x348_ca7982ae-e609-4b17-940a-93600dd87a65.jpg" alt="ranch" width="330px" className="align-self-center" />
        <img src="https://colemans.com/media/catalog/product/cache/12f5c25772a02d87671110b75ef67612/3/4/3464.png" alt="geiger counter" width="330px" className="align-self-center" />
        </div>
      
    </div>
);
}