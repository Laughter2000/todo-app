import render from "react-test-renderer";
import { mount } from "enzyme";
import App from "./App";
import Home from "./Home";

describe("App", () => {
  it("renders Home component", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Home).length).toEqual(1);
  });

  test("App Snapshot", () => {
    const component = render.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
