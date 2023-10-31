function TodoItem({ item }) {
  return <div className="todo-text">{item.todo.toUpperCase()}</div>;
}

export default TodoItem;
