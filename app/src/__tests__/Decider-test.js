import Decider from "../Decider";

it("constructs without throwing", () => {
  const challenge = {
    name: "Bβ",
    intervals: ["root", "M3", "P5"],
  };
  new Decider(challenge);
});

it("note from interval", () => {
  const challenge = {
    name: "Bβ",
    intervals: ["root", "M3", "P5"],
  };
  var decider = new Decider(challenge);
  expect(decider.noteFromInterval("Bβ", "M2")).toEqual("C");
  expect(decider.noteFromInterval("Bβ", "M3")).toEqual("D");
  expect(decider.noteFromInterval("Bβ", "P5")).toEqual("F");
  expect(decider.noteFromInterval("Bβ", "P4")).toEqual("Eβ");
  expect(decider.noteFromInterval("Bβ", "M6")).toEqual("G");
  expect(decider.noteFromInterval("Bβ", "M7")).toEqual("A");
  expect(decider.noteFromInterval("F", "root")).toEqual("F");
  expect(decider.noteFromInterval("F", "M3")).toEqual("A");
});

it("hist built correctly", () => {
  const challenge1 = {
    name: "Bβ",
    intervals: ["root", "M3", "P5"],
  };
  var decider = new Decider(challenge1);
  expect(decider.hist).toEqual({ Bβ: 0, D: 0, F: 0 });

  const challenge2 = {
    name: "B",
    intervals: ["root", "M3", "P5"],
  };
  decider = new Decider(challenge2);
  expect(decider.hist).toEqual({ B: 0, Eβ: 0, Fγ: 0 });
});

it("hist updates correctly", () => {
  const challenge1 = {
    name: "B",
    intervals: ["root", "M3", "P5"],
  };
  var decider = new Decider(challenge1);
  decider.recordNote("B");
  expect(decider.hist).toEqual({ B: 1, Eβ: 0, Fγ: 0 });
  decider.recordNote("B");
  expect(decider.hist).toEqual({ B: 2, Eβ: 0, Fγ: 0 });
  decider.recordNote("Eβ");
  expect(decider.hist).toEqual({ B: 2, Eβ: 0, Fγ: 0 });
});

it("completed is correct", () => {
  const challenge1 = {
    name: "B",
    intervals: ["root", "M3", "P5"],
  };
  var decider = new Decider(challenge1);
  decider.recordNote("B");
  expect(decider.getCompleted()).toEqual([10, 0, 0]);
  decider.recordNote("B");
  expect(decider.getCompleted()).toEqual([20, 0, 0]);
  for (let i = 0; i < 100; i++) {
    decider.recordNote("B");
  }
  expect(decider.getCompleted()).toEqual([100, 0, 0]);
  decider.recordNote("Eβ");
  expect(decider.getCompleted()).toEqual([100, 10, 0]);
  for (let i = 0; i < 100; i++) {
    decider.recordNote("Eβ");
  }
  expect(decider.getCompleted()).toEqual([100, 100, 0]);
  decider.recordNote("Fγ");
  expect(decider.getCompleted()).toEqual([100, 100, 10]);
});
