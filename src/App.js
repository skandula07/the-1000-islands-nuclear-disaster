
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Containment from "./1000islands/Minigames/game2/Containment.tsx";
import Sidebar from "./1000islands/Nav/Sidebar.tsx";
import Launchpad from "./1000islands/Launchpad.tsx";
import Gear from "./1000islands/Minigames/Gear.tsx";
import Repair from "./1000islands/Minigames/Repair.tsx";
import Medic from "./1000islands/Minigames/Medic.tsx";
import HalfLives from "./1000islands/Minigames/HalfLives.tsx";
import End from "./1000islands/Minigames/End.tsx";

function App() {

  return (
    <BrowserRouter> 

    <div className="App">
      <header className="App-header">
      {Sidebar()}
      </header>

      <h1 className="text-4xl text-emerald-400 pt-2">
      <Link to={`/`}>
        The Thousand Islands Nuclear Disaster
        </Link>
        <Link to={`/`}>
      <img src="../radiation.png" alt="" width="100px" className="float-right hover:animate-spin"/>
      </Link>
      </h1>

      


      <div className="float-center pl-20 p-3 m-10 mt-3 m-20 rounded" >
        <Routes>
          <Route path="/" element={<Launchpad />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/containment" element={<Containment />} />
          <Route path="/medic" element={<Medic />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/halflives" element={<HalfLives />} />
          <Route path="/end" element={<End />} />
        </Routes>
        </div>




    </div>
    </BrowserRouter>
  );
}

export default App;
