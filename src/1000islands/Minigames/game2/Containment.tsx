import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Cutscene from "../../Nav/Cutscene.js";
import Exposure from "../../Nav/Exposure.js";

// Size of the grid
const WIDTH = 150;  // Width for the grid
const HEIGHT = 150; // Height for the grid

const Containment = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [brush, setBrush] = useState("soil");

  const materialTypes = {
    soil: { color: "#D2B48C", behavior: "fall", description: "Deep geological disposal involves isolating nuclear waste deep underground in stable geological formations, typically hundreds of meters below the Earth's surface. The goal is to securely store radioactive materials for thousands of years, ensuring minimal risk to human health and the environment." },
    water: { color: "#1E90FF", behavior: "fall", description: "Water is primarily used as a cooling agent and a shielding barrier, acting as a primary method to protect personnel from radiation by absorbing and dispersing radioactive particles emitted from the source, typically in nuclear power plants, where large pools of water are used to store spent fuel rods, providing a layer of protection due to water's ability to attenuate radiation." },
    concrete: { color: "#D3D3D3", behavior: "static", description: "Concrete is known for its inert properties, and plays a pivotal role in nuclear and radioactive waste storage, providing a robust barrier against radiation.Concrete is primarily used as a radiation shield dome in the main enclosure, which includes the ionizing unit, and the auxiliary enclosure, which includes the nuclear generator. It is additionally employed to build barrel containment, which keeps the nuclear waste material safe from contaminating the environment. Concrete is also utilized to create tunnels and radiation shielding enclosures for collecting hazardous waste worldwide."},
    steel: { color: "#B0C4DE", behavior: "static", description: "Pre-war steel refers to steel that was produced before World War II, particularly before the widespread use of nuclear technology and significant industrialization that increased exposure to radiation. Steel made during this period, especially from older sources like decommissioned ships or equipment, tends to have much lower levels of radiation compared to modern steel, which is often exposed to higher levels of cosmic radiation and industrial contamination. As a result, pre-war steel is sometimes sought after for its 'low background' properties, making it ideal for sensitive applications, such as scientific instruments or storage containers for nuclear waste, where minimal radiation interference is crucial. Steel can become radioactive when exposed to high levels of radiation, especially through neutron activation in nuclear environments. Low-background steel, often sourced from pre-war materials or deep underground, has reduced natural radioactivity and is used in sensitive applications where minimal radiation interference is crucial." },
    fire: { color: "#FF4500", behavior: "manual", description: "A fire directly increases the amount of radiation in its immediate environment by emitting thermal radiation, which is essentially heat energy traveling in electromagnetic waves, primarily in the infrared spectrum; this radiation can be felt as heat when you stand near a fire, and can even cause burns if the intensity is high enough." },
    radiation: { color: "#32CD32", behavior: "radiation", description: "Want to make things worse? Contaminate the canvas even more!" },
    eraser: { color: "#FF69B4", behavior: "eraser", description: "The eraser brush allows you to remove materials from the grid." }, // Pink Eraser Brush
  };

  // Initialize the grid (canvas background)
  useEffect(() => {
    const newGrid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));
    setGrid(newGrid);
  }, []);

  // Handle the brush (material) selection
  const handleBrushChange = (newBrush: string) => {
    setBrush(newBrush);
  };

  // Simulate falling sand behavior
  const updateGrid = () => {
    const newGrid = grid.map(row => [...row]);

    // Continuous stream of radiation falling from the top center (column WIDTH / 2)
    const centerX = Math.floor(WIDTH / 2); // Center column
    newGrid[0][centerX] = "radiation"; // Start radiation at the top center

    for (let y = HEIGHT - 1; y >= 0; y--) {
      for (let x = 0; x < WIDTH; x++) {
        const material = newGrid[y][x];
        if (material) {
          switch (materialTypes[material].behavior) {
            case "fall":
              if (y + 1 < HEIGHT && !newGrid[y + 1][x]) {
                newGrid[y + 1][x] = material;
                newGrid[y][x] = null;
              }
              break;

            case "manual":
              if (material === "fire") {
                // If fire touches water, both disappear
                if (
                  (y + 1 < HEIGHT && newGrid[y + 1][x] === "water") || // Fire below
                  (x + 1 < WIDTH && newGrid[y][x + 1] === "water") ||  // Fire to the right
                  (x - 1 >= 0 && newGrid[y][x - 1] === "water")         // Fire to the left
                ) {
                  newGrid[y][x] = null; // Fire disappears
                }

                // Fire turns into radiation if adjacent to it
                if (
                  (y + 1 < HEIGHT && newGrid[y + 1][x] === "radiation") || // Radiation below
                  (x + 1 < WIDTH && newGrid[y][x + 1] === "radiation") ||  // Radiation to the right
                  (x - 1 >= 0 && newGrid[y][x - 1] === "radiation")         // Radiation to the left
                ) {
                  newGrid[y][x] = "radiation"; // Turn fire into radiation
                }
              }
              break;

            case "radiation":
              // Radiation falls like other falling materials
              if (y + 1 < HEIGHT && !newGrid[y + 1][x]) {
                newGrid[y + 1][x] = material;
                newGrid[y][x] = null;
              }

              // Radiation burns if it's next to fire
              if (
                (y + 1 < HEIGHT && newGrid[y + 1][x] === "fire") || // Fire below
                (x + 1 < WIDTH && newGrid[y][x + 1] === "fire") ||  // Fire to the right
                (x - 1 >= 0 && newGrid[y][x - 1] === "fire")         // Fire to the left
              ) {
                newGrid[y][x] = null; // Radiation is burnt by fire
              }
              break;

            case "static":
              break;

            case "eraser":
              break;

            default:
              break;
          }
        }
      }
    }

    setGrid(newGrid);
  };

  // Draw the grid on the canvas
  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Early return if canvas is null
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const basePixelSize = 3; // Base pixel size for most materials
    const radiationPixelSize = 9; // Radiation is 3x larger than other materials

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const material = grid[y][x];
        if (material) {
          if (material === "radiation") {
            // Radiation is drawn 3x larger (9px)
            ctx.fillStyle = materialTypes[material].color;
            ctx.fillRect(x * basePixelSize, y * basePixelSize, radiationPixelSize, radiationPixelSize);
          } else {
            // Other materials are drawn with base size (3px)
            ctx.fillStyle = materialTypes[material].color;
            ctx.fillRect(x * basePixelSize, y * basePixelSize, basePixelSize, basePixelSize);
          }
        }
      }
    }
  };

  // Add material to the grid when mouse is clicked or dragged
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Early return if canvas is null
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 3); // Updated for smaller pixel size
    const y = Math.floor((e.clientY - rect.top) / 3);  // Updated for smaller pixel size

    const newGrid = grid.map(row => [...row]); // Create a new copy of the grid
    if (y < HEIGHT && x < WIDTH) {
      if (brush === "eraser") {
        newGrid[y][x] = null; // Clear the material at the selected grid position
      } else {
        newGrid[y][x] = brush; // Add selected material
      }
    }
    setGrid(newGrid);
  };

  // Update simulation and redraw every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      updateGrid();
      drawGrid();
    }, 100);

    return () => clearInterval(interval); // Cleanup on component unmount
  });

  return (
    <div>
      <Exposure percentage={99} />
      <div className="flex items-center">
        <Cutscene />
        <div className="controls">
          <h2 className="text-xl mb-2 underline">Materials</h2>
          <div className="grid gap-4 w-4/6 text-black">
            <button onClick={() => handleBrushChange("soil")} className="p-2 bg-gray-300 rounded">Soil</button>
            <button onClick={() => handleBrushChange("water")} className="p-2 bg-blue-400 rounded">Water</button>
            <button onClick={() => handleBrushChange("concrete")} className="p-2 bg-gray-500 rounded">Concrete</button>
            <button onClick={() => handleBrushChange("steel")} className="p-2 bg-gray-600 rounded">Steel</button>
            <button onClick={() => handleBrushChange("fire")} className="p-2 bg-red-400 rounded">Fire</button>
            <button onClick={() => handleBrushChange("radiation")} className="p-2 bg-green-400 rounded">Radiation</button>
            <button onClick={() => handleBrushChange("eraser")} className="p-2 bg-pink-400 rounded">Eraser</button> {/* Pink Eraser Button */}
          </div> 
        </div>

        <canvas
          ref={canvasRef}
          width={WIDTH * 3}  // Canvas size remains unchanged
          height={HEIGHT * 3} // Canvas size remains unchanged
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            if (e.buttons === 1) handleMouseDown(e); // If mouse is held down, continue drawing
          }}
          className="falling-sand-canvas border-4 border-gray-600 ml-5"
        />

        <p className="text-left text-sm p-2 border-t-2 border-gray-400">{materialTypes[brush]?.description}</p>
      </div>
      <div className="pb-10">
        <Link to="/repair" className="float-left direction">Previous</Link>
        <Link to="/medic" className="float-right mb-10 direction">Next</Link>
      </div>
    </div>
  );
};

export default Containment;
