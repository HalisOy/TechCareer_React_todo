import React, { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { Todo } from "./Todo";
import TodoService from "../services/TodoService";

export const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "all");

  useEffect(() => {
    fetchTodoLists();
  }, []);

  useEffect(() => {
    fetchTodoLists();
  }, [activeTab]); 

  const fetchTodoLists = async () => {
    try {
      let response;
      switch (activeTab) {
        case "done":
          response = await TodoService.getDoneTodos();
          break;
        case "notDone":
          response = await TodoService.getNotDoneTodos();
          break;
        default:
          response = await TodoService.getTodos();
      }
  
      if (response.status === 200) {
        setTodoList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
   
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const OnNewTodo = async (AddNewTodo) => {
    try {
      const response = await TodoService.addTodo(AddNewTodo);
      if (response.status === 200) {
        setNewTodo("");
        fetchTodoLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllTodo = async () => {
    try {
      const response = await TodoService.deleteAllTodo();
      if (response.status === 200) {
        fetchTodoLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDoneAllTodo = async () => {
    try {
      const response = await TodoService.deleteDoneAllTodo();
      if (response.status === 200) {
        fetchTodoLists();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="col">
          <h1>TodoInput</h1>
        </div>
      </div>
      <div className="row border p-4">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="input-group mb-3">
                <div
                  className="d-flex justify-content-center align-items-center p-2 border rounded-start text-light"
                  style={{ backgroundColor: "#509EB4" }}
                >
                  <FaBook
                    className="btn-outline-secondaryalign-center"
                    size={18}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary w-100 border-0"
                onClick={(e) => OnNewTodo(newTodo)}
                style={{ backgroundColor: "#509EB4" }}
                type="button"
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <h1>TodoList</h1>
        </div>
      </div>
      <div className="row p-0 mb-5">
        <div className="col p-0">
          <div className="row d-flex flex-row justify-content-between">
            <div className="col-4">
              <button
                className="btn btn-primary border-0 w-100"
                style={{ backgroundColor: "#509EB4" }}
                type="button"
                onClick={(e) => handleTabClick("All")}
              >
                All
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary  border-0 w-100"
                style={{ backgroundColor: "#509EB4" }}
                type="button"
                onClick={(e) => handleTabClick("done")}
              >
                Done
              </button>
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary  border-0 w-100"
                style={{ backgroundColor: "#509EB4" }}
                type="button"
                onClick={(e) => handleTabClick("notDone")}
              >
                Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

      <div className="row d-flex flex-row justify-content-center mt-5 mb-5 gap-5">
        <div className="col-5 p-0">
          <button
            className="btn btn-danger border-0 w-100"
            type="button"
            onClick={(e) => deleteDoneAllTodo()}
          >
            Delete Done Tasks
          </button>
        </div>
        <div className="col-5 p-0">
          <button
            className="btn btn-danger  border-0 w-100"
            type="button"
            onClick={(e) => deleteAllTodo()}
          >
            Delete All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};
