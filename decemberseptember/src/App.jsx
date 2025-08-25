import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import puzzleImage from "./puzzle.jpg";
import kissImage from "./kiss.jpg";
import girlfriendImage from "./girlfriend.jpg";
import runnerSprite from "./runner.png";
import "./App.css";

const App = () => {
  const [page, setPage] = useState("screen1");
  const [debClicks, setDebClicks] = useState(0);
  const [runnerPosition, setRunnerPosition] = useState(0);
  const checkpoints = [
  { position: 14, object: "🪸", action: () => setPage("miniGame1") },
  { position: 28, object: "🍂", action: () => setPage("miniGame2") },
  { position: 42, object: "🍁", action: () => setPage("miniGame3") },
  { position: 56, object: "🍄", action: () => setPage("miniGame4") },
  { position: 70, object: "🍄‍🟫", action: () => setPage("miniGame5") },
  { position: 84, object: "🔥", action: () => setPage("miniGame6") },
  { position: 98, object: "🪹", action: () => setPage("miniGame7") }
];


    useEffect(() => {
  if (page.startsWith("screen")) {
    const interval = setInterval(() => {
      setRunnerPosition((pos) => {
        const nextPos = pos + 0.15; // adjust speed

        // trigger checkpoint actions
        checkpoints.forEach((cp) => {
          if (pos < cp.position && nextPos >= cp.position) {
            cp.action();
          }
        });

        return nextPos >= 100 ? 100 : nextPos; // stop at end
      });
    }, 20);

    return () => clearInterval(interval);
  }
}, [page]);


  // useEffect(() => {
  //   if (page.startsWith("screen")) {
  //     const interval = setInterval(() => {
  //       setRunnerPosition((pos) => {
  //         if (pos >= 90) {
  //           clearInterval(interval);
  //           switch (page) {
  //             case "screen1": setPage("miniGame1"); break;
  //             case "screen2": setPage("miniGame2"); break;
  //             case "screen3": setPage("miniGame3"); break;
  //             case "screen4": setPage("miniGame4"); break;
  //             case "screen5": setPage("miniGame5"); break;
  //             case "screen6": setPage("miniGame6"); break;
  //             case "screen7": setPage("miniGame7"); break;
  //             default: break;
  //           }
  //         }
  //         return pos + 0.5;
  //       });
  //     }, 20);
  //     return () => clearInterval(interval);
  //   }
  // }, [page]);

  const handleDebClick = () => setDebClicks((prev) => prev + 1);

  const renderPage = () => {
  switch (page) {
    case "screen1":
    case "screen2":
    case "screen3":
    case "screen4":
    case "screen5":
    case "screen6":
    case "screen7":
      return (
        <div className="screen homerun">
          <h1 className="homerunheading">Fate on the dates</h1>
          <p>crawl
          </p>

          {/* Runner track container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "150px",
              marginTop: "50px",
              borderTop: "2px solid #aaa",
            }}
          >
            {/* Runner */}
            <motion.img
              src={runnerSprite}
              alt="runner"
              style={{
                width: "125px",
                height: "125px",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              animate={{ left: `${runnerPosition}%` }}
              transition={{ type: "linear", duration: 0.02 }}
            />

            {/* Visible objects */}
            {checkpoints.map((cp, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: `${cp.position}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "2rem",
                }}
              >
                {cp.object}
              </div>
            ))}
          </div>
        </div>
      );

    case "miniGame1":
      return (
        <div className="screen pastel">
          <h1>4th December</h1>
          <p>It's 7am, you have a test at school what do you do?</p>
          <button onClick={() => setPage("page2_fail")}> SLEEP</button>
          <button onClick={() => setPage("page2_fail")}> STUDY</button>
          <button
            onClick={() => {
              setPage("page2_success");
            }}
          >
            GET ON USERPHONE
          </button>
        </div>
      );

    case "page2_fail":
      return (
        <div className="screen pastel">
          <p>Babe, no. That's lame :/</p>
          <button onClick={() => setPage("miniGame1")}>Try Again</button>
        </div>
      );

    case "page2_success":
      return (
        <div className="screen pastelblue">
          <p className="goldentext">BINGO! That's my boy :3</p>
          <button className="bluebutton"
            onClick={() => {
              setPage("screen2"); // Runner resumes from same position
            }}
          >
            Continue Running
          </button>
        </div>
      );

    case "miniGame2":
      return (
        <div className="screen pastel">
          <h1>14th December</h1>
          <p>A potential predator wants to know your location</p>
          <button
            onClick={() => {
              setPage("screen3");
            }}
          >
            GIVE YOUR ADDRESS
          </button>
          <button
            onClick={() => {
              setPage("screen3");
            }}
          >
            GIVE YOUR ADDRESS
          </button>
          <button
            onClick={() => {
              setPage("screen3");
            }}
          >
            GIVE YOUR ADDRESS
          </button>
        </div>
      );

    case "miniGame3":
      return (
        <div className="screen pastelblue">
          <h1>15th December</h1>
          <p>Solve the 3x3 puzzle:</p>
          <Puzzle onSolved={() => setPage("puzzleSuccess")} />
        </div>
      );

    case "puzzleSuccess":
      return (
        <div className="screen black">
          <div className="notification">
            <h2>Thank you for signing up to love!</h2>
            <p className="notificationtext">
              Any attempt to revoke your decision will have serious
              consequences. You will now have a lifetime subscription of Samara, and
              associated parts and duties.
            </p>
            <button className="notificationbutton"
              onClick={() => {
                setPage("quiz1");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );

    case "quiz1":
      return (
        <div className="screen pastel">
          <h1>Did you revise notes?</h1>
          <p>You're like a never ending ________</p>
          <button onClick={() => setPage("quiz1_success")}>Orgasm</button>
          <button onClick={() => alert("Try again")}>
            Dilemma
          </button>
          <button onClick={() => alert("Try again")}>
            Tumor
          </button>
        </div>
      );

    case "quiz1_success":
      return (
        <div className="screen pastel">
          <p> Are you a silly teenage boy...</p>
          <button onClick={() => alert("Dream on")}> with unfathomable rizz?</button>
          <button onClick={() => setPage("quiz3")}> with messy hair?</button>
          <button onClick={() => alert("Not quite")}> with a loving wife?</button>
        </div>
      );

    case "quiz3":
      return (
        <div className="screen pastel">
          <p> do u hate me 🥺</p>
          <button onClick={() => alert("idk though......")}> no</button>
          <button onClick={() => setPage("page6")}> what is hate</button>
        </div>
      );

    case "page6":
      return (
        <div className="screen pastelblue">
          <p>My baby's so good at this, here have a kiss</p>
          <img src={kissImage} alt="kiss" />
          <button onClick={() => setPage("screen4")}>Continue Running</button>
        </div>
      );

    case "miniGame4":
      return (
        <div className="screen pastel">
          <h1>23rd January</h1>
          <p>This girl wants to be your girlfriend. What do you do?</p>
          <img src={girlfriendImage} alt="girlfriend" />
          <button onClick={() => setPage("screen5")}> say yes</button>
          <button onClick={() => setPage("screen5")}> say yes</button>
          <button onClick={() => setPage("screen5")}> say yes</button>
        </div>
      );

    case "miniGame5":
      return (
        <DebGame
          onComplete={() => {
            setPage("screen6");
          }}
        />
      );

    case "miniGame6":
      return (
        <div className="screen pastel">
          <h1>5th April</h1>
          <p>
            Your psycho discord girlfriend sent auditory hieroglyphs at 3AM
          </p>
          <button onClick={() => alert("Smart boy, think again :))")}>
             RUN
          </button>
          <button onClick={() => setPage("screen7")}> WAIT FOR HER </button>
          <button
            onClick={() => {
              alert("tch tch tch, typical.");
              setPage("screen7");
            }}
          >
            FEED INTO HER INSANITY
          </button>
        </div>
      );

    case "miniGame7":
  return (
    <div className="screen pastelblue">
      <h1>What should be our next step?</h1>
      <p style={{
        maxWidth: "600px",
        margin: "20px auto",
        lineHeight: "1.5",
        textAlign: "justify",
        fontSize: "1rem",
        fontFamily: "sans-serif",
        fontWeight: "bolder",
      }}>
         In an experiment to test the affinity of an isolated species - henceforth addressed to as "Specimen-1", we (the universe and fate and shit) introduce Specimen-2 to her habitat. Specimen-1 starts showing varied response to this interaction. To confirm the effect of Specimen-2 on Specimen-1, we remove Specimen-2.
        <br/>
        Specimen-1 has started withdrawal symptoms at separation from Specimen-2.
      </p>
      <button onClick={() => alert("This is a non-cancellable program, try again")}> Terminate the experiment</button>
      <button onClick={() => setPage("page10")}> Wait and watch symptoms</button>
      <button onClick={() => setPage("page11")}> Bring back Specimen-2</button>
    </div>
  );


    case "page10":
      return (
        <div className="screen black">
          <h1 className="gameover">GAME OVER</h1>
        </div>
      );

    case "page11":
      return (
        <div className="screen black">
          <h1 className="goldentext">15th September</h1>
          <p>Your personalised message and images go here!</p>
        </div>
      );

    default:
      return <div>Loading...</div>;
  }
};


  return (
    <AnimatePresence mode="wait">
      <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  );
};


// -------- Puzzle Component --------
const Puzzle = ({ onSolved }) => {
  const pieceSize = 100; // size of each puzzle piece
  const gridSize = 3; // 3x3 puzzle
  const fullImageSize = pieceSize * gridSize;

  const [pieces, setPieces] = useState(
    Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5)
  );

  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("dragIdx", idx);
  };

  const handleDrop = (e, idx) => {
    e.preventDefault();
    const dragIdx = Number(e.dataTransfer.getData("dragIdx"));
    if (dragIdx === undefined) return;

    const newPieces = [...pieces];
    [newPieces[idx], newPieces[dragIdx]] = [newPieces[dragIdx], newPieces[idx]];
    setPieces(newPieces);

    if (newPieces.every((val, i) => val === i)) {
      onSolved();
    }
  };

  return (
    <div
      className="puzzle-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, ${pieceSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${pieceSize}px)`,
        gap: "2px",
      }}
    >
      {pieces.map((val, idx) => (
        <div
          key={idx}
          className="puzzle-piece"
          style={{
            width: pieceSize,
            height: pieceSize,
            overflow: "hidden",
            cursor: "grab",
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
          onDragOver={(e) => e.preventDefault()}
        >
          <img
            src={puzzleImage}
            alt="puzzle"
            style={{
              width: `${fullImageSize}px`,
              height: `${fullImageSize}px`,
              objectFit: "cover",
              objectPosition: `-${(val % gridSize) * pieceSize}px -${Math.floor(
                val / gridSize
              ) * pieceSize}px`,
              pointerEvents: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
};


//----------DebGame component--------------

const DebGame = ({ onComplete }) => {
  const [debs, setDebs] = useState([]);

  useEffect(() => {
    // Function to spawn a new DEB
    const spawnDeb = () => {
      setDebs((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          top: Math.random() * 80 + 10,
          left: Math.random() * 80 + 10,
        },
      ]);
    };

    // Spawn DEBs continuously every 0.5s
    const interval = setInterval(spawnDeb, 500);

    // Stop spawning after 5 seconds
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = (id) => {
    setDebs((prev) => {
      const newDebs = prev.filter((deb) => deb.id !== id);
      if (newDebs.length === 0) {
        onComplete(); // Game ends when all DEBs are gone
      }
      return newDebs;
    });
  };

  return (
    <div className="screen black" style={{ position: "relative", height: "100vh" }}>
      <h1 style={{ color: "red" }}>A malicious, jealous, havoc wreaking DEB just appeared!</h1>
      <p>Click DEB words to eliminate her!</p>
      {debs.map((deb) => (
        <span
          key={deb.id}
          onClick={() => handleClick(deb.id)}
          style={{
            position: "absolute",
            top: `${deb.top}%`,
            left: `${deb.left}%`,
            color: "red",
            cursor: "pointer",
            fontWeight: "bold",
            userSelect: "none",
            fontSize: "20px",
          }}
        >
          DEB
        </span>
      ))}
      {debs.length === 0 && (
        <button
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onClick={onComplete}
        >
          Continue
        </button>
      )}
    </div>
  );
};





export default App;
