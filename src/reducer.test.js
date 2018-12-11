import reducer from "./reducer";
import { generateAuralUpdate, restartGame, makeGuess } from "./actions";

describe("reducer", () => {
  describe("restartGame", () => {
    it("should restart the game", () => {
      let state = {
        guesses: [1, 2, 3],
        feedback: "You got it!",
        auralStatus: "",
        correctAnswer: 3
      };
      state = reducer(state, restartGame(99));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual("Make your guess!");
      expect(state.auralStatus).toEqual("");
      expect(state.correctAnswer).toEqual(99);
    });
  });

  describe("makeGuess", () => {
    it("should make a guess", () => {
      let state = {
        guesses: [],
        feedback: "Make your guess!",
        auralStatus: "",
        correctAnswer: 80
      };
      state = reducer(state, makeGuess(29));
      expect(state.guesses).toEqual([29]);
      expect(state.feedback).toEqual("You're Ice Cold...");
      state = reducer(state, makeGuess(49));
      expect(state.guesses).toEqual([29, 49]);
      expect(state.feedback).toEqual("You're Cold...");
      state = reducer(state, makeGuess(69));
      expect(state.guesses).toEqual([29, 49, 69]);
      expect(state.feedback).toEqual("You're Warm.");
      state = reducer(state, makeGuess(79));
      expect(state.guesses).toEqual([29, 49, 69, 79]);
      expect(state.feedback).toEqual("You're Hot!");
      state = reducer(state, makeGuess(80));
      expect(state.guesses).toEqual([29, 49, 69, 79, 80]);
      expect(state.feedback).toEqual("You got it!");
    });
  });

  describe("generateAuralUpdate", () => {
    it("should generate aural update", () => {
      let state = {
        guesses: [29, 49, 69, 79],
        feedback: "You're Hot!",
        auralStatus: "",
        correctAnswer: 80
      };
      state = reducer(state, generateAuralUpdate());
      expect(state.auralStatus).toEqual(
        "Here's the status of the game right now: You're Hot! You've made 4 guesses. In order of most- to least-recent, they are: 79, 69, 49, 29"
      );
    });
  });
});
