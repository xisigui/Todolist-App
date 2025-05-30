import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

interface EditTodoFormProps {
  todo: Todo;
  onUpdate: (id: number, title: string, description: string) => void;
  onCancel: () => void;
}

const EditTodoForm = ({ todo, onUpdate, onCancel }: EditTodoFormProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onUpdate(todo.id, title.trim(), description.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="edit-title">Task Title</Label>
        <Input
          id="edit-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="edit-description">Description (optional)</Label>
        <Textarea
          id="edit-description"
          placeholder="Add more details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!title.trim()}
        >
          <Save className="w-4 h-4 mr-1" />
          Update Task
        </Button>
      </div>
    </form>
  );
};

export default EditTodoForm;
