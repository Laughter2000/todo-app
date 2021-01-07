import render from "react-test-renderer";
import { mount } from "enzyme";
import Home, { todoReducer } from "./Home";

const todoList = [
  {
    item: "Learn more of React",
    complete: false,
  },
  {
    item: "Practice more with Frontend mentor challenges",
    complete: true,
  },
  {
    item: "Learn Redux",
    complete: false,
  },
];
describe("Home", () => {
  describe("Reducer", () => {
    it("should set todo list", () => {
      const state = [];
      const newState = todoReducer(state, {
        type: "SAVED TODO",
        payload: todoList,
      });
      expect(newState.length).toEqual(3);
    });

    it("should not create a duplicate todo item", () => {
      const state = todoList;
      const newState = todoReducer(state, {
        type: "CREATE TODO",
        payload: "Learn Redux",
      });
      expect(newState.length).toEqual(3);
    });

    it("should a unique todo item", () => {
      const state = todoList;
      const newState = todoReducer(state, {
        type: "CREATE TODO",
        payload: "Learn Firebase",
      });
      expect(newState.length).toEqual(4);
    });

    it("should set todo item to completed", () => {
      const state = todoList;
      const newState = todoReducer(state, {
        type: "UNDO TODO",
        payload: todoList[1].item,
      });
      expect(newState[1].complete).toBeFalsy;
    });
  });

  it("should set todo item as not completed", () => {
    const state = todoList;
    const newState = todoReducer(state, {
      type: "DO TODO",
      payload: todoList[0].item,
    });
    expect(newState[0].complete).toBeTruthy;
  });

  it("should remove a todo item", () => {
    const state = todoList;
    const newState = todoReducer(state, {
      type: "REMOVE TODO",
      payload: todoList[2].item,
    });
    expect(newState.length).toEqual(2);
  });

  it("should clear completed", () => {
    const state = todoList;
    const newState = todoReducer(state, {
      type: "CLEAR COMPLETE",
    });
    expect(newState.length).toEqual(2);
  });

  test("Has a valid snap short", () => {
    const component = render.create(<Home />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
