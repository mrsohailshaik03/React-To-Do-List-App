import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (!newTodo.trim()) return;
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((todos) => todos.filter((prevTodos) => prevTodos.id !== id));
  };

  let markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isDone: true }))
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          className="todo-input"
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add-btn" onClick={addNewTask}>
          Add Task
        </button>
      </div>
      <hr />
      <h4>Tasks</h4>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.isDone ? "done" : ""}`}
          >
            {todo.task}
            <div className="btn-group">
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                ❌
              </button>
              <button className="done-btn" onClick={() => markAsDone(todo.id)}>
                ✅
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="mark-all-btn" onClick={markAllDone}>
        Mark All As Done
      </button>
    </div>
  );
}
