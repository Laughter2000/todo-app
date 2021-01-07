import React, { useState, useEffect, useReducer, useRef } from "react";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";
import cross from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SAVED TODO":
      return [...state, ...action.payload];

    case "CREATE TODO":
      var newTodo = {
        item: action.payload,
        complete: false,
      };
      var duplicate = false;
      state.map((todo) => {
        if (todo.item === newTodo.item) {
          return (duplicate = true);
        } else {
          return duplicate;
        }
      });
      return duplicate ? state : [...state, newTodo];

    case "DO TODO":
      return state.map((todo) => {
        if (todo.item === action.payload) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });

    case "UNDO TODO":
      return state.map((todo) => {
        if (todo.item === action.payload) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });

    case "REMOVE TODO":
      return state.filter((todo) => todo.item !== action.payload);

    case "CLEAR COMPLETE":
      return state.filter((todo) => !todo.complete);

    default:
      return state;
  }
};
const Home = ({ change, mode }) => {
  const [todo, setTodo] = useState("");
  const [temp, setTemp] = useState([]);
  const [notification, setNotification] = useState("");

  const [todoList, dispatchTodo] = useReducer(todoReducer, []);
  const firstLoad = useRef(false);

  const submitTodo = (e) => {
    e.preventDefault();
    dispatchTodo({
      type: "CREATE TODO",
      payload: todo,
    });
  };

  const handleTodo = (todo) => {
    dispatchTodo({
      type: todo.complete ? "UNDO TODO" : "DO TODO",
      payload: todo.item,
    });
  };

  const filterTodo = (e) => {
    if (e === "All") {
      setTemp(todoList);
      setNotification("");
    } else if (e === "Completed") {
      setTemp(todoList.filter((todo) => todo.complete));
      setNotification("Completed");
    } else if (e === "Active") {
      setTemp(todoList.filter((todo) => !todo.complete));
      setNotification("Active");
    }
  };

  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
      const total = localStorage.getItem("todoList");
      if (total) {
        dispatchTodo({ type: "SAVED TODO", payload: JSON.parse(total) });
        setTemp(todoList);
      }
    } else {
      localStorage.setItem("todoList", JSON.stringify(todoList));
      setTemp(todoList);
    }
  }, [todoList]);

  return (
    <div className={mode ? "container-fluid" : "container-fluid dark-mode"}>
      <div className={mode ? "cover-img" : "dark-img"}></div>
      <div className="container-div">
        <header className="header">
          <h1>TODO</h1>
          {mode ? (
            <img
              src={moon}
              alt="img mode"
              className="img-mode"
              onClick={change}
            />
          ) : (
            <img
              src={sun}
              alt="img mode"
              className="img-mode"
              onClick={change}
            />
          )}
        </header>

        <main>
          <form onSubmit={submitTodo}>
            <div className={mode ? "input-div" : "input-div background-dark"}>
              <div className="circle" onClick={submitTodo}></div>
              <input
                type="text"
                className={
                  mode ? "input-tab" : "input-tab background-dark dark-text"
                }
                placeholder="Create a new todo..."
                onChange={(e) => setTodo(e.target.value)}
                onBlur={(e) => setTodo(e.target.value)}
              />
            </div>
          </form>

          <div className={mode ? "todo-list" : "todo-list background-dark"}>
            {(() => {
              if (temp.length >= 1) {
                return (
                  <div>
                    {temp.map((todo) => (
                      <div className="todo-item" key={todo.item}>
                        <div className="content">
                          <div
                            className={
                              todo.complete ? "circle-colored" : "circle"
                            }
                            onClick={() => handleTodo(todo)}
                          >
                            {todo.complete ? (
                              <img
                                src={check}
                                alt="cross"
                                className="icon-check"
                              />
                            ) : (
                              " "
                            )}
                          </div>
                          <p
                            className={
                              todo.complete ? "todo-p completed-p" : "todo-p"
                            }
                          >
                            {todo.item}
                          </p>
                        </div>
                        <img
                          src={cross}
                          alt="cross"
                          className="cross"
                          onClick={() =>
                            dispatchTodo({
                              type: "REMOVE TODO",
                              payload: todo.item,
                            })
                          }
                        />
                      </div>
                    ))}
                    <div className="menu">
                      <p>
                        {todoList.length >= 1
                          ? todoList.length -
                            todoList.filter((todo) => todo.complete).length
                          : 0}{" "}
                        items left
                      </p>
                      <div>
                        <p
                          className={
                            notification === "All" || notification === ""
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("All")}
                        >
                          All
                        </p>
                        <p
                          className={
                            notification === "Active"
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("Active")}
                        >
                          Active
                        </p>
                        <p
                          className={
                            notification === "Completed"
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("Completed")}
                        >
                          Completed
                        </p>
                      </div>
                      <p
                        className="last"
                        onClick={() =>
                          dispatchTodo({
                            type: "CLEAR COMPLETE",
                          })
                        }
                      >
                        Clear Completed
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div>
                    <p className="empty">No {notification} todo item yet</p>
                    <div className="menu">
                      <p>
                        {todoList.length >= 1
                          ? todoList.length -
                            todoList.filter((todo) => todo.complete).length
                          : 0}{" "}
                        items left
                      </p>
                      <div>
                        <p
                          className={
                            notification === "All" || notification === ""
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("All")}
                        >
                          All
                        </p>
                        <p
                          className={
                            notification === "Active"
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("Active")}
                        >
                          Active
                        </p>
                        <p
                          className={
                            notification === "Completed"
                              ? "menu-toggle filter"
                              : "menu-toggle"
                          }
                          onClick={() => filterTodo("Completed")}
                        >
                          Completed
                        </p>
                      </div>
                      <p
                        className="last"
                        onClick={() =>
                          dispatchTodo({
                            type: "CLEAR COMPLETE",
                          })
                        }
                      >
                        Clear Completed
                      </p>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
          <div className={mode ? "second-menu" : "second-menu dark-one"}>
            <p
              onClick={() => filterTodo("All")}
              className={
                notification === "All" || notification === "" ? "filter" : ""
              }
            >
              All
            </p>
            <p
              onClick={() => filterTodo("Active")}
              className={notification === "Active" ? "filter" : ""}
            >
              Active
            </p>
            <p
              onClick={() => filterTodo("Completed")}
              className={notification === "Completed" ? "filter" : ""}
            >
              Completed
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
