import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import TodoService from "../services/TodoService";

const deleteTodo = (deleteTodoId) => {
  try {
    const response = TodoService.deleteTodo(deleteTodoId);
    window.location.reload();
    if (response.status === 200) {
    }
  } catch (err) {
    console.error(err);
  }
};

const checkTodo = (checkTodoId,done) => {
  try {
    TodoService.updateTodoCheck(checkTodoId, done);
    window.location.reload();
  }catch (err) {
    console.error(err);
  }
};

const updateTodo = (updateTodoId,content) => {
  try {
    TodoService.updateTodoContent(updateTodoId,content);
    window.location.reload();
    } catch (err) {
    console.error(err);
  }
};

export const Todo = (todo) => {
  const [isChecked, setIsChecked] = useState(todo.todo.completed);
  const [ifEdit, setIfEdit]=useState(false);
  const [changedTodo, setChangedTodo]=useState(todo.todo.content);
  
  return (
    <div className="row mt-3 d-flex justify-content-center">
      <div className="row border rounded p-3">
        <div className="col-10 d-flex  align-items-start justify-content-start">
          {
            ifEdit?
            <div className="w-100 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                id={todo.todo.id}
                value={changedTodo}
                onChange={(e)=>setChangedTodo(e.target.value)}
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              ></input>
              <button
                className="btn btn-primary border-0 bg-success col-1 p-2"
                type="button"
                id={todo.todo.id}
                onClick={(e)=> {updateTodo(e.currentTarget.id,changedTodo); setIfEdit(false)}}
              >Save</button>
              <button
                className="btn btn-primary border-0 bg-danger col-1 p-2"
                type="button"
                onClick={()=> {setIfEdit(false);
                setChangedTodo(todo.todo.content)}}
              >Cancel</button>
            </div>: 
            <span style={{ fontSize: "20px", textDecoration:isChecked?"line-through":"", color:isChecked?"red":""}}>{todo.todo.content}</span>
          }
        </div>
        <div className="col-2">
          <div className="row">
            <div className="col-4 ">
              <input
                className="form-check-input text-success btn btn-outline-success h-100"
                type="checkbox"
                checked={isChecked}
                id={todo.todo.id}
                onChange={(e) => {
                  setIsChecked(!isChecked);
                  console.log(isChecked);
                  checkTodo(e.currentTarget.id,isChecked);
                }}
              />
            </div>
            <div className="col-4 ">
              <BiSolidPencil
                style={{ cursor: "pointer" }}
                onClick={() => ifEdit==false? setIfEdit(true):""}
                className="text-warning"
                size={20}
              />
            </div>
            <div className="col-4 ">
              <FaTrash
                id={todo.todo.id}
                style={{ cursor: "pointer" }}
                className="text-danger"
                onClick={(e) => deleteTodo(e.currentTarget.id)}
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
