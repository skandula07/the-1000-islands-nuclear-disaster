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
    soil: { color: "#D2B48C", behavior: "fall", description: "Soil falls down when placed. It behaves like sand and can fill gaps below." },
    water: { color: "#1E90FF", behavior: "fall", description: "Water falls down when placed. It can extinguish fire and fill gaps below." },
    concrete: { color: "#D3D3D3", behavior: "static", description: "Concrete stays in place and does not move. It is immovable and prevents other materials from moving past it." },
    steel: { color: "#B0C4DE", behavior: "static", description: "Steel is like concrete: it is static and doesn't move or interact with other materials." },
    fire: { color: "#FF4500", behavior: "manual", description: "Fire can be drawn at the mouse location. It will disappear if it touches water below it." },
    radiation: { color: "#32CD32", behavior: "radiation", description: "Radiation can be affected by fire. It will be burnt by fire if in contact with it." }, // Updated to green
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

    const pixelSize = 6; // Increase pixel size for better visibility

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const material = grid[y][x];
        if (material) {
          ctx.fillStyle = materialTypes[material].color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize); // Larger pixels for better visibility
        }
      }
    }
  };

  // Add material to the grid when mouse is clicked or dragged
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Early return if canvas is null
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 6); // Updated to use larger pixel size
    const y = Math.floor((e.clientY - rect.top) / 6);  // Updated to use larger pixel size

    // Add the selected material at the mouse position
    const newGrid = grid.map(row => [...row]); // Create a new copy of the grid
    if (y < HEIGHT && x < WIDTH) {
      newGrid[y][x] = brush;
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
        </div> 
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH * 6}  // Update canvas width to match larger pixel size
        height={HEIGHT * 6} // Update canvas height to match larger pixel size
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          if (e.buttons === 1) handleMouseDown(e); // If mouse is held down, continue drawing
        }}
        className="falling-sand-canvas border-4 border-gray-600 ml-5"
      />

      <p className="text-center text-sm p-2 border-t-2 border-gray-400">{materialTypes[brush]?.description}</p>
    </div>
    <div className="pb-10">
            <Link to="/repair" className="float-left direction">Previous</Link>
            <Link to="/medic" className="float-right mb-10 direction">Next</Link>
            </div>
    </div>
  );
};

export default Containment;
