import TodoItem from "./TodoItem";

function DoneTodos({ item }) {
  return (
    <div className="done-todo-item">
      <TodoItem item={item} />
    </div>
  );
}

export default DoneTodos;
