import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, LogOut, Plus, Circle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import TodoItem from "@/components/TodoItem";
import AddTodoForm from "@/components/AddTodoForm";
import EditTodoForm from "./EditTodoForm";
import { getAuthToken } from "@/lib/utils";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

interface TodoDashboardProps {
  user: string;
  onLogout: () => void;
}

const TodoDashboard = ({ user, onLogout }: TodoDashboardProps) => {
  const token = getAuthToken();

  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todos/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error Occur:", error);
      toast.error(`"Error Occur: ${error.message}`);
    }
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      created_at: new Date(),
    };
    setTodos([newTodo, ...todos]);
    setShowAddForm(false);
    toast.message("Task has been created", {
      description: `"${title}" has been added to your tasks.`,
    });
  };

  const updateTodo = (id: number, title: string, description: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
    setEditingTodo(null);
    toast("Task Updated", {
      description: `"${title}" has been updated successfully.`,
    });
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todo.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        console.log(res);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      toast(todo.completed ? "Task Marked as Pending" : "Task Completed", {
        description: `"${todo.title}" status has been updated.`,
      });
    }
  };

  const deleteTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        const res = await response.json();
        console.log(res);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setTodos(todos.filter((todo) => todo.id !== id));
    }

    toast("Task Deleted", {
      description: `"${todo.title}" has been removed from your tasks.`,
    });
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-6">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user}!
            </h1>
            <p className="text-gray-600">
              You have {totalCount - completedCount} tasks remaining
            </p>
          </div>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="flex items-center gap-2 hover:bg-gray-50"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Circle className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-blue-800">
                  {totalCount - completedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-800">
                  {completedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-gray-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 font-medium">Total</p>
                <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Todo Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Add New Task
            </CardTitle>
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <AddTodoForm
                  onAdd={addTodo}
                  onCancel={() => setShowAddForm(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Edit Todo Dialog */}
      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTodo && (
            <EditTodoForm
              todo={editingTodo}
              onUpdate={updateTodo}
              onCancel={() => setEditingTodo(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Todos List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No tasks yet</p>
              <p>Add your first task to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={setEditingTodo}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoDashboard;
