import { ThickArrowLeftIcon, TrashIcon } from "@radix-ui/react-icons";
import TodoItem from "./TodoItem";
import { TodoProps } from "./TodoInput";

type TodosProps = {
  item: TodoProps;
  deleteTodo: (id: string) => void;
  doneTodo: (id: string) => void;
};

export function Todos({ item, deleteTodo, doneTodo }: TodosProps) {
  return (
    <div className="todo-item">
      <ThickArrowLeftIcon
        onClick={() => doneTodo(item.id)}
        width={32}
        height={32}
        className="icon-done"
      />
      <TrashIcon
        width={32}
        height={32}
        className="icon-trash"
        onClick={() => deleteTodo(item.id)}
      />
      <TodoItem item={item} />
    </div>
  );
}

export default Todos;
