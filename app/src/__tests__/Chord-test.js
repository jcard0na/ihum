import React from "react";
import ReactDOM from "react-dom";
import Chord from "../Chord";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const chord = { name: "Bbm7", intervals: ["root", "m3", "P5", "m7"] };
  ReactDOM.render(<Chord chord={chord} />, div);
});
