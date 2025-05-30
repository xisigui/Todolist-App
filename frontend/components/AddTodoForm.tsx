import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

const AddTodoForm = ({ onAdd, onCancel }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Add more details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!title.trim()}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
