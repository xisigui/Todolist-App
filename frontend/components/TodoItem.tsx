import { Button } from "@/components/ui/button";
import { Trash2, Circle, CheckCircle2, Edit3 } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  return (
    <div className="flex items-start p-4 hover:bg-gray-50 transition-colors group">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex items-center justify-center w-5 h-5 mr-3 mt-1 transition-colors flex-shrink-0"
      >
        {todo.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm font-semibold transition-all ${
            todo.completed ? "text-gray-500 line-through" : "text-gray-900"
          }`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p
            className={`text-sm mt-1 transition-all ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-600"
            }`}
          >
            {todo.description}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          {new Date(todo.created_at).toLocaleDateString()} at{" "}
          {new Date(todo.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex gap-1 opacity-100 transition-opacity">
        <Button
          onClick={() => onEdit(todo)}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex-shrink-0"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => onDelete(todo.id)}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
