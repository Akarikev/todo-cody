import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DoneTodos from "./DoneTodos";

import { Todos } from "./Todos";

export type TodoProps = {
  id: string;
  todo: string;
  timeCreated: string;
  isDone: boolean;
};

function TodoInput() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [doneTodos, setDoneTodos] = useState<TodoProps[]>([]);
  const [error, setError] = useState<string>("");
  // Load todos from localStorage when the component mounts

  const onSubmitTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (text.trim() === "") {
      setError("Please enter a non-empty todo.");
      return;
    }

    setloading(true);
    setError("");

    setTimeout(() => {
      const uuid = uuidv4();
      const currentTime = new Date().toISOString();

      //create a new todo object
      const newTodo: TodoProps = {
        id: uuid,
        todo: text,
        timeCreated: currentTime,
        isDone: false
      };
      setTodos([...todos, newTodo]);
      setText("");
    }, 950);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const doneTodo = (id: string) => {
    const todoToMarkDone = todos.find((todo) => todo.id === id);
    if (todoToMarkDone) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      todoToMarkDone.isDone = true;
      setDoneTodos([...doneTodos, todoToMarkDone]);
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="todos-input">
      <div>
        <form className="form" onSubmit={onSubmitTodo}>
          <input
            className="Input"
            type="text"
            value={text}
            placeholder="What do you want to do?"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Adding..." : "Add todo"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>

      {todos.length === 0 ? (
        <p className="notodo">No todos, add a todo</p>
      ) : (
        todos.map((item) => (
          <div key={item.id}>
            <Todos
              key={item.id}
              item={item}
              deleteTodo={deleteTodo}
              doneTodo={doneTodo}
            />
          </div>
        ))
      )}

      <div className="done-section">
        <h2 className="doneTitle">Done Todos</h2>
        {doneTodos.length === 0 ? (
          <p className="notodo">No todos marked as done</p>
        ) : (
          doneTodos.map((item) => <DoneTodos key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default TodoInput;
