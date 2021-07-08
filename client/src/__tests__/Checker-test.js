import React from "react";
import ReactDOM from "react-dom";
import Checker from "../Checker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  let challenge = { name: "B", intervals: ["A", "B", "C"] };
  ReactDOM.render(<Checker challenge={challenge} />, div);
});
