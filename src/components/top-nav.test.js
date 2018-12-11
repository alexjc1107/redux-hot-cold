import React from "react";
import { shallow } from "enzyme";
import { RESTART_GAME, GENERATE_AURAL_UPDATE } from "../actions";
import { TopNav } from "./top-nav";

describe("<TopNav />", () => {
  it("Renders without crashing", () => {
    shallow(<TopNav />);
  });

  it("Should call onNewGame when new game is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find(".new");
    link.simulate("click", {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalled();
    const action = dispatch.mock.calls[0][0];
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(action.correctAnswer).toBeLessThanOrEqual(100);
  });

  it("Should call onGenerateAuralUpdate when state-of-game link is clicked", () => {
    const dispatch = jest.fn();
    const wrapper = shallow(<TopNav dispatch={dispatch} />);
    const link = wrapper.find(".status-link");
    link.simulate("click", {
      preventDefault() {}
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.mock.calls[0][0].type).toEqual(GENERATE_AURAL_UPDATE);
  });
});
